---
templateKey: long-form-content
metadata:
  title: The Guide To Browser Fingerprinting For Product and Growth Teams
  description: Browser fingerprinting is a useful tool for developers to uniquely
    identify visitors on their website. Learn how this identification technique
    works with a real-life example.
  url: https://fingerprint.com/blog/browser-fingerprinting-for-growth
  image: /img/uploads/3.png
  imageAlt: Browser fingerprinting for growth teams
  imageTitle: Browser fingerprinting for growth teams
  socialImage: /img/uploads/3.png
featured: false
publishDate: 2022-05-07T05:13:23.914Z
title: Browser Fingerprinting For Product and Growth Teams
isPublished: true
isHidden: true
tags:
  - fingerprinting
authors:
  - Dan Pinto
heroImage:
  image: /img/uploads/3.png
  imageAlt: Browser fingerprinting for growth teams
  imageTitle: Browser fingerprinting for growth teams
customCTA:
  openCtaNewTab: true
  title: Comparing OSS vs. Pro?
  description: Download our PDF guide with a full comparison.
  ctaText: Get the PDF
  ctaUrl: https://try.fingerprintjs.com/en-us/oss-vs-pro-comparison-pdf
---
**Behind the scenes of all analytics, attribution and anti-fraud tools is an identifier that can track returning visits from a logged-out visitor.** Cookies, IP addresses and local storage have been traditionally used for this purpose, but they have drawbacks, particularly if the traffic has a high rate of incognito browsing. With a highly accurate identifier it becomes much easier for developers to analyze visitor behavior, personalize web experiences, and collect reliable attribution data.

Browser fingerprinting technologies are a cornerstone technology for visitor identification that cuts through spoofing attempts to accurately identify users. Our open source [browser fingerprinting library](https://github.com/fingerprintjs/fingerprintjs) has over 16K stars on Github and is used by 8,000+ websites, including 12% of the top 500 by traffic. Fingerprinting techniques on their own have been found to be over [90% accurate](https://arstechnica.com/information-technology/2017/02/now-sites-can-fingerprint-you-online-even-when-you-use-multiple-browsers/) in correctly identifying a unique user in the browser, and when used in conjunction with usage history, fuzzy matching, and probability engines, this accuracy can be further improved.

## How Fingerprinting Works

#### Identifying a Vehicle

Here’s an analogy: let’s say you’re a detective in a large city trying to find the driver of one specific car, as captured by a security camera. To find this car your plan is to go to a busy intersection and take note of all the details of passing cars until you find one that matches the vehicle on the security camera. Ideally, you would like to be able to uniquely identify the car, such that only one vehicle in the city matches your description, otherwise you’ll have to question multiple drivers.

If the security camera caught some basic details (or signals) about the car, you’ll be able to narrow your search considerably:

* Color (red)
* Manufacturer (Ford)
* Type of car (truck)
* Model name (F-150)
* Brand of tires (stock Goodyears)
* Age/year (2015-2021)

With these signals, you may be able to uniquely identify the vehicle right away, especially if any of the specifics are particularly rare. However, in a city with millions of drivers, there may be hundreds of red Ford F-150 trucks with standard-issue tires. The more standard the combination of signals, the harder it is to get a unique match.

In those cases, you hope that your camera may have gotten lucky and matched on a more unique signal about the vehicle:

* Wood panelling
* Custom decal or logo
* Body damage/rust patterns
* Interior decorations

One of these signals may quickly narrow down your search. A red Ford F-150 truck with a local company’s logo could very well be unique, even in a large city.

There is, of course, the most uniquely identifiable element of a car - the license plate. License plates serve the express purpose of uniquely identifying a car, but they aren’t useful if the vehicle owner removes their plates or swaps them with fakes. It’s important to have a backup for when this method of identification fails.

By assembling a broad and comprehensive set of identifiers you can narrow the list of possible drivers to make singling out one individual much easier.

#### Identifying a Visitor

Fingerprinting works almost exactly the same as the example above. Now, you are trying to identify a visitor to a web or mobile application (the person) by capturing signals passed via the visitor’s browser or device (the car) captured through a fingerprinting function (the security camera).

A lot of signals can be captured by the browser, including:

* User agent details (browsers installed and their versions, operating system)
* Hardware details (screen resolution, battery usage, device memory)
* Browser plugins used
* Browser and OS settings
* WebGL parameters

When a visitor lands on a webpage, the fingerprinting function collects signals and compiles them into a hash that can be stored. Any time this visitor returns to the website, their fingerprint can be compared to past visit history.

## Accuracy

For a fingerprint to be useful as a method of identifying visitors, it needs to have a high accuracy. Our Fingerprint Pro tool has a 99.5% accuracy rate, which means for every 1,000 visits, 995 are correctly associated with a unique identifier.

For the 5 out of 1,000 that are not correctly identified, they can be described as either false positives or false negatives:

* False positive: multiple unique visitors are given the same fingerprint
* False negative: one visitor over multiple visits are given different fingerprints

To reduce false positives and false negatives, your fingerprint should combine not only many signals, but the right combination of signals that balance both uniqueness and stability. If a signal is highly unique, it will reduce your chances of a false negative, whereas stable signals will reduce your chances of a false positive.

![Graphic of signals by stability and uniqueness](/img/uploads/capture.png "Graphic of signals by stability and uniqueness")

This framework can also be used to remove signals from your fingerprinting function altogether. If a signal has both low uniqueness and low stability, it is likely to change or be spoofed frequently, and doesn’t contribute meaningfully to uniqueness. To our car example, this might be whether a car has a dirty windshield - you cannot count on this signal to improve your chances of finding the correct car. In the world of browser fingerprinting, current battery level is a poor signal, and so while it is accessible, we remove it from our fingerprinting function.

## The Case for Cookies

Special consideration should be given to perfectly unique identifiers that are not always available.

Cookies work by storing a unique identifier hash in the browser when a visitor first lands on your website. When a visitor has a cookie that matches a previous visit record in your database, you can be certain that these two visitors are the same. However, cookies are a very easy identifier to conceal:

* Cookies can be cleared in browser settings
* Adblockers can disable cookies by default
* Visitors can revoke consent to being cookied as part of GDPR or CCPA

In these cases, instead of including a cookie as an identifier in your fingerprinting function, it can be more useful to use logic to determine when to use cookies as your identifier:

* If cookie matches a previous record: use cookie
* If no cookie matches previous record: use fingerprint

One of the main advantages of fingerprinting is that it is stateless. A well-implemented fingerprint can remain stable through multiple sessions, incognito browsing, uninstalling or reinstalling apps, or clearing cookies. For that reason, using the two methods in conjunction with one another can give a higher % accuracy than either identification method alone.

*Fingerprint Pro achieves its high rate of accuracy by using fingerprinting, cookies and additional machine learning techniques that incorporate IP address and geolocation.* One challenge is keeping up with changes in available signals as new browser versions are released. Anytime Chrome or Safari is updated, for example, identification techniques need to be re-evaluated to determine if further tweaks need to be made to keep accuracy high. Our team is constantly looking to improve our accuracy by iterating on the signals, algorithms, and techniques used.

## Applications For Fingerprinting

Fingerprinting is an incredibly flexible tool that can be used for a variety of use cases:

* **Attribution:** collecting 'first touch' and visit history for converted leads
* **Personalization:** showing better product recommendations and running consistent AB tests
* **Predicting chargebacks and loan defaults:** improve fraud/risk scoring models based on past visitor behavior
* **Preventing Account Takeover (ATO):** require 2FA for new or suspicious login attempts
* **Preventing multiple signups:** stop promo and review fraud by catching visitors attempting to create many accounts
* **Account sharing prevention:** catch subscription sharing across multiple devices
* **Paywall enforcement:** cap readers at a maximum number of articles with accuracy

## Browser vs. Device Fingerprinting

Our "core" [Fingerprint](https://github.com/fingerprintjs/fingerprintjs) library is intended for browser fingerprinting - it identifies visitors to a website using all modern mobile and desktop browsers. The signals available for mobile app developers are different from signals that can be retrieved in the browser however, and vary between iOS, Android, and other mobile operating systems.

If you want to identify users of a native mobile app, we have a few options in our product suite:
* Fingerprint Pro, in addition to browser fingerprinting, includes high-accuracy native [Android](https://dev.fingerprintjs.com/docs/native-android-integration) and [iOS](https://dev.fingerprintjs.com/docs/native-ios-integration) integrations that allow developers to integrate device identification into native Android and iOS apps.
* Our [iOS open source library](https://github.com/fingerprintjs/fingerprintjs-ios)
* Our [Android open source library](https://github.com/fingerprintjs/fingerprintjs-android)

## Get Involved

We would love to hear your questions and get feedback on our fingerprinting technology.

*Here are a few ways you can get involved:*

* Star, follow or fork our Github projects: [Fingerprint](https://github.com/fingerprintjs/fingerprintjs) (browser fingerprinting) and [Fingerprint-Android](https://github.com/fingerprintjs/fingerprint-android)
* Need more accurate browser fingerprinting for your business? Create a free Fingerprint Pro account for [99.5% fingerprinting accuracy](/).
* Think Fingerprint could help your business? [Contact our sales team](https://fingerprint.com/contact-sales/) with your questions