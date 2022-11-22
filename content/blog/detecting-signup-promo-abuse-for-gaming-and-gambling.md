---
templateKey: long-form-content
metadata:
  title: Detecting Signup Promo Abuse for Gaming and Gambling
  url: fingerprint.com/blog/detecting-signup-promo-abuse-gaming-gambling
  description: Promotional cash-back incentives are a valuable marketing tool for
    gaming and gambling websites to gain and retain users; however, these cash
    offers open these companies to promo abuse. Learn the five versions of promo
    abuse and what you can do to detect and prevent fraudulent activity.
  socialImage: /img/uploads/gambling.jpg
  imageTitle: Gaming Controllers and Poker Cards
  imageAlt: Gaming Controllers and Poker Cards
  image: /img/uploads/gambling.jpg
featured: true
publishDate: 2022-11-21T18:43:38.906Z
title: Detecting Signup Promo Abuse for Gaming and Gambling
isPublished: true
isHidden: false
tags:
  - gaming fraud
  - anti-fraud technology
  - gambling
authors:
  - Jennifer Marsh
heroImage:
  image: /img/uploads/gambling.jpg
  imageAlt: Gaming Controllers and Poker Cards
  imageTitle: Gaming Controllers and Poker Cards
customCTA:
  openCtaNewTab: false
---
Many gaming and gambling websites attract new customers and retain their current user base by promoting cash offers. A few ways to do this are using promotional codes, affiliate marketing, and reload incentives to add a balance to a customer account or provide them with bonus money to attract new customers to their platform. Promotional cash-back incentives are a valuable marketing tool. Still, it’s also an excellent way for malicious users to steal money or get products for free by fraudulently signing up with multiple accounts. 

## How Does Promo Abuse Work?

Promo abuse comes in several forms, depending on your services. The attacker’s goal is to obtain money or steal free products, but here are a few versions of the scam:

* **Refund abuse:** Purchase items fraudulently or create fake receipts to return items for cash or return a lower-value product at a higher refund price.
* **Promotional code abuse:** Create accounts using promotional codes to get free items or cash out. For example, an attacker might sign up ten times with a promotional code for $10 at signup, profiting $100.
* **Affiliate and referral abuse:** Repeated referrals and signups from one person or multiple people hired to sign up with the attacker’s affiliate code.
* **Gambling fraud:** With multiple accounts, an attacker could control bets and player wins and losses to increase their gains fraudulently.
* **Reload fraud:** Some gambling sites offer to reload promotions to attract customers back to their platform, and attackers will cash out bonuses based on multiple accounts reloaded with promotional reloaded funds.

As you can probably guess, any form of promo abuse can be costly for any business. In sophisticated attacks, signup activity could be scripted, meaning an attacker could create thousands of accounts to take advantage of promotional offers. 

Loss of money isn’t the only consequence of promo abuse. The numerous accounts fraudulently inflate userbase counts causing the company to add resources or incorrectly analyze potential revenue. If fraudulent charges affect other users, promo abuse could lead to higher customer churn and loss of trust in the platform’s stability.

Attackers have several ways to trick systems into thinking they are unique customers. They first create multiple email accounts using various free platforms. Some popular email platforms now require phone numbers to validate an account, but attackers use burner numbers or internet voice numbers to validate their numerous accounts.

With email accounts in hand, attackers use a virtual private network (VPN) to sign up using different IP addresses. An IP address is a poor way of identifying unique user accounts, but it’s a minor factor in fraud detection. Other ways to detect duplicate accounts include the device, speed of signups, player patterns, or quick cashouts directly after signing up.

For online merchants, many fraudulent accounts use stolen credit card numbers. These accounts can be used to purchase products for rebates before the valid credit card owner files a chargeback. When the customer files a chargeback, the attacker cashes out with promotional rebates. 

Gaming and gambling fraud may seem minor, but recent [studies](https://www.gamblinginsider.com/news/16766/study-71-rise-in-bonus-abuse-reported-by-online-gambling-firms) show it’s an increasing problem for gaming platforms. The study indicates that gambling and gaming firms saw a 71% increase in bonus abuse. In the same survey, online merchants saw a 67% increase in payment details taken from hacked user accounts. The results force businesses to increase budgets for fraud detection and prevention infrastructure.



## How to Combat Promo Abuse

Because promo abuse in all its forms can drain revenue and cost your business customer trust, every gaming platform should have anti-fraud measures in place to detect duplicate accounts. If your platform allows for multiple accounts, then the system hosting gaming or merchant applications should be designed to detect fraudulent activity.

To create multiple accounts and avoid detection, attackers use VPNs or [the Tor network](https://www.myrasecurity.com/en/tor-network/). Your application should detect if either is being used, but there should be other reasons to stop an account. Many gaming platforms have blocklisted proxies known for allowing users to connect for fraudulent purposes. Mobile devices have IDs that can be used as an additional layer of duplicate account detection.

Speed of account creation and cashout activity are two common fraud triggers. Most attackers script account creation to speed up the process. Computers work much faster than humans, so a platform can snapshot the time it takes for a user to answer account questions and move to the next step in creating a new account. Benchmarking standard human interaction helps identify scripted responses and determine if a human user or a bot created the account. After creating the account, it takes a snapshot of the time between creating the account and cashout requests. Timeframes for account creation and cashout requests are another fraudulent trigger, but it should not be the only signal used in promo abuse detection.

Other benchmarks are helpful, especially for gaming platforms. The platform application should benchmark player activity, betting behavior, chip dunking, and standard patterns and use these benchmarks to analyze players. With multiple signals, a platform’s anti-fraud system should suspend playtime and verify that the player is a legitimate account. Combining player analysis with blocklisted proxies, VPNs, Tor usage, and any gaming company can significantly reduce the chance of a successful promo abuse scam.

### How Fingerprint Can Help

Another way to detect promo fraud and all its variants is by fingerprinting user browsers. Using fingerprinting libraries reduces the chance of mistakes and removes the burden on developers to find the various bypasses on their fraud detection libraries. Building your fraud detection library is a huge undertaking, so working with tested and available libraries proven to accurately detect duplicate accounts, bots, and malicious server requests is more efficient and effective. 

[Fingerprint](https://fingerprint.com/) has a JavaScript agent that plugs into your online application and immediately detects duplicate account creation with just a [few lines of code](https://fingerprint.com/use-cases/coupon-promo-abuse/). It uses several identifying factors in the user’s browser or mobile device instead of a single signal. With Fingerprint, gaming developers can build anti-fraud into their applications without the massive overhead of creating their unique service. 

By detecting duplicate account creation, gaming developers can stop fraudulent behavior before the action takes place. Not only does it stop fraudulent activity, but Fingerprint also reduces the number of fraudulent accounts that skew analysis of the platform’s success and stops fraudulent charges from affecting real customers’ satisfaction.

To test out Fingerprint, try out our [demo](https://fingerprint.com/demo/). You can also check out our [open-source SDKs and libraries](https://fingerprint.com/sdk-libraries/) for various browser, mobile, frontend, and backend applications.