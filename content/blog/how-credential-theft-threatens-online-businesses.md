---
templateKey: long-form-content
metadata:
  title: How Credential Theft Threatens Online Businesses
  description: There are many risks involved when you decide to collect personal
    or financial information for your online business. Stay one step ahead of
    fraudsters and learn how online businesses can protect themselves from
    credential theft.
  url: fingerprint.com/blog/credential-theft-threatens-online-businesses
  image: /img/uploads/how-inflation-impacts-fraud.jpg
  imageAlt: Credential Theft Image
  imageTitle: Credential Theft Image
  socialImage: /img/uploads/how-inflation-impacts-fraud.jpg
featured: true
publishDate: 2022-12-02T13:55:55.387Z
title: How Credential Theft Threatens Online Businesses
isPublished: true
isHidden: false
tags:
  - anti-fraud technology
  - ecommerce fraud
  - payment fraud
  - cryptocurrency fraud
  - gaming fraud
authors:
  - Jennifer Marsh
heroImage:
  image: /img/uploads/how-inflation-impacts-fraud.jpg
  imageAlt: Credential Theft Image
  imageTitle: Credential Theft Image
customCTA:
  openCtaNewTab: true
  title: Sign Up for our Newsletter
  ctaUrl: https://try.fingerprint.com/newsletter-signup
  description: Stay up to date on our product releases, blogs, webinars, and free resources!
  ctaText: Sign Up
---
When you decide to put your personal or financial information online, many risks are involved. Fraudsters are constantly looking for vulnerabilities within sites that store private information. Once they have your information, they make money by purchasing goods with your financial data or selling your credentials on the dark web. These online attacks are not only financial threats to consumers but also to online businesses. Businesses can experience loss by customers disputing unknown charges to their accounts and public distrust from a significant data breach. Public distrust could lead consumers to avoid your platform for buying products and lead investors to pull their investment in your company.

So, the question is, “How do I protect my private data?” The answer is to stay one step ahead of the online attackers. This blog goes over the many ways fraudsters steal your information and how online businesses can avoid being a target of credential theft.



## E-Commerce and Credential Theft

Whether an eCommerce store sells necessities or hobby-related merchandise, any business storing financial data is a target for fraudsters. Some fraudsters want customer data, and others are looking for financial information. Most eCommerce stores offer an option for customers to store their credit card data to buy items more quickly in the future. While this is a convenience for customers, it’s also a security risk. 

Cybercriminals target eCommerce for several reasons – eCommerce sites ask for credit card information for payment, and most customers use the same credentials across multiple eCommerce sites. Most eCommerce sites store customer financial information for later use, and they must take every precaution to stop threats from breaching the production database. 

Protecting the production database isn’t the only concern for businesses. A more significant security issue is protecting user accounts. This issue is more challenging because protecting user accounts depends on the customers. Users must understand the elements of a phishing or social engineering attack to avoid divulging their credentials; however, many customers fall for sophisticated attacks. Another external issue is the compromise of a third-party site where user credentials are disclosed. And with the bad habit of using the same credentials on multiple sites, one site can provide access to numerous accounts across multiple sites. 

Cybercriminals can sell account credentials on darknet marketplaces. A long list of hundreds of records with financial data combined with user credentials could bring in millions of dollars for a seller on darknet markets. Qualified data is worth much more than simple credentials. The 2022 [pricing index](https://www.privacyaffairs.com/dark-web-price-index-2022/) reports that credit card details with a balance up to $5000 are worth $120. Compromising a database with only 1000 records is worth $120,000 to an attacker. A compromise with 10,000 user records brings in $1.2 million for cybercriminals.

Even a mid-sized eCommerce site has several thousands of records stored in a production database, with every customer record linked to financial data and credentials. This data is what makes eCommerce stores a valuable target for cybercriminals. Production databases are common threats. Protecting user accounts after credential theft is one of the biggest challenges for any online business, especially eCommerce.



## Stolen Session Cookies and Cookie Stuffing

Credential theft isn’t the only method for account takeover. Most sites offer a “Remember Me” option where users check a box allowing the site to pre-fill their credentials or automatically authenticate. The site developers store a session cookie on the device to do this. The session cookie acts as an access token using an already authenticated account. 

Cybercriminals aim to steal session cookies, whether it’s phishing or an attacker gaining access to the user’s computer. They can then perform an attack called cookie stuffing, where stolen session cookies are programmatically sent to the site. Without validation, the site authenticates the attacker, providing full access to a user’s account and any personally identifiable information (PII) and financial data. 

Protection from cookie stuffing relies on the user’s local device security. The eCommerce store can’t control user device security, so site developers must take precautions to stop account takeover from cookie stuffing. Developers can still offer a “Remember Me” option for customer convenience but must create code to prevent account takeover and compromises.



## Protecting PII and Financial Data from Common Threats

eCommerce and other online businesses must stay alert to the risks and build applications around the security of customer data. It helps to understand how attackers use stolen data to build secure applications. With thousands of credentials, an attacker can’t go through every record individually. Instead, the attacker creates bots to authenticate automatically into an application to steal data and validate stolen credentials. 

Automatically validating credentials makes it easier for cybercriminals to sell them. Qualified and validated data is worth more than a list of canceled credit card data and outdated credentials. With automated authentication, attackers validate thousands of records within minutes. They take validated records and sell them at top-dollar on darknet markets. 

Online businesses can’t stop credential theft, but they can defend against cookie stuffing and automated account takeover using bot detection technology. Bots (automated authentication) have several triggers detectable using application code. They don’t have a browser API to probe, which is detectable using effective fraud prevention. Some poorly written bots use no user-agent headers and attempt authentication too quickly, which are clear signs of non-human activity. 

For example, a user from the same IP address could not plausibly authenticate into multiple accounts or attempt authentication several times a second. This rapid request activity should trigger fraud prevention within the application to block authentication and potentially lock the user account. Some applications will also notify the customer of suspicious activity on their account, suggesting that the user change their password. 

Developers could write their own fraud detection methods, but it’s not recommended. First, fraud detection requires subject matter expertise and should be tested thoroughly to avoid false negatives. Second, threats continually evolve, meaning fraud detection applications must also change to reflect an evolving cybersecurity landscape. It’s a full-time job, and it is not feasible for application developers to create their own. 

Instead, developers can plug [fraud detection libraries](https://github.com/fingerprintjs/fingerprintjs/) directly into their code, call relevant methods, and detect bots and threats without knowing how threats work. It leaves subject matter experts to develop effective measures, and developers can protect eCommerce applications from common threats. 

Fingerprint performs fraud detection for you so that developers can stop account takeover threats, bots, and other automated attacks from cybercriminal activity. It’s a library built with the cybersecurity of businesses and their customers in mind. Developers plug in our library, and they can immediately begin protecting corporate applications. 

To test out Fingerprint, look at our [demo](https://fingerprint.com/demo/) or view how our customers currently use our product to [stop fraud](https://fingerprint.com/case-studies/) and automated attacks.