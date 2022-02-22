---
templateKey: long-form-content
metadata:
  title: How to Use FingerprintJS To Prevent Bot Attacks
  description: Bad bots are smart enough these days to evade the security controls
    of most signup forms. Learn how FingerprintJS can help prevent bot attacks
    when other measures fail.
  url: https://fingerprintjs.com/blog/fingerprintjs-prevent-bot-attacks
  image: /img/uploads/prevent-bot-attacks-5-.png
featured: true
publishDate: 2021-09-09T20:44:44.264Z
title: How to Use FingerprintJS to Prevent Bot Attacks
isPublished: true
tags:
  - fingerprinting
  - account takeover
  - web
  - bot attacks
  - ecommerce fraud
  - payment fraud
authors:
  - Allan MacGregor
heroImage:
  image: /img/uploads/prevent-bot-attacks-5-.png
  imageAlt: Prevent bot attacks
  imageTitle: Prevent bot attacks
customCTA:
  openCtaNewTab: false
---
The purpose of this tutorial is to demonstrate how easy it is to detect and mitigate bad bot account signups with FingerprintJS Pro. Users will first create a sample registration website with basic security controls to prevent multiple signups, then simulate a bot attack to defeat those controls using open source tools. Lastly, they will integrate FingerprintJS Pro into the website’s security workflow to detect/stop advanced bots, even when other security methods have failed.

As a starting point, readers may wish to (re)visit the tutorial on How to Prevent Multiple Signups With FingerprintJS Pro, which covers more basic attempts at multiple account creation (e.g., revisiting the registration form in incognito mode). 

### A WORLD OF BAD BOTS

With a large percentage of today’s web traffic created by bad bots, website owners are increasingly falling victim to automated attacks. Bat bots accounted for a quarter (25.6%) of all internet traffic in 2020, up from 24.1% in 2019. Suffice to say, stronger security controls are required to survive in this hostile cyber landscape.

And who would know better than the operator of the most trafficked website in the world? Earlier this year, a massive bot attack targeted Google Analytics (GA) with hordes of bogus traffic sent to non-existent web pages, skewing report metrics for many of its customers. Despite implementing controls to mitigate the zombie traffic, Google’s efforts are only stopgap measures in a perpetual game of whack-a-mole against increasingly sophisticated opponents.

According to [Imperva's 2021 Bad Bot Report](https://www.imperva.com/resources/resource-library/reports/bad-bot-report/), bad bots are responsible for an ever-widening array of malicious activity, including:

* **Scraping:** allows perpetrators to harvest data from a website without the owner’s permission. Common methods include content scraping (i.e., stealing proprietary content) and price scraping (i.e., extracting pricing information for competitive purposes) 
* **Gift Card Balance Checking:** allows malicious attackers to steal money from active gift card accounts
* **Denial of Service:** slows a website’s performance, causing downtime or a degraded visitor experience. 
* **Account Creation:** allows attackers to create free accounts for creating spam and/or amplifying propaganda.

Bot attack prevention should be a shared concern amongst all website owners, whether it’s for preserving the accuracy of website traffic analytics or ensuring the safe operations of vaccine booking websites. Unfortunately, malicious actors continue refining their bots’ ability to mimic human behavior, making the goal of detection a constantly moving target.

### FINGERPRINTJS PRO AND BOT DETECTION

This tutorial uses [FingerprintJS Pro](/) to prevent bad bots from defeating an account signup form’s email verification system. As the most advanced browser fingerprinting solution on the market, FingerprintJS Pro can identify unique website visitors with an accuracy of 99.5%.

It’s worth noting that while FingerprintJS Pro is highly effective at detecting fraudulent activity and abuse patterns typical of bots (e.g., repeat visits and multiple form submissions), it doesn’t explicitly differentiate between bot and human visitors. If you want to flag visitors based on their likelihood of being a bot, we have built an open source bot detection library to recognize bots through the detection of automation tools, browser spoofing, and virtual machines. This free library can be used in conjunction with FingerprintJS Pro to both detect bots and generate a persistent visitor identifier.

### TUTORIAL REQUIREMENTS

* **[FingerprintJS Pro](https://dashboard.fingerprintjs.com/signup)** is required; new users can sign up for a free account.
* **[Splinter](https://github.com/cobrateam/splinter)** is used for simulating a user (or many users) completing the signup form. The popular Python-based testing framework enables the automation of browser actions like visiting URLs and interacting with web page elements, among others.
* **[1secMAIL](https://1secmail.com)** is used to generate disposable mailboxes during the account creation process.

Lastly, the following items should be installed in the environment where the tutorial files are located:

* **Yarn** - for installing the multiple signup demo project dependencies
* **Pip** - for installing Splinter
* **Node.js** - provides the JavaScript runtime environment and web server
* **Docker/PostgreSQL** - for quickly spinning up a transient PostgreSQL instance 

### PREPARING THE SIGNUP FORM AND DATABASE

This tutorial involves a fictional online course platform that offers free 14-day trials. The website owner wants to prevent trial users from registering several accounts with multiple emails and extending their trials indefinitely.

Start with the existing sample registration form provided by FingerprintJS called [multiple-signup-demo](https://github.com/fingerprintjs/multiple-signup-demo).

Run `git checkout` against the `initial-project-setup` branch: 

```bash
git clone -b initial-project-setup \
     https://github.com/fingerprintjs/fingerprintjs-multiple-signups-example.git \
     signup_form
cd signup_form
```

Next, make sure all the project dependencies are correctly installed:

```bash
yarn install
```

A PostgreSQL database is required for storing user registrations. To save time, use Docker to create a transient PostgreSQL server:

```bash
docker run --name sqlserver -e POSTGRES_PASSWORD=my-secret-pw  -p 5433:5432 -d postgres
```

Once the database has been created, run the following commands to generate the initial schema:

```bash
psql --username=postgres --port=5433 --password
postgres=#  create schema development;
```

Run the initial migration inside the `sql/` folder:

```bash
psql --username=postgres --port=5433 --password development < sql/0001_initial.sql
```

Start the application to verify that the registration form is working correctly:

```bash
yarn start
```

Open [localhost:3002/signup](http://localhost:3002/signup) in a browser. If everything is working correctly, the signup form should appear as follows:

![Registration form](/img/uploads/bot-registration.png "Registration form")

Insert a dummy email address and submit the form:

A page is displayed confirming that the account was created successfully.

Start the registration process again with an empty form. Insert the same email address as before and submit the form—it should return the error `User with this email already exists`:

![Email taken already](/img/uploads/bot-email-taken.png "Email taken already")

The following is the signup form’s `index.js` code:

```javascript
// signup form submission
  app.post('/signup', async function signup(req, res, next) {
    const {email} = req.body

    try {
      if (!email) {
        throw new Error('email is required')
      }

      const result = await client.query('insert into users(email) values($1) returning *', [email])
      console.log(`${result.rows[0].email} added to the db`)

      res.render('signup_success', {layout: 'index'})
    } catch (e) {
      console.error(e)

      let message = e.message

      if (e.code === '23505') {
        message = 'User with this email already exists'
      }

      res.render('signup', {layout: 'index', error: message, email})
    }
  })
```

After the user submits the form, the system will attempt to create a new record in the `users` table. If the email already exists, the error is caught and the user is notified about the duplicate entry.

## Simulating an Attack with Splinter

Now that the signup form is up-and-running, the next step is to use Splinter and some Python code to simulate an attacker’s actions. FingerprintJS Pro has yet to be installed, so using unique email addresses should be enough to automate multiple account signups. 

Start by creating a new directory called `signup_bot`:

```bash
mkdir signup_bot 
cd signup_bot
```

Next, install [Splinter](https://github.com/cobrateam/splinter) by running the following:

```bash
pip install splinter
```

Verify that Splinter is working by copying the following code and saving it as `main.py`:

```python
from splinter import Browser
import random
import string

with Browser() as browser:
    # Visit URL
    url = "http://localhost:3002/signup"
    browser.visit(url)

    # Fill the form
    letters = string.ascii_lowercase
    email = ''.join(random.choice(letters) for i in range(10))
    email = "{}@thebuilder.com".format(email)
    browser.fill('email', email)

    # Submit the form
    button = browser.find_by_text('Create Account')
    button.click()

    # Validate form submission
    if browser.is_text_present('We have sent you a link to confirm your account'):
        print("[SUCCESS] Registration Successful! :)")
    else:
        print("[ERROR] Registration Failed :(")
```

This is a simple version of the code that will:

* open a browser instance
* load the target URL
* fill the email field with a randomly generated email
* submit the form and validate the appearance of the email confirmation page

Run the script:

```python
python main.py
```

The following message should log out into the terminal: `[SUCCESS] Registration Successful! :)`

### Modern Security Measures (And How To Defeat Them)

At this point, the registration process involving the signup form submission has been successfully automated, as our demo signup form does not require any additional authentication steps. However, since live signup processes will have additional steps to discourage bot activity, the next section will include an optional demonstration on how to circumvent one of the most common security measures with automation. If you’d like, you can skip this section.

One common security workflow is to only activate new accounts after a user clicks on a link sent via email. This added step can stop randomly generated email addresses from being able to complete signup if the intent is to create valid and active accounts.

[1sec MAIL](https://1secmail.com) is a service that generates disposable mailboxes on demand; conveniently, a Python library is also available for use in this tutorial.

Install the library using the following command:

```
pip install onesecmail
```

The library can be used directly from the Python console:

```python
python
>>> from onesecmail import OneSecMail 
>>> mailbox = OneSecMail.get_random_mailbox() # Generates a random mailbox
>>> print(mailbox)
<OneSecMail [vbbew64ng2bq@1secmail.com]>
>>> messages = mailbox.get_messages()
>>> print(messages)
[<EmailMessage; from='registration@localhost', subject='Verify your email', date='2021-06-28 00:03:27+02:00'>]
```

Previously, the script was auto-generating email addresses randomly without actually creating real accounts/mailboxes—any confirmation emails sent to these addresses would therefore bounce. By integrating 1secMail, the signup bot can use real email accounts to capture the validation links. 

Update the signup bot script to use 1secMAIL:

```python
from splinter import Browser
from onesecmail import OneSecMail


def create_mailbox():
    mailbox = OneSecMail.get_random_mailbox()
    return mailbox

def registration(email):
    with Browser() as browser:

        # Visit URL
        url = "http://localhost:3002/signup"
        browser.visit(url)

        # Fill the form
        browser.fill('email', email)

        # Submit the form
        button = browser.find_by_text('Create Account')
        button.click()

        # Validate form submission
        if browser.is_text_present('We have sent you a link to confirm your account'):
            print("[SUCCESS] Registration Successful! :) - {}".format(email))
        else:
            print("[ERROR] Registration Failed :(- {}".format(email))

def main():
    count = input("How many accounts do you want to generate?: ")
    count = int(count)

    for count in range(0,count):
        # Create a random mailbox
        mailbox = create_mailbox()
        # Do initial registration 
        registration(mailbox.address)

if __name__ == "__main__":
    main()
```

The new version of the script includes a few modifications. To start, the code has been broken down into three functions:

* `create_mailbox` handles the communication with OneSecMail and returns a temporary mailbox.
* `registration` creates a browser instance and interacts with the signup form.
* `main` is the main wrapper for the script. In addition to calling the `create_mailbox` and `registration` functions, it specifies how many accounts are to be created. 

Try it out by running the following:

```bash
python main.py
```

The console should look something like this:

![Console bot](/img/uploads/bot-console.png "Console bot")

Future development might include additional code for reading the emails and opening the confirmation links; for the sake of brevity, it’s assumed that completing this part would successfully automate the signup process entirely. By integrating Splinter and 1secMAIL in an automated signup bot script, malicious actors can easily bypass the security controls of most website registration forms.

### Adding Extra Security with FingerprintJS Pro

When traditional security measures fail to prevent unauthorized accounts from being created, FingerprintJS Pro can be an incredibly powerful tool for securing websites against bad bots. Its browser fingerprinting technology is the most advanced on the market, combining various cutting-edge methods for uniquely identifying browsers with machine learning algorithms and a probability engine; the result is an astonishing 99.5% accuracy rate.

> *A browser fingerprint* is a set of information related to a user’s device. This includes a device’s hardware, operating system, browser, and configuration. Browser fingerprinting is the process of collecting information through a web browser to build a fingerprint of a device. 

[FingerprintJS](https://dev.fingerprintjs.com/docs/introduction) uses browser fingerprinting among other techniques to generate a `visitorID` value. This value is then returned to the application, providing a persistent record of a specific user.

To start implementing FingerprintJS Pro, create a new [FingerprintJS account](https://dashboard.fingerprintjs.com/signup/)—it’s free for 10 days and includes unlimited API calls.

After successfully registering, a snippet of code is provided to add to the website:

```html
<script>
  function initFingerprintJS() {
    FingerprintJS.load({token: 'my-public-api-key'})
      .then(fp => fp.get())
      .then(result => console.log(result.visitorId));
  }
</script>
<script
  async
  src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
  onload="initFingerprintJS()"
></script>
```

Add the following snippet of code to `signup_form/views/signup.hbs`

```hbs
<div class="signup-form container">
  <div class="logo">
    <img src="/images/logo.svg">
  </div>
  <div class="row signup-form-content">
    <div class="col-md-4 offset-md-1">
      <div class="promo-container">
        <h2 class="promo-header">
          Gain free access to <span class="accent">over 9,000
            courses</span> for 14 days!
        </h2>
        <div class="promo-text">
          <p>Learn coding, design, illustration, music production, video editing and tons of other things at
            e-learning.com.
            We have literally hundreds of thousands of hours of content created by some of the best instructors in the world,
            who are experts in their fields.</p>
          <p><strong class="accent">Start learning today!</strong></p>
        </div>
      </div>
    </div>
    <div class="col-md-5 offset-md-1">
      <div class="card">
        <div class="card-body">
          <h2 class="card-title">Sign up for free</h2>
          <p class="auth-switcher-text">Already have an account? <a href="#">Sign in</a></p>

          <form method="POST" action="/signup">
            <div class="form-group">
              <input
                required
                type="email"
                class="form-control {{#if error}}is-invalid{{/if}}"
                id="email"
                name="email"
                placeholder="Email"
                value="{{#if email}}{{email}}{{/if}}"
              >
              {{#if error}}
              <div class="invalid-feedback">
                {{ error }}
              </div>
              {{/if}}
            </div>
            <div class="signup-button-wrapper text-center">
              <button class="btn btn-primary signup-button">Create Account</button>
            </div>
          </form>
          <div class="conditions">
            By signing up, you agree to our
            <a href="#">Terms and Conditions</a>
            and the
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  function initFingerprintJS() {
    FingerprintJS.load({token: 'my-public-api-key'})
      .then(fp => fp.get())
      .then(result => console.log(result.visitorId));
  }
</script>
<script
  async
  src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
  onload="initFingerprintJS()"
></script>
```

Verify that the integration is working correctly by reloading the page and checking the browser console. A string like this should appear:

![Unique ID](/img/uploads/bot-unique.png "Unique ID")

This is the `visitorID` that can be used to reliably identify the browser, regardless of any masking or blocking attempts. Try opening the signup form in the browser’s incognito mode—notice that the `visitorID` is the same. 

Next, make use of the `visitorID` value by passing it to the server upon form submission:

```hbs
<div class="signup-form container">
...
          <form method="POST" action="/signup">
            <div class="form-group">
              <input hidden type="text" id="visitorId" name="visitorId" value=""/>
              <input
                required
                type="email"
                class="form-control {{#if error}}is-invalid{{/if}}"
                id="email"
                name="email"
                placeholder="Email"
                value="{{#if email}}{{email}}{{/if}}"
              >
...
</div>

<script>
  function initFingerprintJS() {
    FingerprintJS.load({token: 'my-public-api-key'})
      .then(fp => fp.get())
      .then(result => {
        document.getElementById('visitorId').value = result.visitorId
      });
  }
</script>
<script
  async
  src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js"
  onload="initFingerprintJS()"
></script>
```

Return to the backend server and verify that the new `visitorID` value is being used:

```javascript
// signup form submission, inside index.js at root directory
  app.post('/signup', async function signup(req, res, next) {
    const {email, visitorId} = req.body

    try {
      if (!email) {
        throw new Error('email is required')
      }

      const hasVisitorId = (await client.query('select * from users where visitor_id = $1', [visitorId])).rows.length > 0

      if (hasVisitorId) {
        throw new Error('Looks like you already have an account, please sign in')
      }

      const result = await client.query('insert into users(email, visitor_id) values($1, $2) returning *', [email, visitorId])
      console.log(`${result.rows[0].email} added to the db`)

      res.render('signup_success', {layout: 'index'})
    } catch (e) {
      console.error(e)

      let message = e.message

      if (e.code === '23505') {
        message = 'User with this email already exists'
      }

      res.render('signup', {layout: 'index', fpjsToken: process.env.FPJS_TOKEN, error: message, email})
    }
  })
```

The code above has been adjusted to:

* read the `visitorID` from the request body
* make a call to the database and check for any existing users with the same `visitorID` 
* throw an error if a user exists in the system with the same `visitorID` 

If  the visitorID is not found in the users table, the script can create a new user with the `email` and `visitorID` values provided. Be sure to run the following migration before running the code:

```sql
alter table users
    add column visitor_id text null unique;
```

Trying to create multiple accounts will result in the following error:

![Error, already have an account](/img/uploads/bot-effor.png "Error, already have an account")

Run the signup bot against the new form and observe what happens: 

[![asciicast](https://asciinema.org/a/yifLsZzbe9iABxAK8ovEBlukX.svg)](https://asciinema.org/a/yifLsZzbe9iABxAK8ovEBlukX?data-speed="10"&autoplay=1)

Even if different email addresses are used, **FingerprintJS** correctly flags the signup attempt as coming from the same visitor. At this point, a website operator could choose to block further sign-up attempts.

### Conclusion

While it’s not possible to completely prevent bot attacks given their current sophistication levels, website operators can drastically reduce the risk of compromise by combining techniques like email validation and CAPTCHAS with [**FingerprintJS Pro**. ](https://dashboard.fingerprintjs.com/signup)This layered approach merges traditional techniques for confirming accounts with a solution that’s 99.5% accurate for identifying unique visitors. And for recognizing bot activity and identifying malicious bots, **[Botd](https://github.com/fingerprintjs/botd)** offers powerful bot detection in an easy-to-use, open source library.

The full code for the examples used in this article can be found here:

* [multiple_registration_form](https://github.com/fingerprintjs/multiple-signup-demo)
* [fingerprintjs_registration_bot](https://github.com/amacgregor/fingerprintjs_registration_bot)
