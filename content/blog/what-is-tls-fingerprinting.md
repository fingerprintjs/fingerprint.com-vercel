---
templateKey: long-form-content
metadata:
  title: What is TLS fingerprinting?
  url: https://fingerprint.com/blog/what-is-tls-fingerprinting-transport-layer-security
  description: Transport Layer Security (TLS) is an algorithm that encrypts all
    your internet traffic and helps you stay secure online. Learn the inner
    workings of TLS fingerprinting and how it can put you in a better position
    to understand your network and traffic sources and protect your website
    against fraud.
  image: /img/uploads/tls-fingerprinting_.png
  imageAlt: illustration of a padlock on an orange background
  socialImage: /img/uploads/tls-fingerprinting_.png
featured: true
publishDate: 2022-04-07T23:16:30.234Z
title: What is TLS fingerprinting?
isPublished: true
isHidden: false
tags:
  - fingerprinting
authors:
  - Habdul Hazeez
heroImage:
  image: /img/uploads/tls-fingerprinting_.png
  imageAlt: illustration of a padlock on an orange background
customCTA:
  openCtaNewTab: false
---
At its most basic level, Transport Layer Security (TLS) is an algorithm that encrypts all your internet traffic and helps you stay secure online. To be more precise, it is a protocol used to encrypt web-based communications between a client and a server using suites of cryptographic algorithms. Before TLS can be used in communication, the client and server go through a process known as the *TLS handshake*. 

TLS fingerprinting is the identification of a client based on the fields in its `Client Hello` message during a TLS handshake. 

A few ways common uses of TLS fingerprinting:

* To gather information about a client on the web, such as operating system or browser version.
* Analyzing the encrypted TLS traffic, your ISP can guess which websites you are using and what actions you take while on the web.
* To gather information about a remote server, such as operating system or server software.

Uniquely identifying a client can also be helpful for anti-fraud use cases, as malicious users often will try to conceal their identity to perform multiple fraudulent activities on a website. While identifying users using cookies and browser fingerprinting, TLS fingerprinting can be another accurate identification layer to your anti-fraud stack. 

In this article, you’ll learn the inner workings of TLS fingerprinting and how it can put you in a better position to understand your network and traffic sources and protect your website against fraud.

## The TLS Handshake

The handshake process begins with the client requesting the server initiate a secure session. Since a TLS protocol has multiple versions and encryption options, the client first sends over its supported encryption methods (also known as cipher suites) and current TLS version in a `Client Hello` message to start a communication with a server.

The server then analyzes this request and compares the list of cipher suites in the `Client Hello` with the list of ciphers supported by the server. Then it sends a `Server Hello` message to the client, containing its TLS protocol, the chosen cipher suite, and the server’s SSL certificate that includes the server’s public encryption key.

A few more steps in the handshake process are not relevant for the TLS fingerprinting.

When the client receives the server’s digital certificate, it uses the public key from the issuing certificate authority to verify the certificate’s digital signature. The server’s name on the certificate should match the server’s DNS name, and the certificate shouldn’t be expired.

After proper verification, the client sends a second random string known as the *premaster secret*. This is encrypted using the server’s public key. Finally, the server decrypts the *premaster secret* with the private key, and both client and server generate a *session key* using the following:

* client random
* server random
* premaster secret

They should arrive at the same result.

Finally, the client sends a finished message encrypted with the session key, and the server responds with a finished message that is encrypted with the session key.

When the client and server are securely and symmetrically encrypted, the TLS handshake is complete.

This entire process is illustrated in the diagram below.

![SSL/TLS Handshake Process](https://i.imgur.com/Melyx8e.png)

## Recognizing User Client by TLS Fingerprinting

Part of the `Client Hello` field is a list of ciphers supported by the client. This list is dependent on the TLS library used by the client.

| Client        | TLS library                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------ |
| Firefox       | [NSS](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/NSS)                                   |
| Microsoft     | [SChannel](https://docs.microsoft.com/en-us/windows-server/security/tls/tls-ssl-schannel-ssp-overview) |
| Apple Safari  | [Apple Secure Transport Layer](https://developer.apple.com/documentation/security/secure_transport)    |
| Google Chrome | [BoringSSL](https://boringssl.googlesource.com/boringssl/)                                             |

With TLS fingerprinting, you can identify the TLS library used by the client and compare it with what is expected from the library. Each library is different and therefore supports other ciphers in a separate order.

In the following image, I connected to the same GitHub repo using Firefox 91 and Google Chrome 93. The secure connection details show both browsers’ preferred cipher and TLS versions.

![Secure Connection string of Firefox 91 and Chrome 93 to pytls GitHub repo](https://i.imgur.com/Qb0U6ff.png)

In this case for Firefox 91, it's [AES 128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) with [GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode). Google Chrome uses X25519, also called [Curve25519](https://en.wikipedia.org/wiki/Curve25519).

A client might alter its User-Agent string to display another browser version and operating system, but its `Client Hello` can sometimes reveal its actual browser version and operating system.

Finally, versions of a particular browser (eg, Chrome 81 and 93) contain a different list of preferred ciphers.

## Open-Source Implementations of TLS Fingerprinting

### JA3

[JA3](https://github.com/salesforce/ja3) was developed by a team at Salesforce and open-sourced in 2017. It gathers the following fields in the `Client Hello` during the TLS Handshake:

* TLS version
* Accepted ciphers
* List of extensions
* Elliptic curve
* Elliptic curve formats

Once it has these fields, it combines them in order, using a comma to delimit fields and a hyphen to delimit each value in the field.

The resulting string is converted to its MD5 hash equivalent, easily consumable and shareable. This string is the JA3 SSL client fingerprint; you can compare this with known application fingerprints to indicate whether a client app is malicious.

### JA3S

JA3S is for the server-side of SSL/TLS communication. 

JA3 has its limitations. Theoretically, two client apps have the same JA3 fingerprint, which can prove less helpful in differentiating a legitimate app and a malicious one. This is where JA3S comes into the picture.

The fingerprint is generated using the following fields from the `Server Hello`:

* TLS version
* Ciphers
* TLS extensions

JA3 and JA3S offer insurance against the possibility that malware and a legitimate app might generate the same MD5 hash. Reducing false positives is more efficient for detection or blocklisting, as noted by [John Althouse on Twitter](https://twitter.com/4A4133/status/1098657530706841600).

### Bot Detection

A bot is an application programmed to perform specific actions on other devices often resulting in a cyberattack. In some cases, a network of these devices are used to complete larger scale cyberattacks, commonly known as a *botnet*. Researchers can track botnets to identify what they have in common, such as some form of malware, and then share the research results with the security community in the form of IOCs (Indicators of Compromise).

These IOCs will contain specific details, like the TLS library that the malware has employed to secure its communication, as documented by Sophos in early 2021, [nearly half of malware now uses TLS to conceal communications](https://news.sophos.com/en-us/2021/04/21/nearly-half-of-malware-now-use-tls-to-conceal-communications/).

When you use TLS fingerprinting on your network, you can compare the results with the IOCs to determine if the connected client is infected with malware and thus a bot.

Of course, that’s not the end of it. Malware authors know about TLS fingerprinting and are taking steps to circumvent it with what [Akamai describes as *cipher stunting*](https://www.akamai.com/blog/security/bots-tampering-with-tls-to-avoid-detection).

### Bot Protection

Once you identify a bot, you can block its IP address or employ a bot protection service. And if you’re a webmaster, web developer, or planning to deploy a website that asks users for some form of input, you should implement a [CAPTCHA](https://www.cloudflare.com/learning/bots/how-captchas-work/).

Consider also trying our [BotD open-source library](https://github.com/fingerprintjs/BotD) for your bot detection needs. 

### DDoS Protection

Distributed Denial of Service (DDoS) is an attack that aims to overwhelm a target website or infrastructure with junk traffic using a botnet. One notable example is the [Mirai botnet](https://www.cloudflare.com/learning/ddos/glossary/mirai-botnet/), which [attacked Dyn in late 2016](https://www.theguardian.com/technology/2016/oct/26/ddos-attack-dyn-mirai-botnet), resulting in the unavailability of top sites like Twitter and Reddit.

Once you detect a surge of traffic to your website or network, investigate the `Client Hello` messages of all connected devices. If these devices are infected with the same malware (which is the case of a DDoS), the cipher suites in their `Client Hello` fields will be the same.

For example, I used Firefox 91.0.2 to connect to GitHub three times simultaneously. You’ll observe that the cipher suite is the same in the following images. Only the session key differs.

![First attempt Wirshark capture of client Hello message to GitHub.com](https://i.imgur.com/quqZeFb.png)

![Second attempt Wirshark capture of client Hello message to GitHub.com](https://i.imgur.com/AkpMZUm.png)

![Third attempt Wirshark capture of client Hello message to GitHub.com](https://i.imgur.com/RnTT0Jh.png)

Armed with this knowledge, you can block the IP addresses used by these devices.

### Vulnerable Applications

Applications evolve and are updated if the need arises. For example, the latest Firefox version at the time of writing is 91.0.2, which uses TLS 1.3. If TLS fingerprinting reveals a TLS `Client Hello` for a Firefox version using [TLS 1.0 or TLS 1.1, both of which lack recommended cryptographic algorithms according to IETF](https://datatracker.ietf.org/doc/rfc8996/), you can inform the user to update their browsers. You can block them from accessing your website or network as a last resort.

## Get in touch

[Join our Discord](https://fingerprint.com/blog/discord-launch/) to chat with us about our fingerprinting research