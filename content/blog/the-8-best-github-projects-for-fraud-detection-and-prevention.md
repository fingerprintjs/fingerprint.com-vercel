---
templateKey: long-form-content
metadata:
  title: The 8 Best GitHub Projects for Fraud Detection and Prevention
  image: /img/uploads/8-best-github-projects.png
  imageAlt: Best Github Projects For Fraud Detection
  imageTitle: Best Github Projects For Fraud Detection
  url: https://fingerprintjs.com/blog/github-projects-fraud-prevention
  description: Protecting your application from fraudulent users is a critical
    part of a developer's job. Learn about the best open source projects on
    Github to keep your site safe.
featured: false
publishDate: 2021-08-16T16:57:09.641Z
title: The 8 Best GitHub Projects for Fraud Detection and Prevention
isPublished: true
tags:
  - engineering
authors:
  - Piero Borrelli
heroImage:
  image: /img/uploads/8-best-github-projects.png
  imageAlt: Best Github Projects For Fraud Detection
  imageTitle: Best Github Projects For Fraud Detection
---
No matter what field you’re working in as a developer, protecting your application from malicious users is a critical part of your job. The frequency of fraud is increasing across all industries and locations around the world.

Here are just a few worrying data points on the topic:

- In 2018, internet fraud and application exploitation were responsible for a financial loss of [$2.7 billion](https://www.fbi.gov/news/stories/ic3-releases-2018-internet-crime-report-042219).
- The [AFP Payments Fraud & Control Survey](https://global.wf.com/hub_article/payment-fraud-strikes-82-organizations-2018-tm3221/) has estimated that 82% of worldwide companies have experienced payments fraud.
- The travel industry [loses 21 billion dollars _every year_](https://www.traveldailynews.com/post/battling-rising-fraud-in-the-travel-industry) due to fraudulent activity.

No business is truly safe from malicious activity, and with increasingly sophisticated methods available to attackers, it’s extremely difficult to keep up.

## Common Methods of Online Fraud
Part of the reason fraud is so common and difficult to detect is that there are so many kinds of fraud. A few of the most common include:

- **Identity fraud**: the unauthorized use of someone’s private information to commit a crime or defraud someone.
- **Payment fraud**: any transaction which was not authorized by the payee or performed illegally.
- **Phishing**: attempting to obtain sensitive information - usernames, passwords, or credit card numbers - by impersonating a trustworthy source.
- **Click fraud**: running bots to generate fraudulent traffic and clicks that improve their online advertising payouts.

The cost of fraud is usually higher than it seems. It can also result in chargebacks, regulatory fines, and reputational damage. These can be really hard to recover from, even if you manage to prevent large-scale theft.

## Detecting and Preventing Fraud Using Open Source Software
So if you’re a developer in charge of protecting your application from fraud, you need some kind of fraud detection and prevention software. The possibilities are endless, but in this article, I’ll guide you through some of the best choices for open-source projects in this field.

A solution from one of these libraries on GitHub can be a great starting point. They’re free, plus you have access to an active community of developers who maintain the project and may be available to answer support questions. Many are well-documented and proven to be effective, plus they’re free to get started with.

### 1. [FingerprintJS](https://github.com/fingerprintjs/fingerprintjs)

Only a tiny percentage of your website visitors will be responsible for any kind of fraud, so your role is to find and isolate these users. Online fraudsters are experts at hiding their identities when performing attacks, so you can count on them disguising their device, using a VPN, and clearing their browser’s cookies.

This is where a solution like FingerprintJS shines. It uses a technology called [fingerprinting](/blog/what-is-browser-fingerprinting/) to identify users on your website accurately. It does this without the need for any additional information or permissions from the user, so you won’t affect usability by implementing it.

Fingerprinting with this open-source tool has proven to be over [90% accurate](https://arstechnica.com/information-technology/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/), allowing you to identify users on your website uniquely even if they’re trying to hide their identity to perform a malicious attack. These results are possible using a combination of browser attributes, hardware specifications, IP address identification, and geolocation.

![An example of info you get when using FingerprintJS](https://i.imgur.com/KeHtUa0.png)

### 2. [DGFraud](https://github.com/safe-graph/DGFraud)

[Graph Neural Networks (GNNs)](https://neptune.ai/blog/graph-neural-network-and-some-of-gnn-applications) have been widely used in recent years as a fraud prevention tool. In this context, DGFraud is GNN based toolbox that will help you identify and prevent malicious users on your app by revealing outliers in user behavior.

Its strength is in its implementation of state-of-the-art GNN fraud detection models, which are laid out in the GitHub repository:

|    Model    |   Application   |   Graph Type  |      Base Model     |
|:-----------:|:---------------:|:-------------:|:-------------------:|
| SemiGNN     | Financial Fraud | Heterogeneous | GAT, LINE, DeepWalk |
| Player2Vec  | Cyber Criminal  | Heterogeneous | GAT, GCN            |
| GAS         | Opinion Fraud   | Heterogeneous | GCN, GAT            |
| FdGars      | Opinion Fraud   | Homogeneous   | GCN                 |
| GeniePath   | Financial Fraud | Homogeneous   | GAT                 |
| GEM         | Financial Fraud | Heterogeneous | GCN                 |
| GraphSAGE   | Opinion Fraud   | Homogeneous   | GraphSAGE           |
| GraphConsis | Opinion Fraud   | Heterogeneous | GraphSAGE           |
| HACUD       | Financial Fraud | Heterogeneous | GAT                 |

### 3. [FingerprintJS-Android](https://github.com/fingerprintjs/fingerprint-android)

While FingerprintJS can be used in the browser, things are different in the mobile world. The signals available for mobile app developers are different from the ones you could retrieve from a browser, and these signals vary between IOS and Android. To accurately identify users on your native mobile app, you will need a device-specific fingerprinting solution like FingerprintJS-Android.

As system-generated signals like _Android ID_ are slowly being [removed from the hands of developers](https://developer.android.com/training/articles/user-data-ids), third-party libraries like this one are the only way to identify users so you can minimize fraud. If you want to secure and future-proof your Android application, FingerprintJS-Android is an ideal fit.

This library works similar to its browser counterpart, using various signals to help you identify fraudsters. These signals can include:

- Hardware (model, CPU, memory, sensors, etc.)
- Operating system properties (version, build name, build number, etc.)
- Device settings
- Installed applications

A combination of these signals can help you accurately identify users, providing your app with a hard-to-spoof safety system.

![Usage of FingerprintJS-Android example](https://i.imgur.com/gjL1OUv.png)

### 4. [Maltrail](https://github.com/stamparm/maltrail#introduction)
Security is a huge concern when working with your Linux server. However, constantly monitoring it to detect malicious operations is not a time-effective choice, nor even practical. In this sense, a tool like Maltrail can be the perfect option.

Maltrail detects hostile traffic on your website using publicly available blacklists containing malicious trails. Alongside these lists, it also uses a combination of different sources to detect bad traffic on your server, including:
- IP addresses, URLs, and HTTP user-agent header values from various AV reports.
- An advanced heuristic mechanism to discover unknown threats.

If this solution sounds good for your project, you can check out a [live demo of this tool](https://maltraildemo.github.io/).

![The Maltrail interface](https://i.imgur.com/7kELeH2.png)

### 5. MISP (https://github.com/MISP/MISP)
One of the challenges of securing your project is how to share information about its vulnerabilities. Every day, security teams struggle with detecting, collecting, sharing, and reviewing known problems in a software product. 

All these operations can be tedious, and also dangerous if not shared in a safe way. In this case, an open source solution like MISP comes in help. MISP is a free tool to collect, share, and distribute data related to cyber security problems and malware detection. 

The purpose of MISP is simple: to create a safe environment where professionals can share and analyze cyber security information. Some of its core functionalities include:
- Efficient IOC and indicators database for storing all info regarding malware samples, incidents, and cyber security problems.
- An intelligent data model allowing incidents to be linked together.
- A built-in shared functionality to allow data sharing among professionals.

![Sample usage of MISP](https://i.imgur.com/q527sZk.png)

### 6. [reCAPTCHA PHP client library](https://github.com/google/recaptcha)

You should always be looking for new ways to evolve your website’s security systems and prevent new types of attacks. This is what Google has been doing in the last years with reCAPTCHA, a free CAPTCHA service that protects websites from spam and abuse.

In particular, with reCAPTCHA PHP, you have at your full disposal a PHP library wrapping up the server-side verification step required to process the answer from reCAPTCHA.
 
Moreover, this library supports both reCAPTCHA v2 and v3. Version 3 is completely invisible to the user, not requiring any interaction and providing a top-level experience for your users and a safe interaction with them for your project.

![An overview of the different versions of reCAPTCHA](https://i.imgur.com/wH3f6hS.png)

### 7. [PyOD](https://github.com/yzhao062/pyod)

Anomaly detection aims to identify events that lie outside an expected range and, therefore, might indicate suspicious activity. In the context of a web application, these types of events might indicate fraudsters performing a malicious attack.

For example, the banking industry commonly uses this method to prevent debit card fraud. Suppose you shop at a local grocery store in New York every week for a year. Then, one day, your bank receives several requests for payments made in Central Europe. This data doesn’t fit in with your previous behavior, so your bank might send you a verification email or SMS to ensure the anomaly isn’t fraudulent activity.

PyOD is a Python toolkit for performing anomaly detection in your app based on many different data inputs. It includes linear, proximity-based, probabilistic, and neural network models so you can pick the method that works best for your use case. It requires a pretty fluent knowledge of machine learning algorithms but includes links to many good resources on the topic if you’re unfamiliar with them.

![Benchmarks for PyOD](https://i.imgur.com/BvSHCgW.png)

### 8. [PhishingKitHunter](https://github.com/t4d/PhishingKitHunter)

Phishing is one of the most common forms of online fraud, and PhishingKitHunter can help you protect your customers from phishing campaigns that use your website as bait. By analyzing the fraudulent referer’s URL, PhishingKitHunter will log access to files on your site that the attacker might be using. 

Using information from PhishingKitHunter, you can find out where the phishing attempt originated from, the time that it took place, and a WHOIS report to help you track down the attacker’s website owner. You can then warn your users about the possible attack and hopefully help them mitigate any damage done.

![An example usage on the homepage of PhishingKitHunter](https://i.imgur.com/LOsNO5d.png)

## Conclusion

Fraud detection and prevention are essential functions in any business, and open-source projects like the ones above provide a great place to start. Whether one of the solutions above works immediately or gives you a starting point to build from, these open-source tools should give you some idea of what’s possible in the fraud prevention space.

If you’re looking for something more, check out [FingerprintJS Pro](/), which can help you identify users with 99.5% accurate browser fingerprints. Identifying users can help you detect fraud and prevent account takeovers _before_ they become a real problem for your customers.
