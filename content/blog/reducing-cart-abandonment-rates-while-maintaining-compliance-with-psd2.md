---
templateKey: long-form-content
metadata:
  title: Reducing Cart Abandonment Rates While Maintaining Compliance With PSD2
  url: https://fingerprintjs.com/blog/reducing-cart-abandonment-psd2-compliance/
  description: Learn how to adhere to Europe's new standards for secure online
    payments without adding friction to the checkout process.
  image: /img/uploads/psd.png
  imageAlt: PSD2
  imageTitle: PSD2
featured: true
publishDate: 2021-09-01T19:30:50.789Z
title: Reducing Cart Abandonment Rates While Maintaining Compliance With PSD2
tags:
  - fingerprinting
  - payment fraud
  - ecommerce fraud
  - web
authors:
  - Martin Makarsky
heroImage:
  image: /img/uploads/psd.png
  imageAlt: PSD2
  imageTitle: PSD2
customCTA:
  openCtaNewTab: false
isPublished: true
---
The newly revised Payment Services Directive ([PSD2, Directive (EU) 2015/2366](http://data.europa.eu/eli/dir/2015/2366/oj/eng)) includes updated measures for making online payments safer and more secure. Unfortunately, this extra layer of customer protection may also reduce revenue for merchants due to cart abandonment or rejected payments. 

According to the [latest estimates](https://www.globalbankingandfinance.com/the-real-impact-of-psd2/), cart abandonment rates increase by almost 20% when using advanced authentication techniques. FingerprintJS can help decrease abandonment rates while maintaining compliance with PSD2, rescuing lost revenue while providing accurate and long-term visitor identifiers.

## PSD2 and Strong Customer Authentication

PSD2 focuses on making payments more secure, protecting customers, and defining rights and obligations for payment providers and banks. The measure regulates payment providers in the European Union and the U.K. through the [Regulatory Technical Standard](https://www.eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/regulatory-technical-standards-on-strong-customer-authentication-and-secure-communication-under-psd2), which focuses on one bedrock concept for consumer protection: Strong Customer Authentication (SCA). SCA is required if payments are processed through a European acquirer or from cards issued in the European Union and the U.K.

To prove their identity while making a payment, customers must now provide at least two of the following [verification elements](https://ec.europa.eu/commission/presscorner/detail/en/MEMO_17_4961):

* something they know (e.g., a password or PIN code)
* something they own (e.g., a card or mobile phone)
* something they are (e.g., biometrics: fingerprint or iris scan).

## About 3D Secure

3D Secure is highly popular due to its full alignment and adherence to PSD2 SCA requirements and has been adopted by major card issuers like Visa, Mastercard, Discover, American Express, JCB, and UnionPay, to name a few. The protocol adds an extra layer of protection for payment card transactions in [card-not-present](https://en.wikipedia.org/wiki/Card_not_present_transaction) scenarios, which effectively includes all online purchases. 

The "3D" in the name refers to the three domains that interact using the protocol. Every 3D Secure transaction involves a party from each of the following domains: 

* **Acquirer Domain:** environment of the acquiring bank and merchant receiving the payment 
* **Issuer Domain:** environment of the card-issuing bank providing the payment 
* **Interoperability Domain:** responsible for processing 3D Secure by allowing the parties in the transaction to interact and exchange information

Popular 3D Secure implementations from leading credit card vendors include Verified by Visa, Mastercard Identity Check, and American Express SafeKey.

Several versions of 3D Secure are in adherence with PSD2's SCA:

* **3D Secure 1:** unpopular due to its poor user experience, which often results in customers abandoning checkout. This version will be retired in October 2021.
* **3D Secure 2.0:** never released to production and is generally unavailable.
* **3D Secure 2.1:** offers huge improvements in usability and SCA (especially on mobile devices) and provides liability shift from the merchant to the card issuer for fraudulent transactions, as well as support for additional data to power risk decisions. 
* **3D Secure 2.2:** offers support for SCA Exemption flags. 

## Minimizing Sales Friction from PSD2 and 3D Secure

Loss of revenue due to failed or abandoned transactions is a widespread, critical pain point for merchants beholden to these new regulations. And while new protocol versions introduce a better user experience for minimizing the friction in the transaction flow, the user experience is still negatively impacted by these heightened restrictions. According to a study by [globalbankingandfinance.com](https://www.globalbankingandfinance.com/the-real-impact-of-psd2/), the transaction abandonment rate during 3D Secure is 17-20%, with 20-22% failing the subsequent 3D Secure authentication. 

To improve the customer experience, merchants can use Exemptions to bypass the most stringent SCA requirements, even allowing some customers to skip SCA entirely. These transactions are usually smaller amounts or from whitelisted merchants. All the same, a customer may be asked to perform SCA even if a transaction meets all required Exemption conditions, so it’s not a foolproof method of reducing friction. Whether or not to require SCA is ultimately at the bank's discretion.

## How FingerprintJS Can Help

FingerprintJS Pro provides a highly accurate (99.5%) visitor identification solution for improving conversion rates in the face of these new regulations. Featuring an easy-to-use JavaScript library for integrating into new or existing fraud detection workflows, FingerprintJS Pro enables companies to detect and block fraudulent activity from known bad actors as well as grant trusted visitors the ability to bypass verification. By reducing the friction caused by PSD2’s SCA, merchants can at once improve conversion rates without impacting security.

FingerprintJS may be able to provide the most value when used with the 3D Secure 2.1 and 2.2 protocol by providing additional data to inform risk decisions. Card issuers will typically perform a real-time risk-based analysis and approve transactions without requiring any additional pieces of user information. However, the 3D Secure 2.1 and 2.2 protocol enables merchants and payment providers to send more data elements on each transaction to the card issuer. This could include a unique visitor identifier generated by FingerprintJS, which could help in the issuer’s decision to skip SCA for a trusted visitor.

Moreover, integrating the FingerprintJS visitor identifier before the payment and 3D Secure flow adds deeper contextual security layers. For example, the visitor identifier can be used to determine if a history of valid or fraudulent transactions exists, which in turn can help decide whether to use 3D Secure’s Exemption flags or SCA.

In today's cyber threat landscape, security and user privacy should be front and center. That said, PSD2’s more stringent requirements invariably lead to a high risk of cart abandonment and subsequent loss of revenue—unfortunate outcomes faced by all online merchants. [FingerprintJS Pro](/) helps website operators mitigate this risk by providing unique visitor identifiers for frictionless, accurate customer verification. 

Want to learn more? **[Contact our sales team](/contact-sales/)** and let them know you’re interested in using FingerprintJS with PSD2 and/or 3D Secure.
