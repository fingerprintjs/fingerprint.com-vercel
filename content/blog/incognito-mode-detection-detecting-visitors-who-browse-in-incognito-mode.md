---
templateKey: long-form-content
metadata:
  title: "Incognito Mode Detection: Detecting Visitors Who Browse in Private Mode"
  url: https://fingerprint.com/blog/incognito-mode-detection/
  description: Find out how to use Javascript techniques to determine if a website
    visitor is using incognito mode to access a page.
  image: /img/uploads/incognito-mode.png
  imageAlt: Incognito mode detection
  imageTitle: Incognito mode detection
featured: true
publishDate: 2021-07-29T04:48:39.490Z
title: "Incognito Mode Detection: Detecting Visitors Who Browse in Private Mode"
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - engineering
  - paywall
authors:
  - Shahed Nasser
heroImage:
  image: /img/uploads/incognito-mode.png
  imageAlt: Incognito mode detection
  imageTitle: Incognito mode detection
---
Browsers attempt to ensure a user’s privacy by offering Incognito mode, which allows the user to surf the internet without worrying about their history, cookies, or the information they enter being saved permanently. However, in a lot of business use cases, this can end up being harmful. Visitors may use Incognito mode to gain unlimited access to content, bypassing paywalls undetected. 

We’ll go over four methods of detecting visitors using Incognito mode and discuss which browsers support these methods. In the end, we’ll compare these methods to using [Fingerprint](/), which makes it all easier.

## Method 1: Access Timings

This method was discovered by [Jesse Li](https://blog.jse.li/posts/chrome-76-incognito-filesystem-timing/). When the browser is in Incognito mode, the [Filesystem API](https://developer.mozilla.org/en-US/docs/Web/API/FileSystem) writes are faster in Chrome. This is due to the fact that Chrome uses a temporary filesystem with a limited storage quota of 120 MB.

To test this, first create an array of randomly generated large strings:

```js
const strings = [
    's885D7fqH+wKRJoHZ5duaBmhRnlYy7ZgqWA+h14y44J...',
    'Kh6WK6D/xRhYfLksJqlG5Sbu8zsK445TpB8....',
    'AwQ5MBmwxUdYZveqq66TtzoXS9Jn3l9OqVPM7eEukx+nACtQtj8GHv1TokzTWNYF6....',
    'Ck+4tAo/xKe8b0U+JlMNiccJvJ8/+/c3c+bgrW0KAXCxA....',
    'YKPQ1Tv9E42vNMaS+1q2DETAaoUMDQdOgK4W4slHFJ+itD0lwE4eOJ/8rV4Igal....'
]
```

They have been truncated here for simplicity. These strings are 5000 characters long and they’re generated using the following command:

```
base64 /dev/urandom -w 0 | head -c 5000
```

These strings will be used to write files. Also, declare the following variables:

```js
const SIZE = 6*1024*1024,
    NB_TIMINGS = 100,
    NB_WRITES_ITERATIONS = 200
```

`SIZE` will be used to determine the storage space allocated by your website. `NB_TIMINGS` is the number of times you’ll run the writing files code, and `NB_WRITE_ITERATIONS` is the number of times you’ll write each file.

Next, use `window.webkitRequestFileSystem`, which lets you gain access to a sandboxed filesystem:

```js
window.webkitRequestFileSystem(window.TEMPORARY, SIZE, onInit)
```

The first parameter this function takes is `type`, which can either be `window.TEMPORARY` or `window.PERSISTENT`. Since you’re testing the temporary filesystem storage, use `window.TEMPORARY`. The second parameter is the size of storage you need allocated, and the third is a callback function (which you’ll define in a bit) that will accept the filesystem instance.

Next, define the `onInit` function, which will loop for `NB_TIMINGS` (which you declared above) times and calls the function `writeFiles` (which you’ll define shortly). This passes it the `filesystem` instance that `window.webkitRequestFileSystem` passes to the callback, which in this case is `onInit`. Then push the time it takes into a timing array (which you’ll see once execution is done):

```js
const onInit = async (filesystem) => {
    const timings = []
    for (let i = 0; i < NB_TIMINGS; i++) {
        timings.push(await writeFiles(filesystem));
    }
    document.getElementById('timings').innerText = timings.join(",")
}
```

Define the `writeFiles` function, which will loop for `NB_WRITES_ITERATION` times, then loop over the large strings in the `strings` array, and call the `writeFile` function (which you will declare after), passing it the `filesystem` instance and the string in each iteration. 

The function will return the time it took for this process to happen:

```js
const writeFiles = async (filesystem) => {
    const time = new Date() // time before starting writing
    for (let i = 0; i < NB_WRITES_ITERATIONS; i++) {
        for (let j = 0; j < strings.length; j++) {
            await writeFile(filesystem, strings[j]);
        }
    }
    return new Date() - time // time after writing the files
}
```

Finally, define the `writeFile` function that will use the `filesystem` instance to write the string into a file:

```js
const writeFile = (filesystem, data) => {
    return new Promise((resolve) => {
        filesystem.root.getFile('data', {create: true}, (fileEntry) => {
            fileEntry.createWriter((fileWriter) => {
                fileWriter.onwriteend = resolve
                
                var blob = new Blob([data], { type: 'text/plain' })
                fileWriter.write(blob)
            })
        })
    })
}
```

This will be your script. To make sure you see the output in the page, add a div element with the ID `timings`:

```html
<div id="timings"></div>
```

This is where the array of timings in the `onInit` function will be displayed, which includes the time to write each file. 

### Testing on Chrome

Here’s a portion of the output on Chrome without Incognito mode:

![Testing on Chrome without Incognito - Method 1](https://i.imgur.com/M5nlCkL.png)

And here’s a portion of the output on Chrome using Incognito mode:

![Testing on Chrome with Incognito - Method 1](https://i.imgur.com/RPUfXfJ.png)

As you can see, the numbers dropped tremendously when the browser was using Incognito mode.  

This has been known [since 2019 on Chrome 76](https://blog.jse.li/posts/chrome-76-incognito-filesystem-timing/), but it still works now on Chrome 89.

### Testing on Edge

When testing this method on Edge, it produced the same behavior. 

When the browser was not Incognito:

![Testing on Edge without Incognito - Method 1](https://i.imgur.com/UE1qHq8.png)

When the browser was in Incognito (or InPrivate on Edge):

![Testing on Edge with Incognito - Method 1](https://i.imgur.com/11sSNAn.png)

As Edge is now [using Chromium for its engine](https://www.computerworld.com/article/3606788/microsoft-to-replace-legacy-edge-in-april-with-chromium-based-version.html), it can be assumed that as long as this method works on Chrome, it will also work on Edge.

### Testing on Other Major Browsers

Testing this method on other major browsers like Firefox, Safari, and Opera will not work, as the `requestFileSystem` function is not supported. 

Furthermore, using this method even with Chrome and Edge is not very optimal. When used to compare a visitor in Incognito mode and one not, it will likely require a lot of estimation.

Also, after repeated testing on Chrome, the same behavior pertained but the result decreased significantly for both Incognito and non-Incognito modes. It was also recorded that the browser behaved oddly afterward. Subjecting your visitors to a similar method would not be a good idea.

## Method 2: Filesystem Quotas

Another method to detect whether the user is in Incognito mode or not is the [StorageManager API](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager) method `estimate`. This method estimates how much storage the website is using and how much is available for it to use. 

The code for this method is simple. If the estimated storage available is less than 120 MB, then the user is in Incognito mode.

You can test this by adding the following code to a script:

```js
navigator.storage.estimate()
    .then(({usage, quota}) => {
        document.getElementById('answer').innerText = quota < 120000000 ? 'Yes' : 'No'
    })
```

Then, in the HTML, add the element with ID `answer` to see the result:

```html
<div id="answer"></div>
```

If the user is in Incognito mode, the element answer should have the text `Yes`. Otherwise it should be `No`.

### Testing on Chrome

[It was reported](https://mishravikas.com/articles/2019-07/bypassing-anti-incognito-detection-google-chrome.html) that this method worked beginning with Chrome 74. However, it no longer works after Chrome 84. 

Testing this script on Chrome 89, without Incognito mode it gave the following result:

![Testing on Chrome without Incognito - Method 2](https://i.imgur.com/b71OSPn.png)

And the same result was given with Incognito mode:

![Testing on Chrome with Incognito - Method 2](https://i.imgur.com/AYz0Qu7.png)

### Testing on Firefox

This issue was never reported on Firefox before. After testing, it gave the same result as when not using Incognito mode:

![Testing on Firefox without Incognito - Method 2](https://i.imgur.com/nTRdQmh.png)

And when using Incognito (or Private) mode:

![Testing on Firefox with Incognito - Method 2](https://i.imgur.com/ejCzIC6.png)

Both show the answer `No`, which means this method cannot be used to detect Incognito mode on Firefox.

### Testing on Other Browsers

This method also did not work on Edge. On Safari, `navigator.storage.estimate` is not supported.

This method is now outdated and should not be used, as it does not work on any current browser. It only works for users on Chrome versions 74–84.

## Method 3: IndexedDB API

The [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) is used for storing large data like files and blobs. This method is simple. Basically, if IndexedDB is available, the browser is not in Incognito mode. [This was first detected on Firefox 60](https://bugzilla.mozilla.org/show_bug.cgi?id=1571016).

More specifically, if the method `indexedDB.open` does not throw an error, then the browser is not using Incognito mode. You can test this by creating a script with the following code:

```js
const answerElm = document.getElementById('answer'), 
    db = indexedDB.open('test')
db.onerror = function () {
    //if an error is thrown, Incognito mode
    answerElm.innerText = 'Yes'
}
db.onsuccess = function () {
    //if not error is thrown, not Incognito mode
    answerElm.innerText = 'No'
}
```

This uses `indexedDB.open` and attaches an event handler for `onerror` and `onsuccess`. If an error occurs, then the browser is using Incognito mode.

### Testing on Firefox

Testing this script on Firefox 88, you can see the following result using Incognito mode:

![Testing on Firefox without Incognito - Method 3](https://i.imgur.com/kdVhVCX.png)

And the following result not in Incognito mode:

![Testing on Firefox with Incognito - Method 3](https://i.imgur.com/qS6mtTI.png)

As we can see, this method still works on Firefox 88. When the user is in Incognito mode, the answer is `Yes`. When the user isn’t, the answer is `No`.

### Testing on Chrome

On Chrome 89, we got `No` when not using Incognito mode:

![Testing on Chrome without Incognito - Method 3](https://i.imgur.com/nI4fiqa.png)

And the same result when Incognito mode was used:

![Testing on Chrome with Incognito - Method 3](https://i.imgur.com/719Fr6N.png)

This means that this method does not work on Chrome. There were no reported incidents that showcase that it ever worked on Chrome.

### Testing on Safari

When testing on Safari 14 on iOS, you get the same result when not in Incognito mode:

![Testing on Safari without Incognito - Method 3](https://i.imgur.com/SSHmbri.png)

and with Incognito:

![Testing on Safari with Incognito - Method 3](https://i.imgur.com/Lm4OPUL.png)

This means that this method does not work on Safari. There are no previous incidents that showcase that it ever did.

Although this method is simple, it’s not enough as it only detects Incognito mode on Firefox, meaning users on other major browsers can still go undetected.

## Method 4: Local Storage

[This method was detected](https://stackoverflow.com/a/12821418) in Safari prior to version 11. In Incognito or Private mode, Safari disabled the local storage.

You can test this by creating a script with the following code:

```js
const answerElm = document.getElementById('answer')
try {
    localStorage.setItem('test', 'incognito')
    localStorage.removeItem('test')
    //no error thrown, not incognito mode
    answerElm.innerText = 'No'
} catch (e) {
    if (e.code === DOMException.QUOTA_EXCEEDED_ERR && localStorage.length === 0) {
        //Incognito mode
        answerElm.innerText = 'Yes'
    } else {
        //not Incognito mode. Error thrown for some other reason
        answerElm.innerText = 'No'
    }
}
```

`localStorage.setItem` tests if the `localStorage` is working. If it is, then the user is not in Incognito mode. If an error is thrown and the type of error is `DOMException.QUOTA_EXCEEDED_ERR` and the length of local storage is 0, then the user is in Incognito mode. Otherwise, the error thrown could be for some other reason.

Again, make sure to add the following element in the HTML document to see the result:

```html
<div id="answer"></div>
```

### Testing on Safari

When testing this method on Safari 14 on iOS without using Incognito mode, this is the result:

![Testing on Safari without Incognito - Method 4](https://i.imgur.com/ZSCt1Wy.png)

And the same result for Incognito mode:

![Testing on Safari with Incognito - Method 4](https://i.imgur.com/cpgygcq.png)

This method does not work on Safari anymore, and it was not reported to work on any other major browser.

## Method 5: Fingerprint

After going through all the previous methods and experiencing their limitations, let’s look at [Fingerprint](/). Fingerprint Promises "99.5% accurate browser fingerprinting,” which will allow you to detect your visitors’ true identity and protect your content. 

Fingerprint is helpful in many use cases, including:

* Preventing account fraud or fake accounts by making sure all your visitors are real. 
* Making sure all payments are made securely, preventing fraudulent payments.
* Protecting your content, making sure users don’t bypass your paywall.

### How It Works

[Create a free account](https://dashboard.fingerprint.com/signup). Enter your email to begin the onboarding process, entering some information like your website name. Accept the terms and conditions, and finally you will be given a code snippet to add to your website.

![Code Snippet from Fingerprint](https://i.imgur.com/mZhJ6x1.png)

This snippet loads the Fingerprint script to your webpage from the CDN. Once it’s loaded, you can start using Fingerprint with the API key given to your account (it’s part of the code in the snippet). 

Before adding this code to your website, make sure to check your email and verify your email address with Fingerprint first. This is necessary for the subscription to take effect.

Once you’ve verified your email, go ahead and add this script to any of your webpages. If everything is correct, the same page that showed you the code snippet should take you to the dashboard:

![Fingerprint dashboard](https://i.imgur.com/F3PtEHW.png)

You can see that one user is already detected, and that user is you!

We can pass the ["extendedResult"](https://dev.fingerprint.com/docs/js-agent#extendedresult) option in the "get" method to return details about the visitor, including whether they are using Incognito or not.

This will be the code snippet now:

```js
function initFingerprintJS() {
	FingerprintJS.load({ apiKey: 'fNmQOkVpWOuulOZhhYuv' })
		.then(fp => fp.get({extendedResult: true}))
		.then(result => {
                //check if incognito was detected
		document.getElementById('answer').innerText =
		result.incognito ? 'Yes' : 'No'
		})
		.catch(err => console.error(err))
}
```

If everything is correct, the response should include multiple parameters including browser and device details. For our purposes we only need to focus on two parameters:

1. **visitorID:** The ID of the visitor you just passed.
2. **incognito**: A true or false value that shows whether a visitor is using incognito mode. If the user is in Incognito mode, its value will be `true`, otherwise `false`.

Finally, to see the “answer,” add the following in the HTML:

```html
<div id="answer"></div>
```

Now, you’re ready to detect whether visitors are using Incognito mode or not.

Let’s test this on different major browsers. Also, you can test using the live version deployed [here](/demo/).

### Testing on Chrome

Using Chrome 89, Fingerprint was able to detect when not using Incognito:

![Testing on Chrome without Incognito - Method 5](https://i.imgur.com/9AvXNoM.png)

And when using it:

![Testing on Chrome with Incognito - Method 5](https://i.imgur.com/rRsppS6.png)

### Testing on Firefox

Using Firefox 88, Fingerprint was able to detect when not using Incognito:

![Testing on Firefox without Incognito - Method 5](https://i.imgur.com/LUJ0D7l.png)

And when using it:

![Testing on Firefox with Incognito - Method 5](https://i.imgur.com/hug3EAl.png)

### Testing on Edge

Using Edge 90, Fingerprint was able to detect when not using Incognito:

![Testing on Edge without Incognito - Method 5](https://i.imgur.com/HXmdAqU.png)

And when using it:

![Testing on Edge with Incognito - Method 5](https://i.imgur.com/qQzg3HT.png)

### Testing on Opera

Using Opera 76, Fingerprint was able to detect when not using Incognito:

![Testing on Opera without Incognito - Method 5](https://i.imgur.com/2MHrcPs.png)

And when using it:

![Testing on Opera with Incognito - Method 5](https://i.imgur.com/hzRvuGi.png)

### Testing on Safari

Using Safari 14 on iOS, Fingerprint was able to detect when not using Incognito:

![Testing on Safari without Incognito - Method 5](https://i.imgur.com/V9EpIhT.png)

and when using it:

![Testing on Safari with Incognito - Method 5](https://i.imgur.com/pbuPqOx.png)

### Browser Support

[Fingerprint](https://dev.fingerprint.com/docs/browser-support) supports the following browsers and their versions are supported:

* Internet Explorer 11
* Edge 18 and 85+
* Chrome 42+
* Firefox 48+
* Desktop Safari 11.1+
* Mobile Safari 9.3+
* Samsung Internet 11.1+
* Android Browser 4.1+

For an up-to-date list of currently supported versions, visit [this link](https://dev.fingerprint.com/docs/browser-support).

Some old browsers like IE11 and Android Browser 4.1 will need a [Promise polyfill](https://dev.fingerprint.com/docs/browser-support#old-browsers-requirements) before using it.

### Comparing This Method to Previous Ones

Using Fingerprint is definitely a better solution than previous methods. First, setting up Fingerprint and adding the code to your website is a five-minute process. It’s very easy and does not rely on “quirks” or different methods based on which browser the user might be using.

Second, Fingerprint is the only method that’s capable of detecting Incognito mode on *all* major browsers. All the other methods detect Incognito mode only on some browsers, and most are outdated and don’t work anymore.

Not only is Fingerprint easy to integrate, but you can use it in different ways. There’s the CDN way that you used above, but you can also install it with [NPM](https://dev.fingerprint.com/docs/js-agent#ecmascript-module) or use it with [RequireJS](https://dev.fingerprint.com/docs/js-agent#umd). This makes it a flexible solution for whatever kind of architecture you have for your project.

## Conclusion

In recent years, browsers are making it harder to detect Incognito mode, making it a perpetual task to ensure your website’s detection methods are up to date and can still detect a visitor’s identity. It will only continue to become harder to find a method that accurately detects the visitor. 

[Fingerprint](/) is the optimal solution to keep businesses safe from visitors that take advantage of Incognito mode to access limited content.
