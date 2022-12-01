---
templateKey: long-form-content
metadata:
  title: Browser Fingerprinting and Privacy  - Fingerprint Pro
  description: Are privacy updates making it harder to use browser fingerprinting
    for anti-fraud? We go through the major modern browsers and determine what
    is still possible to keep your website safe.
  url: https://fingerprint.com/blog/browser-fingerprinting-privacy
  image: /img/uploads/modern-browser.png
  imageAlt: Browser fingerprinting privacy shield
  imageTitle: Browser fingerprinting privacy shield
featured: false
publishDate: 2021-05-25T20:09:52.736Z
title: "Fingerprinting in the Modern Browser: Are Privacy Updates Making It
  Harder to Prevent Fraud?"
isPublished: true
isHidden: false
tags:
  - fingerprinting
  - account takeover
  - paywall
  - payment fraud
authors:
  - Karl Hughes
heroImage:
  image: /img/uploads/modern-browser.png
  imageAlt: Browser fingerprinting privacy
  imageTitle: Browser fingerprinting privacy
customCTA:
  title: Stop fraud, spam, and account takeover with 99.5% accurate device
    fingerprinting-as-a-service.
  description: "Get unlimited API calls for free 10 days, no credit card required. "
  ctaText: Get Started
  ctaUrl: https://dashboard.fingerprint.com/signup
---
The trend in web browsers over the past few years has generally favored more privacy for users. Almost all mainstream browsers ([Safari](https://www.infoq.com/news/2020/04/safari-third-party-cookies-block/), [Firefox](https://blog.mozilla.org/blog/2021/02/23/latest-firefox-release-includes-multiple-picture-in-picture-and-total-cookie-protection/), [Brave](https://support.brave.com/hc/en-us/articles/360050634931-How-Do-I-Manage-Cookies-In-Brave-), and [Chrome](https://blog.chromium.org/2020/01/building-more-private-web-path-towards.html)) now block third-party cookies, which enable tracking across multiple sites, and Chrome uses encrypted traffic (via HTTPS) by default.

Similarly, regulations like GDPR and CCPA are adding legal hurdles for companies that want to gather user data online. For example, cookie consent boxes are ubiquitous (and [rarely implemented correctly](https://www.zdnet.com/article/cookie-consent-most-websites-break-law-by-making-it-hard-to-reject-all-tracking/)), and companies in many jurisdictions are now responsible for allowing users the [right to be forgotten](https://en.wikipedia.org/wiki/Right_to_be_forgotten).

More privacy is generally a good thing for legitimate users. It means fewer opportunities for data to be stolen, decreasing the risk of identity theft, and giving more control over how websites can use data.

*But, increased browser privacy also comes with a hidden cost. By preventing cookies and other tracking mechanisms, it’s tough for web application developers to figure out whether a visitor is an actual user or a fraudulent bot.* Browser restrictions lead developers to rely heavily on multi-factor authentication methods, which slow down and frustrate users. It also increases the cost of building and maintaining applications - costs likely passed on to users in one form or another.

There is another way to identify users without intrusive cookies. In this article, I’ll share a technique called *browser fingerprinting* and discuss how to prevent fraud in modern browsers. I’ll also share an overview of the privacy settings that impact fingerprinting in the three major web browsers (Chrome, Safari, and Firefox). Finally, I’ll share how fingerprinting must continue to evolve as privacy measures do.

## How Browser Fingerprinting Works

[Browser fingerprinting](https://fingerprint.com/blog/what-is-browser-fingerprinting/) identifies users uniquely and their associate sessions regardless of anonymizing tactics like incognito browsing, VPNs, and cookie blockers. In addition, unlike third-party cookies, you cannot alter your browser fingerprint. Third-party cookies can be cleared or blocked by the browser.

Fingerprinting can identify visitors with a pattern of fraudulent behavior and then target only these visitors for additional security checks, meaning you won’t slow down legitimate users who want to access your site. But you will be able to identify those trying to brute force access or circumvent your security measures.

### Understanding Fraudulent Users

Most fraudsters use identity concealing techniques like incognito mode or VPNs (virtual private networks) to hide their identity, allowing them to try multiple passwords, stolen credit cards, or email addresses in your app. They do this to access restricted data or make an illegitimate purchase.

Fingerprinting takes in data from the browser to help build a unique profile for each user on your site. By capturing the following specifics, fingerprinting software can identify suspicious traffic without an IP address or cookie:

* Computer make and model
* Operating system version
* Browser version
* Browser extensions
* Timezone
* Language settings
* Adblocker used
* Screen size and resolution
* Tech specs (CPU, GPU, hard disk, etc.)

This method is surprisingly accurate when done well. **[Fingerprint](https://fingerprint.com/) is 99.5% accurate** at identifying returning users and assigning them a unique visitorID. You can use this ID to associate fraud patterns with specific visitors and block them as needed.

## Privacy in the Modern Browser

As you might imagine, browser fingerprinting has had to evolve as browsers have evolved. Likewise, the laws and standards around online privacy and the tactics available to web developers have changed significantly in the past few decades.

For example, cookies on their own have always been relatively easy to bypass. Because internet browsers store cookies, a user can quickly clear their cookies manually or programmatically, so they don’t provide a helpful mechanism for identifying malicious users.

Other browser features are much harder to bypass. For example, since the introduction of [WebGL in the 2010s](https://en.wikipedia.org/wiki/WebGL#Software), web applications can draw a Canvas element onto the DOM by using the computer’s graphics card to render an image that converts to a unique identifier for a user. Of course, browser extensions can block this method, so it’s rarely used alone but as part of a comprehensive fingerprinting method.

This continued arms race between companies that rely on tracking to prevent fraud and malicious users have led to several new features affecting fingerprinting in modern browsers. With extensions and native features in the top three browsers that can block or bypass some part of the fingerprinting process, let’s look at some privacy settings that impact fingerprinting.

### Browser Fingerprinting in Chrome

Chrome is currently the most popular browser, with a [64.19% market share](https://gs.statcounter.com/browser-market-share#monthly-202103-202103-bar).

![Current market share of modern browsers](/img/uploads/ryh0z2q.png "Current market share of modern browsers")

Despite Google’s [spotty record of offering privacy to users](https://www.cnet.com/how-to/google-collects-a-frightening-amount-of-data-about-you-you-can-find-and-delete-it-now/), the Chrome browser does provide options that make tracking harder. First, users can block third-party or all cookies or manually clear them when they close their browser.

![Google Chrome cookie settings](/img/uploads/lwayndd-1-.png "Google Chrome cookie settings")

While cookies may not be critical in most fingerprinting algorithms, Chrome is also running a trial of Google’s [Privacy Sandbox](https://www.privacysandbox.com/). This feature prevents fingerprinting by hiding your hardware and software information from websites. It’s unclear when these features will be on for all Chrome users, but that seems to be the direction Google is heading.

![Chrome Privacy sandbox](/img/uploads/yonufo3-1-.png "Chrome Privacy sandbox")

Chrome also allows users to block access to operating system services or make websites ask before accessing them. If enabled, many of these services help fingerprint users. Users can also turn off JavaScript completely, but this likely isn’t practical for real users as [most websites rely on JavaScript to function](https://w3techs.com/technologies/details/cp-javascript).

![Chrome permissions and content](/img/uploads/xuemrua-1-.png "Chrome permissions and content")

Chrome users can also use extensions to [block fingerprints](https://chrome.google.com/webstore/search/fingerprint), [obscure their IP addresses](https://chrome.google.com/webstore/search/vpn), and more. Each of these extensions limits tracking (for example, the [Canvas Fingerprint Detector](https://chrome.google.com/webstore/detail/canvas-fingerprint-defend/lanfdkkpgfjfdikkncbnojekcppdebfp) blocks the HTML Canvas fingerprint method described above).

Of course, no browser’s privacy protections are perfect, and researchers are constantly finding new ways to track users in Chrome. For example, according to [a 2020 paper by computer scientist Doug Leith](https://arstechnica.com/information-technology/2020/03/study-ranks-edges-default-privacy-settings-the-lowest-of-all-major-browsers/), Chrome sends a “persistent identifier” as a header on each web request (presumably for debugging), which can be part of a browser fingerprint. Of course, it’s almost impossible for malicious users to avoid detection altogether if fingerprinters are willing to stay up-to-date on the latest changes, but keeping up with them is a huge undertaking.

### Safari Browser Fingerprinting

Safari is the second most popular web browser by default, which is slightly more private than Chrome. Safari uses [Intelligent Tracking Prevention](https://webkit.org/blog/7675/intelligent-tracking-prevention/) to determine the sites tracking a user and blocks them if a user hasn’t visited them for thirty days. [In addition, Safari now blocks several tracking technologies](https://www.apple.com/safari/docs/Safari_White_Paper_Nov_2019.pdf), including some attempts at fingerprinting, without making any concessions for fraud prevention.

Like Chrome, Safari lets users disable JavaScript and block cookies. It also shows a privacy report right on the welcome page. In addition, users can disable location services and autofill to prevent those features from being used in fingerprinting.

![Safari privacy options](/img/uploads/zq2aq7d-1-.png)

Finally, Safari users can make fingerprinting even harder with extensions like [Better](https://better.fyi/) or a [VPN](https://www.comparitech.com/blog/vpn-privacy/best-vpn-safari/) to obscure their IP address, location, and other device-specific data.

Still, there are some weak spots in Safari’s pro-privacy measures. [For example, researcher Doug Leith](https://arstechnica.com/information-technology/2020/03/study-ranks-edges-default-privacy-settings-the-lowest-of-all-major-browsers/) found that the Safari welcome page can leak information to third-party apps that can load user identifiers into the browser cache. It’s also possible that Apple’s iCloud processes connect with identifying user information (likely for debugging purposes). Both data points could be part of a browser fingerprint, depending on how data gets distributed.

### Browser Fingerprinting in Firefox

Firefox has been outspoken about user privacy in recent years. Upon opening the browser for the first time, websites present the user with a privacy statement, with fingerprint controls on by default.

![Firefox standard tracking protection](/img/uploads/naatifi-1-.png "Firefox standard tracking protection")

This layer of fingerprinting protection built directly into the browser prevents sites from reading:

* Your timezone
* Your installed fonts
* Window size preference
* Operating system version
* Keyboard layout and language
* Site-specific zoom settings
* [And more](https://support.mozilla.org/en-US/kb/firefox-protection-against-fingerprinting)

As in Chrome, Firefox users can change the permissions given to each website they visit, or they can block system resource requests entirely from the *Permissions* menu.

![Firefox operating system permissions](/img/uploads/psub3dt-1-.png "Firefox operating system permissions")

Finally, thousands of Firefox extensions give users more fine-grained [control over their privacy](https://addons.mozilla.org/en-US/firefox/search/?q=privacy). Users can also install the [AmIUnique add-on](https://addons.mozilla.org/en-US/firefox/addon/amiunique/) to see how unique their browser is among the millions of fingerprints collected by [AmIUnique](https://amiunique.org/). Malicious users can use this knowledge to tweak their settings further to obscure their identity.

Despite strict fingerprinting protections, Doug Leith [found shortcomings in Firefox’s privacy configuration](https://arstechnica.com/information-technology/2020/03/study-ranks-edges-default-privacy-settings-the-lowest-of-all-major-browsers/). For example, Firefox transmits identifying information during [telemetry data reporting](https://support.mozilla.org/en-US/kb/telemetry-clientid), which is on by default.

## The Ever-Changing World of Browser Fingerprinting

I covered some features browsers offer users who want to protect their privacy online, but the specifics constantly change.

Browsers need to iterate to enable more complex behavior online. Every new feature, however, gives a new opportunity to build fingerprints to identify users by their hardware or software. So, the browsers make these features gated or harder to access, making certain websites harder to use.

Despite the resistance to fingerprinting in some circles, it’s a legitimate and helpful tool for preventing fraud and improving online security. However, with an ever-escalating race between malicious users and fingerprinters, it can be challenging for development teams to keep up with all the changes.

For example, Firefox [released](https://www.makeuseof.com/latest-firefox-88-update-elevates-online-privacy/) an update that prevents sites from reading other open windows’ names. However, suppose you were maintaining your fingerprinting software that used open windows as part of your identifying data. In that case, you must decide how to compensate for this change, or your fingerprint will quickly become obsolete.

[Fingerprint](https://fingerprint.com/) provides developers with 99.5% accurate browser fingerprinting and offers a free, open-source library and paid services. [In addition, Fingerprint](https://fingerprint.com/) doesn’t rely on outdated third-party tracking mechanisms, and it helps you prevent account takeovers, password sharing, and fake accounts.

Modern browsers improve privacy protections excellently, but this trend costs web application owners. Fortunately, fingerprinting is still an accurate and low-cost way to prevent fraud. Just don’t roll out your own.