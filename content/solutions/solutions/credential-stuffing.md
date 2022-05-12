---
templateKey: solution-content
metadata:
  title: Credential Stuffing Prevention - Fingerprint Pro
  image: /img/uploads/credential-stuffing.png
  imageAlt: test alt
  imageTitle: test title
  description: Explore our full code solution for credential stuffing prevention.
    Stop automated attacks on your login page with our user identification API.
  url: https://fingerprint.com/solutions/credential-stuffing
publishDate: 2021-11-12T15:48:01.198Z
isPublished: true
isHidden: false
title: Credential stuffing
description: Detect automated injection of stolen usernames and passwords on
  your login page before an attacker can do any damage.
solutionCode:
  iframeUrl: https://stackblitz.com/edit/node-e9yupj?devtoolsheight=33&embed=1&file=docs/credential-stuffing.md
  shareUrl: https://stackblitz.com/edit/node-e9yupj?file=docs/credential-stuffing.md
  docsUrl: https://github.com/
funnel:
  - Login
category:
  - Bot Attacks
  - Identity Fraud
industry:
  - Ecommerce
  - Gaming
  - Gambling
  - Financial
bottomLinks:
  - text: Full technical solution →
    url: https://www.fingerprint.com/
  - text: Full login protection documentation →
    url: https://www.fingerprint.com/
---
## How credential stuffing works

Credential stuffing is a method of account takeover where an attacker attempts to gain access to as many customer accounts as possible. It is typically performed as an automated (brute force) attack, utilizing bots to procedurally submit login requests while noting successful attempts.

![Attacker tries leaked credentials](/img/uploads/credential-stuffing-diagram1.png)

1. An attacker access lists of username and password pairs collected from data breaches. Over 3 billion credentials were reported stolen in 2016, and major breaches are being reported constantly, refreshing the available data for fraudsters to test.
2. An attacker uses automated tools to test the username and password pairs on a web application, noting any successful attempts.
3. As soon as a successful login happens, an attacker uses credentials for profit. Depending on the service accessed, they may make fraudulent purchases, use the account for phishing or other scams, access private information, or sell the login credentials.

## How Fingerprint Protects your login page

![How Fingerprint Protects the login page](/img/uploads/credential-stuffing-diagram2.png)

### What Fingerprint does

Fingerprint Pro provides a unique identifier for every visitor to your website (the visitorID) that is collected passively anytime a visitor visits a webpage with our JavaScript fingerprinting agent installed. Fingerprint Pro provides tools for validating the visitor identifiers sent by your frontend. For server-side validation, developers can utilize Fingerprint Pro's Server API or Webhooks.

Since you know your product and business landscape best, It's up to you to decide how to configure anti-fraud workflows to utilize the visitorID to catch fraud on your website. Below, we have described some best practices you can use as a jumping-off point for your own custom solution.

### Configuring Fingerprint for credential stuffing prevention

To use Fingerprint effectively to prevent all forms of account-related fraud, you should configure logic that utilizes the visitorID in conjunction with time-stamped login credentials to validate users. It is important to think through both the logic used to determine suspicious activity, as well as the challenge actions that should be taken when a visitor is flagged.

### Suspicious Activity Logic

We recommend that when a visitor attempts to log in, the visitorID and login credentials are sent to your application server where they can be persisted in the storage layer. Using this data, you can compare the current visitorID and credential pairing to previous attempts to catch threats.

Some recommended logic rules for credential stuffing are included below.

#### Using visitorIDs only:

* Check if the login request does not contain a visitorID. Stop users without a visitorID from being able to login.
* Check the provided visitorID's integrity with the Server API or Webhooks. Do not log in users with invalid or forged visitorIDs.
* Check the Confidence score. Challenge login attempts with additional authentication if the confidence score is lower than 0.99.
* Check the timestamp of the provided visitorID. If the timestamp is old, do not log in the user.

#### Using credential + visitorID pairs:

* Track unsuccessful login attempts per visitorID during the given time window (e.g. 24 hours). Take additional authentication action after 10 failed login attempts during this window, and notify the account owner.
* Check if the visitor has attempted or successfully logged into other accounts. Require additional authentication if the visitorID is associated with 3 or more accounts, and notify the account owner(s) of suspicious behavior.

### Challenge Actions

For suspicious login attempts as defined by your suspicious activity logic, you can require additional verification or authentication steps to stop fraudsters from further access.

In all the cases above, we suggest ignoring login attempts, notifying account owners about suspicious activity via email/SMS/phone, or challenging the attempted login with two factor authentication.

## Explore our credential stuffing prevention demo

To demonstrate the above concepts, we have build a credential stuffing prevention demo. Use this demo to see how you can use Fingerprint in conjunction with simple logic rules to protect a login form.