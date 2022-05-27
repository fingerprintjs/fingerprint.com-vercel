---
templateKey: long-form-content
metadata:
  title: The Best NPM Browser Fingerprint Packages
  image: /img/uploads/the-best-npm-browser-fingerprint-packages.png
  imageAlt: Best NPM browser fingerprinting packages
  imageTitle: Best NPM browser fingerprinting packages
  description: There are a few NPM packages to choose from for browser
    fingerprinting. In this article, we compare options by looking at their
    popularity, updated date, package size and more.
  url: https://fingerprint.com/blog/best-npm-packages-browser-fingerprinting
  socialImage: /img/uploads/the-best-npm-browser-fingerprint-packages.png
featured: true
publishDate: 2021-11-19T04:45:06.742Z
title: The Best NPM Browser Fingerprint Packages
isPublished: true
isHidden: false
tags:
  - fingerprinting
authors:
  - Shahed Nasser
heroImage:
  image: /img/uploads/the-best-npm-browser-fingerprint-packages.png
  imageAlt: Best NPM browser fingerprinting packages
  imageTitle: Best NPM browser fingerprinting packages
customCTA:
  openCtaNewTab: false
---
Browser fingerprints are generated using information gathered from a website visitor’s hardware and software to form a unique identifier for that browser and device. With browser fingerprints, you can provide your website’s users with a more targeted experience while also keeping your business protected from fraud.

This article will demonstrate why browser fingerprinting is important and provide a comparison of some of the top fingerprinting NPM packages, so you can choose the one that’s best for your business. 

# Why is fingerprinting important?

There are many forms of fraud that can be prevented with high accuracy visitors identifiers like what can be provided by browser fingerprinting. Many businesses and content creators online are subjected to content abuse — spam, fraudulent reviews, or other types of malicious posts. Online businesses encounter account fraud, payment fraud, and other harmful actions that can affect a business’s profit and reputation. Many users also hide behind VPNs to access localized or paywalled content, reducing revenues for subscription businesses and media companies. 

Browser fingerprints help you prevent these issues by relying on device and software data to identify and track visitors to your site. By using browser fingerprinting, you can help protect your business or content from abuse or fraudulent activity.

If you want to learn more about browser fingerprinting and how it works, here are some helpful links to previous articles we have written on the subject:

* [The beginner's guide to browser fingerprinting](/blog/what-is-browser-fingerprinting/) - a simple overview of how fingerprinting works.
* [Browser fingerprinting techniques](/blog/browser-fingerprinting-techniques/) - a browser fingerprint is made up of many hardware and software signals. Learn about these different types and how they are accessed via the browser.
* [How to prevent multiple signups with browser fingerprinting](/blog/prevent-multiple-signups-tutorial/) - fingerprinting can be used in a multitude of ways. Here is one simple example of browser fingerprinting in action.

# Top NPM fingerprinting packages

When it comes to browser fingerprinting, there are many NPM fingerprinting packages to choose from. Here is a comparison of some of the best-known packages and what they offer. 

## Fingerprint

![Fingerprint](/img/uploads/3amov4s.png)

[Fingerprint](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs) is the leading open-source browser fingerprinting library with the most npm downloads and Github stars. It claims to u combat account fraud, content abuse, and fraudulent payments by accurately identifying website visitors even when they try to conceal their identity

Users who want higher identification accuracy can sign up for [Fingerprint Pro](https://www.npmjs.com/package/@fingerprintjs/fingerprintjs-pro), which is free for up to 20,000 identifications per month.

Pro processes all fingerprinting information server-side and transmits it securely to your servers using server-to-server APIs. The server combines the open-source browser fingerprinting library’s functionality with additional data (IP addresses, time of visit patterns, URL change) so that it can deduplicate users that have identical devices, resulting in 99.5% identification accuracy.

### Ease of use

#### Open-source

You can use Fingerprint’ open-source library by installing via the NPM package or [installing from CDN](https://github.com/fingerprintjs/fingerprintjs#install-from-cdn). Full open-source documentation is available on their Github page.

#### Pro version

After you [create an account](https://dashboard.fingerprintjs.com/signup) and obtain a public API key, you can obtain a user’s unique fingerprint with a few lines of code:

```js
const fpPromise = FingerprintJS.load({ apiKey: 'your-public-api-key' })

fpPromise
  .then(fp => fp.get())
  .then(result => {
    console.log(result.visitorId); //unique fingerprint
  })
```

Fingerprint Pro includes a lot of additional features to improve ease of use as well, including a dashboard that tracks usage, onboarding and integration statuses, and other statistics. It also supports webhooks so you can receive instant notifications, delivered securely to your backend systems.

![Fingerprint dashboard](/img/uploads/6t6ukrz.png)

### Last updated

#### Open-source

Fingerprint is regularly updated and maintained to fix bugs or provide enhancements. At the time of writing this article (November 2021), its npm package was last updated in August 2021.

#### Pro version

The Pro version is updated at the highest rate of any npm packages analyzed for this article. The npm package was most recently updated in September 2021 at the time of writing this article. The browser landscape changes fast, so frequent updates are incredibly important in keeping browser fingerprinting accuracy high.

### Weekly downloads

#### Open-source

Fingerprint has the highest number of downloads among packages on this list, with more than 133,000 weekly downloads at the time of writing. Fingerprint is trusted by many software developers and companies wanting accurate user identification.

#### Pro version

Fingerprint Pro had 12,407 weekly downloads at the time of writing.

### Size

#### Open-source

Fingerprint has an unpacked size of 524 KB.

#### Pro version

Pro has an unpacked size of 335 KB.

### Level of detection

#### Open-source

Fingerprint does not provide an exact estimate of fingerprint accuracy, though it does include a confidence score in its output. The confidence score is a floating-point number between 0 and 1 that represents the probability of accurate identification, based on historical data of how often the library was correct in the past. The higher the number, the higher the chance of the visitor identifier to be true.

The Fingerprint library is also capable of detecting a user even when he’s browsing incognito or in private mode. This is essential, as users can hide their identity from cookies and other tracking methods using incognito mode.

You can test the open-source library on their [live demo](https://fingerprintjs.github.io/fingerprintjs/).

#### Pro version

Fingerprint Pro has an identification accuracy of 99.5% and provides documentation on [how this accuracy score is calculated](https://dev.fingerprintjs.com/docs/understanding-our-995-accuracy).  The Pro version also includes a confidence score, that it claims is [more accurate than for the open-source version](https://dev.fingerprintjs.com/docs/understanding-your-confidence-score#pro-vs-open-source) as it can take into account server-side signals as well as client-side.

You can test out the Pro version in an [interactive demo](/demo/) on Fingerprint’ website.

## get-browser-fingerprint

![get-browser-fingerprint](/img/uploads/kpnu6qr.png)

GitHub’s [get-browser-fingerprint](https://www.npmjs.com/package/get-browser-fingerprint) is a “zero-dependency” function that can uniquely detect users from the browser. It’s the smallest package on this list, which can be convenient for your projects.

### Ease of use

After installing get-browser-fingerprint in your project, you just need to import the function, then use it to obtain the user’s fingerprint:

```js
import  getBrowserFingerprint  from  'get-browser-fingerprint';

//later in the code
const  fingerprint = getBrowserFingerprint();
console.log(fingerprint);
```

### Last updated

This package was most recently updated in May 2021. It was published two years ago and has been periodically updated since then.

### Weekly downloads

This package was garnering 1,299 weekly downloads at the time of writing. Though that’s the smallest number of downloads on this list, clearly the package has some fans among developers. 

### Size

The unpacked size for get-browser-fingerprint is just 10.9 KB, which is a big plus, since its small size makes it easier to integrate.

### Level of detection

The get-browser-fingerprint package can uniquely detect a user, but not if that user is in Incognito mode. This means it’s less effective at fighting issues like content abuse where incognito mode is frequently used to avoid paywalls. 

## ClientJS

![ClientJS](/img/uploads/fy17ayw.png)

[ClientJS](https://www.npmjs.com/package/clientjs) is the second most used package in this list behind Fingerprint.

### Ease of use

To use ClientJS, first install the package, then import it, create a client, and get the user’s fingerprint:

```js
import { ClientJS } from 'clientjs';

//later in the code
const client = new ClientJS();
const fingerprint = client.getFingerprint();
```

### Last updated

ClientJS was published six years ago and has been maintained and updated periodically. At the time of writing, the last update was in August 2021.

### Weekly downloads

ClientJS was garnering 12,426 weekly downloads at the time of writing, which makes it the second most downloaded package on this list. Many different projects and developers [make use of ClientJS](https://github.com/jackspirou/clientjs/network/dependents?package_id=UGFja2FnZS0xMzc2NTA5MQ%3D%3D).

### Size

This package is the largest on the list, with an unpacked size of 1.01 MB. This could be a drawback in terms of the space and resources you would need to run it.

### Level of detection

ClientJS is capable of detecting users uniquely both in normal and incognito mode. You can even test it on [their website](https://clientjs.org).

## Browser Fingerprint

![Browser Fingerprint](/img/uploads/savyohp.png)

[Browser Fingerprint](https://www.npmjs.com/package/browser_fingerprint) allows you to detect unique users on your server by examining their header and connection information. It optionally uses cookies to make sure the fingerprint is consistent. This could be more aptly described as “session identification” rather than true browser fingerprinting. From the project’s [Github page](https://github.com/actionhero/browser_fingerprint), its authors describe the output as “information \[that] can be used as a "poor man's" session identifier in your node projects.”

### Ease of use

If you’re not using its cookies feature, Browser Fingerprint can be set up and used in a few lines of code:

```js
const { BrowserFingerprint } = require("browser_fingerprint");
const  fingerPrinter = new  BrowserFingerprint();

//inside request controller
let { fingerprint } = fingerPrinter.fingerprint(
  req
); //unique fingerprint
```

You can additionally pass an array of options to change settings related to the cookie it adds to requests:

```js
const options = {
  cookieKey: "__browser_fingerprint",
  toSetCookie: true,
  onlyStaticElements: true,
  settings: {
    path: "/",
    expires: 3600000,
    httpOnly: null,
  },
};

const fingerPrinter = new BrowserFingerprint(options);
```

### Last updated

This package was published nine years ago and has been updated seventeen times since then. At the time of writing, the last update was in April 2021.

### Weekly downloads

Browser Fingerprint was being downloaded 3,681 times weekly at the time of writing this article. 

### Size

This package is the second smallest on this list at 39.3 KB, which means it can more easily integrate with your projects.

### Level of detection

Browser Fingerprint is not always accurate. When used on Safari, it was able to detect the user uniquely in both normal and incognito modes. However, when used on Chrome, it was not able to detect the user uniquely in normal mode. It produced different fingerprints on each reload.

# Conclusion

It's important to weigh the different pros and cons when picking a package for your project. If resources are a concern for you, you might want a smaller package. If you need to be able to monitor users on the client-side and the server-side, you’ll want a package that can do both. You’ll also want your fingerprint package to be as accurate as possible, so you can rely on the data gathered. 

With these criteria in mind, you should be able to select the correct fingerprint package for protecting your business.
