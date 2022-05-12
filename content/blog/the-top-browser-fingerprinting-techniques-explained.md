---
templateKey: long-form-content
metadata:
  title: The Top Browser Fingerprinting Techniques Explained - Fingerprint
  url: https://fingerprint.com/blog/browser-fingerprinting-techniques
  description: To make an accurate browser fingerprint, you need to gather as many
    signals as possible. In this article, we go over some of the techniques used
    to generate signals that vary between site visitors enough to be useful for
    browser fingerprinting.
  image: /img/uploads/tw-ad-2-hd.png
  imageAlt: Fingerprint Pro query result
  imageTitle: Fingerprint Pro query result
featured: false
publishDate: 2021-04-01T21:04:39.564Z
title: The Top Browser Fingerprinting Techniques Explained
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - js
  - paywall
authors:
  - Savannah Copland
heroImage:
  image: /img/uploads/tw-ad-2-hd.png
  imageAlt: Screenshot of Fingerprint visitorID data
  imageTitle: Screenshot of Fingerprint visitorID data
---
<b>**Many techniques are used when generating a highly accurate browser fingerprint, which gathers information about the user to distinguish them from millions of others online. This article reviews some of the most common methods used in a browser fingerprinting script.**</b>

Also known as online fingerprinting, browser fingerprinting is a tracking and identification method websites use to associate individual browsing sessions with one site visitor. Using Javascript, a plethora of data can be collected about a user’s web browser and device. When you stitch these pieces of information together, they reveal a unique combination of information that forms every user’s own ‘digital fingerprint.’’ The browser fingerprint is traceable across browsing sessions, even when the user enters incognito browsing or uses a VPN to access a site.

![Graphic of browser fingerprinting](/img/uploads/audio-fp-browser-fingerprinting-image.png "Graphic of browser fingerprinting")

Browser fingerprinting is one way to stop fraudsters from attempting to hack or spam website owners by accurately identifying site users. Browser fingerprinting is more difficult to circumvent than cookies, as a user’s fingerprint does not change between incognito browsing sessions or clearing browser data. A browser fingerprinting script must use various data (called signals) gathering techniques, which vary between visitors, to generate an accurate enough (called entropy) fingerprint for each distinct web visitor.  For example, while many visitors to a website may have the same model of iPhone, the software and drivers installed, geolocation, browser and OS version, and even minute variances in the hardware could be different.Each browser fingerprinting technique can gather one or more of these signals that aim to identify these minor variances between users.

## **What information is gathered?**

Browser fingerprinting can gather a lot of information from a browser: the user’s device model, its operating system, its browser version, user timezone, preferred language settings, ad blocker used, screen resolution, and all the granular tech specs of his CPU, graphics card, and so on.

Browser fingerprinting technology can capture more than enough specifics about a user’s device and settings to pinpoint them in a sea of internet users. Read our beginner's guide to learn more about [how it works](https://fingerprint.com/blog/what-is-browser-fingerprinting/) and how each signal adds to a fingerprint's overall accuracy and stability.

Fingerprint’s technology employs several cutting-edge browser identification methods to gather over 100 individual signals. These signals are combined with server-side analysis and deduplication to generate a visitorID, providing a persistent and valuable abstraction of a browser fingerprint, which can be volatile if a user changes settings or updates software on their device 

## What are the different fingerprinting techniques?

### Canvas Fingerprinting

This browser fingerprinting technique uses the HTML5 canvas element to identify variances in a user’s GPU, graphics drivers, or graphics card. First, the script draws an image, often overlaid with text. Then, the script captures how the user’s web browser has rendered the image and text. Naturally, every device with different hardware and drivers will render the image slightly differently, distorting its color and shape. A hash is then computed using the rendered image’s data, which serves as the ‘canvas fingerprint.’

Like any other browser fingerprinting technique, the scripts used for canvas fingerprinting operate in the background to keep the user from realizing that the fingerprinting is occurring. This fingerprinting technique is accurate and not too processing-intensive making it one of the most employed script techniques .

**Read more about this technique, read our in-depth article on [Javascript canvas fingerprinting](https://fingerprint.com/blog/canvas-fingerprinting/).**

![Canvas fingerprint and WebGL fingerprint output from Amiunique.com, showing distorted text and a gradient image.](/img/uploads/image20.png "Canvas and WebGL fingerprint")

<i>Canvas and WebGL rendered images from [AmIUnique](https://amiunique.org/). Because of how this visitor's specific browser and device rendered these images, they can be narrowed down to a pool of fewer than 0.01% of total visitors.</i>

### WebGL Fingerprinting

WebGL fingerprinting is very similar to Canvas fingerprinting as they both use the browser to render images off-screen. These images distinguish users based on their graphics drivers and device hardware.

### Media Device Fingerprinting

This technique uncovers a list of all the connected media devices and their respective IDs on a user’s laptop or PC. This includes all internal media components like video cards, audio cards, and all connected or linked devices like headphones.

Media device fingerprinting is not widely used in fingerprinting functions. This is because it requires the user to grant access to their microphone and camera to get a complete list of connected devices. This technique is helpful for services that innately require webcam or microphone access, such as video chat services.

### Audio Fingerprinting

While other fingerprinting techniques force browsers to render a text or image, this technique checks how their devices play sound. The browser vendor and version used impacts minute differences in sound waves generated by a digital oscillator, and differences in CPU architecture.

Read our in-depth tutorial on [how audio fingerprinting works](https://fingerprint.com/blog/audio-fingerprinting/) using the Web Audio API to learn more about audio fingerprinting. 

## Putting it all together

Multiple fingerprinting techniques need to be used with each other to generate a sufficiently accurate fingerprint for user identification. Each method generates one or more signals, collectively combined into a visitor hash that serves as an individual identifier.

## Fingerprinting and Online Fraud Detection

When dealing with fraud, take note that only a small number of your site visitors are responsible for fraudulent activities. Hence, your developer team has to find a way to isolate these site users, identify them, verify them through authentication, and add them to your site’s blocklist. However, you need to keep these security layers away from your trusted traffic since extra authentication steps can cause an unpleasant user experience. In addition, more strict site security can also slow down account accessibility, purchase making, and overall site engagement.

Browser fingerprinting techniques are helpful for identifying visitors with a pattern of fraudulent behavior and then targeting only these visitors for additional security. In addition, fraudsters often use identity concealing techniques like disabling cookies, surfing through a VPN, or using browsers in incognito mode. These are all areas where fingerprinting proves to be at its best since it identifies users quickly without relying on IP addresses and site cookies.

One of the most common fraud types is [account takeover](https://fingerprint.com/account-takeover/), where malicious users try to hack a legitimate user’s account and make purchases or steal their identity. With fingerprinting and related user identification technologies, additional security can be added to the login process for suspicious traffic only. This added security makes it more difficult for untrusted traffic to log in and take over trusted users’ accounts.

If your website is experiencing brute force or bot attacks, a best practice is to ask users to solve a CAPTCHA after each unsuccessful login attempt. Then, after three to five failed login attempts, set your system to lock out the user for a set time.

If your users are often the target of phishing scams, you can require email or two-factor authentication when a new fingerprint attempts to log in. And if such fingerprints repeatedly visit your site, you can also blocklist them.

For virtually all types of fraud, the first step in stopping malicious activity on your website is accurate user identification technology. Then, you can accurately single out the bad apples while keeping your trusted users satisfied with your website performance.

**Whether you have a newly-built website or you’ve been in the online industry for years, you can safeguard your leads, clients, and business if you can stop fraud at the source. [Create a free account](https://dashboard.fingerprint.com/signup) to see what accurate user identification technology can do for you.**