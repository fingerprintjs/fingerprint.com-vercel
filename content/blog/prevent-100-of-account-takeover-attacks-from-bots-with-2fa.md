---
templateKey: long-form-content
metadata:
  title: Prevent 100% of Account Takeover Attacks from Bots with 2FA
  url: https://fingerprint.com/blog/prevent-account-takeover-with-two-factor-authentication/
  description: Find out why Microsoft and Apple recommend 2FA for stopping
    automated bots and malicious humans from stealing your online accounts.
  image: /img/uploads/prevent-100-of-account-takeover-attacks-from-bots-with-2fa.png
featured: true
publishDate: 2021-10-26T20:49:50.805Z
title: Prevent 100% of Account Takeover Attacks from Bots with 2FA
tags:
  - fingerprinting
  - account takeover
  - bot attacks
  - privacy
  - ecommerce fraud
authors:
  - Leon Yen
heroImage:
  image: /img/uploads/prevent-100-of-account-takeover-attacks-from-bots-with-2fa.png
  imageAlt: Account takeover
  imageTitle: Account takeover
customCTA:
  openCtaNewTab: false
isPublished: true
isHidden: false
---
Microsoft’s cloud services see over 300 million fraudulent sign-in attempts every day, so when it recommends two-factor authentication (2FA) to [prevent account takeovers,](/account-takeover/) internet users are well advised to take heed. But don’t just take its word for it — Google claims that <a href="https://security.googleblog.com/2019/05/new-research-how-effective-is-basic.html" target="_blank" rel="noopener">100% of automated bots</a> can be blocked with 2FA, not to mention 99% of bulk phishing attacks and 66% of targeted attacks.

In this article, we’ll find out why the world’s largest software company and the internet's leading search engine both claim that 2FA is the best defense against account takeovers.

## 2FA versus two-step verification

2FA and two-step verification are often conflated by mistake, so it’s worth differentiating the two methods:

* **Two-step verification** requires a standard username/password login plus an additional confirmation activity (e.g., an email response/click or one-time password) for gaining access
* **2FA** requires a standard username/password login plus additional confirmation from an item in the users’ possession (e.g., a hardware token or smartphone) or verification of a unique user attribute (e.g., a fingerprint, iris scan, voice signature, or other biometrics)

2FA provides superior user authentication and account security when compared to 2-step verification. For example, a cyber criminal with access to a user’s  smartphone and username/password could verify a login attempt and gain access with only 2-step verification in place. In contrast, a website with 2FA would block cyber attackers in their tracks, as they would have no way to provide authentication for the second factor.

## What makes 2FA so secure?

2FA works by eliminating user authentication “blind spots” during the login process — weaknesses that cyber attackers and bots always look to exploit, if available. After setting up 2FA, the website or service will send an alert every time a login is attempted; upon submitting a correct username and password combination, users are instructed to further verify their identities using another mechanism like a second device/app or security token. Since remote cyber attackers and bots almost always lack the second authentication mechanism, 2FA effectively eliminates their ability to remotely hijack user’s accounts.

## What are the best ways to configure accounts for 2FA 

In efforts to keep up with the latest security practices, many popular websites and service providers offer 2FA as a configurable option/setting. The following are some of the more popular 2FA options:

* **Text message:** SMS is an easy way to confirm a login attempt — once the correct username and password is entered, users receive a text with a one-time code. To log in, users simply enter the code to  confirm their identity.
* **Authenticator apps:** Programs such as Duo and Google Authenticator are increasingly popular ways to use 2FA. Once users download and install an authenticator app, they must scan a website’s QR code or enter its details to configure 2FA. Subsequent logins with usernames and passwords must be followed up with an expiring code provided by the authenticator app.
* **Security token:** These diminutive, physical devices provide users with a time-based, one-time password (TOTP) password generated on-the-fly and continuously rotated on the device itself. For example, banks often issue security tokens to customers for use with their online banking accounts. 
* **Physical key:** Physical keys usually take the form of a USB stick designed for insertion into the account-accessing device. The key’s presence in the USB drive validates the user’s identity, and may require an additional user interaction (e.g., a button click on the key face) to complete the verification
* **Biometrics:** Biometrics validate users’ identity using sophisticated technologies like facial recognition or fingerprint scanning versus simply requiring the user to check a confirmation box or inserting a TOTP.

SMS-based 2FA is considered the easiest option for users, as most smartphone owners are accustomed to sending and receiving text messages. This option is also the riskiest, as SMS messages can easily be intercepted. Authenticator apps offer better protection than SMS-based 2FA but still fall short of hardware-based 2FA solutions.

Interestingly, physical 2FA keys have fallen out of public favor due to the stigma of USB drives and their propensity for malware. In contrast, hardware security tokens continue to be a long standing favorite of cybersecurity professionals looking to deploy 2FA. 

The mass commercialization of biometrics scanners has made them viable options for 2FA, though many users harbor lingering privacy concerns regarding the use of such highly personal data. Notwithstanding, biometrics-based 2FA arguably comes the closest to balancing convenience with security. Apple's Face ID and Windows Hello are the most popular biometrics-based 2FA technologies in use by consumers today, not to mention the fingerprint readers built into many of today’s laptops.

At the end of the day, the efficacy of a given 2FA option is inversely proportional to its ease-of-use: the harder it is to use, the less likely it is that users will continue using it — or use it correctly, for that matter. 

## Options for setting up 2FA

As mentioned previously, most popular web services come with user configurable 2FA options (usually located under the security settings). Some popular 2FA apps that work with the leading websites include:

* Authy
* Duo
* Google Authenticator
* Microsoft Authenticator
* Authenticator Plus

The following password manager apps also have 2FA capabilities for integrating with leading websites:

* LastPass
* 1Password
* NordPass
* Keeper
* Dashline

## Conclusion

As the efficacy of usernames and passwords continues to wane, 2FA is likely to become the de facto authentication standard for bolstering user accounts against fraudster or bot-initiated account takeover attacks. In terms of the latter, cyber criminals commonly rely on automated attack bots to carry out thousands of login attempts at a time. This makes it crucial to implement 2FA in conjunction with solutions like [Fingerprint Pro](/account-takeover/) to uniquely identify visitors and detect patterns of fraudulent behavior. Give it a [test drive](https://dashboard.fingerprint.com/signup) today, it’s free with unlimited API access for 10 days.