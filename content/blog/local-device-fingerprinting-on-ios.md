---
templateKey: long-form-content
metadata:
  title: An Overview of iOS Fraud Detection APIs and Device Fingerprinting Techniques
  url: https://fingerprint.com/blog/local-device-fingerprint-ios
  image: /img/uploads/local-device-fingerprinting-on-ios.png
  description: "Discussing existing techniques and APIs native to iOS that allow
    developers to harden application security. It weighs all the main pros and
    cons of methods that are provided by Apple and covers an alternative
    approach that is successfully deployed in our fraud detection solutions on
    other platforms. "
  socialImage: /img/uploads/local-device-fingerprinting-on-ios.png
  imageAlt: illustration of a phone on an orange background
featured: true
publishDate: 2022-05-09T18:00:36.807Z
title: An Overview of iOS Fraud Detection APIs and Device Fingerprinting Techniques
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - ios
  - engineering
authors:
  - Petr Palata
heroImage:
  image: /img/uploads/local-device-fingerprinting-on-ios.png
  imageAlt: illustration of a phone on an orange background
customCTA:
  openCtaNewTab: false
  description: ""
  title: ""
---
The iOS ecosystem is often regarded as the safer platform among its competitors. Though iOS devices are less likely to be used to perform fraudulent actions, there are still malicious actors from which businesses need to protect themselves.

The official offering of supported tools intended to fight and prevent fraud on the iOS platform has been steadily expanding over recent years. Those technologies, however, force both the developer and the user to jump through more and more hoops. Unfortunately, privacy measures usually cause more restrictions.

This article gives an overview of the existing techniques and APIs native to iOS that allow developers to harden application security. It weighs all the main pros and cons of methods that are provided by Apple and covers an alternative approach that is successfully deployed in our fraud detection solutions on other platforms. 

Our approach is especially relevant in use cases that aren’t covered by existing frameworks, among others:

* Preventing unauthorized or excessive account sharing where the service provider needs to count the number of individual devices tied to a particular account.
* Detecting account takeover attempts to alert users that their account displays abnormal behavior. This can be especially effective if the detection algorithm takes into account previously caught malicious devices.

We will also introduce our [newly released iOS library](https://github.com/fingerprintjs/fingerprintjs-ios/) and explain how we implemented the previously mentioned methods.

## Does iOS Offer Anti-Fraud Tools Out of the Box?

iOS includes a native fraud protection solution called [DeviceCheck](https://developer.apple.com/documentation/devicecheck). Introduced with iOS 11, \`DeviceCheck\` framework brought an option to flag devices by permanently writing a tiny amount of data to a device. The API permits to set and retrieve two bits of information. The interpretation of their meaning is left to the application developer (e.g. the bits could be used to store a flag that determines whether the user completed onboarding, applied a one-time discount coupon or anything else that could be represented with a true/false value). 

This restriction limited the area of possible use cases because it never allowed assigning more data to a particular device. The persistent bits can flag a fraudulent device, however, it does not serve as a full substitute for a unique device identifier.

iOS 14 then added [DCAppAttestService](https://developer.apple.com/documentation/devicecheck/dcappattestservice) with its app validation capabilities. [App Attest enables a process](https://developer.apple.com/documentation/devicecheck/establishing_your_app_s_integrity) that helps developers check the legitimacy of the current application. The legitimacy is assessed through a call to a dedicated third party service (owned and managed by Apple) that previously generated a unique cryptographic signature used to subsequently identify the application (the specifics of the process are out of scope of this article but we suggest reading the [official documentation](https://developer.apple.com/documentation/devicecheck/establishing_your_app_s_integrity) for details).

However, both APIs require network communication with Apple’s servers, making the whole solution dependent on a cloud-based third party service.

The code running the verification is also proprietary and closed-source. That might not be a problem for everyone, but it inevitably strips away the option to scrutinize the correctness and security of the whole procedure.

The \`DeviceCheck\` framework shows promise and definitely has its uses. The fact that the two bits set through the API survive factory reset makes it a really distinct and powerful tool in the fraud protection toolchain. On the other hand, it remains very restrictive which hinders its use in more nuanced cases where two bits of storage isn’t enough

## Other Built-in Methods for Device Identification

There are also other methods that can be exploited for device identification but usually have various restrictions and require different levels of user involvement (i.e. displaying a dialog or requiring the user to enable something manually in the settings). To give a few examples:

* The now often hated [Advertising Identifier](https://developer.apple.com/documentation/adsupport/asidentifiermanager/1614151-advertisingidentifier) from the \`AdSupport\` framework. It became heavily restricted in its underlying usage by requiring user’s cooperation (opt-in in the settings).
* Mobile Device Management, or MDMs, have the capability to [retrieve the IMEI (International Mobile Equipment Identity) number](https://developer.apple.com/documentation/devicemanagement/get_device_information) which uniquely identifies a device but would require the user to cooperate and install a management profile onto their device which is a multi-step process in itself.
* Location tracking can help identify a device but again needs an explicit user consent and preferably continuous data gathering to be effective.

It’s inadvisable to try and misuse the restricted APIs because that usually leads to an App Store submission rejection or in more severe cases might result in developer account suspension.

Anonymously fingerprinting iOS devices becomes ever more important when taking into account the above restrictions and approved use cases.

## Local Device Fingerprinting on iOS

The iOS landscape has been steadily and successfully tying up all its loose ends that made it possible to identify users without their explicit consent. Reliably identifying a particular device in the wild unless the user explicitly agrees should be next to impossible. It should also come with all the ramifications that stem from the use of the underlying tracking mechanism.

However, it remains possible to collect little pieces of information that are freely available on an iOS device (hardware information, disk and memory size, OS and kernel information, user settings etc.). We internally call those bits of information [signals](https://github.com/fingerprintjs/fingerprintjs-ios/blob/main/README.md) because each of them is able to convey a particular set of properties related to the observed iPhone or iPad.

Some signals are stable, meaning that their output values rarely or never change, and some are less stable, such as user-managed settings, OS version information, and stored application data.

Besides stability, what we look for in a signal is its uniqueness, in such that no two devices will have the same value for the same signal source.

Therefore, a perfect signal is completely unique and maximizes stability. Examples of a perfect signal can be found among hardware identifiers such as an IMEI number, which aren’t available for application developers through public APIs.

Each signal has a finite and typically limited number of potential output values, and each one is only a small contribution to the final fingerprint value. The combined entropy of the resulting fingerprint is ideally high enough to significantly reduce the search space of possible devices (i.e. the amount of devices that have the same fingerprint). Such a method can be then used to generate a fingerprint that fulfills the function of a reliable device identifier.

As mentioned earlier, there is a good argument to be made for purely local device fingerprinting. In an ideal world, the signals would be collected as silently as possible, without any user input and without requiring any additional application capabilities.

## Vendor Identifier and Keychain Storage

The ultimate identification power comes from a combination of different signals and approaches that increase the stability of the final identifier or fingerprint. No signal alone is stable enough to outlive inevitable application reinstalls and system updates. Although there is one iOS-specific signal that gets very close to perfect stability and uniqueness, it lacks an important detail - it changes when the user deletes and installs the host application again.

The near-perfect signal comes from the \`UIDevice::identifierForVendor\` API that always returns a unique ID for a given combination of application vendor and the current device. It might not be clear what exactly that means so let’s demonstrate that on the following scenarios:

* Two applications from the same vendor installed on the device, with their  application identifiers sharing a common prefix \`com.mercury.foo\` and com.mercury.bar, both return the same identifierForVendor value.
* Two applications from different vendors with appIDs \`com.mars.baz\` and \`com.mercury.foo\` each have their own unique identifierForVendor that cannot be accessed by an application from different vendors.

\`identifierForVendor\` value has one major drawback. The returned value changes in the extremely likely situation where all applications from a particular vendor (sharing an appId prefix) have been removed from the device.

Fortunately, there is a way which reduces the impact of this disadvantage and keeps the vendor identifier consistent even after the application removal. It’s not that well known, but data stored in the iOS Keychain from a particular application isn’t wiped along with it when the application gets deleted. The only exception to this rule, for now, is a factory reset (or other manual and intentional data cleanup triggered from the iOS settings).

This behavior allows saving the identifier the first time it’s been generated. Subsequent identifier retrieval calls then return the same value saved in the Keychain, significantly increasing the stability of the identifier even between application re-installations. It’s important to note that the current Keychain behavior that allows the identifier to outlive the application removal is not documented. Despite the fact that there have been [official answers](https://developer.apple.com/forums/thread/36442?answerId=281900022#281900022) indicating possible changes in the future, the functionality remained untouched for several years. Nevertheless, the recommended approach to undocumented behavior is to have a failsafe in place, making the \`identifierForVendor\` API an integral part of the entire solution.

## Introducing Fingerprint for iOS

Taking all the above into account, we created a new open-source library that leverages the Keychain method and also gives the ability to generate device fingerprints from signals collected locally on devices.

Since those two identifier types (device identifier and fingerprint) might have separate uses cases, we decided to split them into two different methods that are exposed through the library’s public API: [See documentation here.](https://github.com/fingerprintjs/fingerprintjs-ios/)

### Fingerprinter::getDeviceId()

Utilizes the vendor identifier and saves it into the Keychain which improves the stability and ensures that reinstalls don’t change the returned value.

### Fingerprinter::getFingerprint()

Computes and returns the fingerprint from the available information on the device, currently a combination of hardware and software signals. This part is highly experimental and might not yield very accurate results.

## Using Fingerprint for iOS

Our library is as unobtrusive as possible so it never requires or asks for any permissions or capabilities other than what the application already needed for its normal operation. Future versions will also try to take previously granted permissions into account and utilize them to further increase the fingerprint’s stability. It is also worth mentioning that there aren’t any network calls involved and no data is shared with any third parties. 

Fingerprint for iOS doesn’t use any private or restricted APIs and is meant to be used in applications on the official iOS App Store. However, always keep in mind that the usage has to conform to the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).

### There’s several ways to get involved with us:

* [Test out our demo application](https://apps.apple.com/us/app/fingerprintjs-showcase/id1621330481)
* [Visit the README](https://github.com/fingerprintjs/fingerprintjs/blob/master/readme.md) and integrate the library in your projects
* [Tell your friends about us and recommend us on GitHub](https://github.com/fingerprintjs/fingerprintjs)
* [PS: We’re hiring for several developer roles!](https://fingerprint.com/careers/)