---
templateKey: long-form-content
metadata:
  title: How Major Payment Processors Handle Chargebacks
  url: fingerprint.com/blog/how-major-payment-processors-handle-chargebacks
  image: /img/uploads/how-major-payment-processors-handle-chargebacks-wip-.jpg
  description: Have you ever disputed a charge on your credit card? Chances are,
    you have. Whether the dispute was friendly or fraudulent, chargebacks are
    very costly for ecommerce companies. Learn about how major payment
    processors handle chargebacks and ten strategies you can use to prevent them
    from happening.
  imageAlt: Chargeback Image
  imageTitle: Chargeback Image
  socialImage: /img/uploads/how-major-payment-processors-handle-chargebacks-wip-.jpg
featured: true
publishDate: 2022-12-05T16:03:04.552Z
title: How Major Payment Processors Handle Chargebacks
isPublished: true
isHidden: false
tags:
  - anti-fraud technology
  - ecommerce fraud
authors:
  - Frederik Bussler
heroImage:
  image: /img/uploads/how-major-payment-processors-handle-chargebacks-wip-.jpg
  imageAlt: Chargeback Image
  imageTitle: Chargeback Image
customCTA:
  openCtaNewTab: true
  title: Sign Up for our Newsletter
  description: Stay up to date on our product releases, blogs, webinars, and free resources!
  ctaText: Sign Up
  ctaUrl: https://try.fingerprint.com/newsletter-signup?utm_campaign=Fingerprint%20Blog&utm_source=Blog%20-%20How%20Major%20Payment%20Processors%20Handle%20Chargebacks&utm_medium=Blog&utm_content=Newsletter%20Sign-Up
---
As a business owner, it's essential to understand how chargebacks work and your options for prevention and protection.

Studies show that chargeback costs are rising and projecting to reach [$117 billion](https://chargebacks911.com/chargeback-costs/) in 2023. So-called "friendly fraud" is a significant contributor, where real consumers with legitimate payment details file chargebacks after receiving products or services. Friendly fraud can occur for various reasons, including buyer's remorse, mistakes, or simply because it's easier than returning the item.

Let's take a closer look at the problem of chargebacks before delving into how the major payment processors handle them.



# What is a chargeback, and why are they so costly?

A chargeback is when a customer contacts their bank or credit card issuer to dispute a charge on their statement. The card issuer then investigates, during which time the funds are frozen. If the investigation ends in favor of the customer, the card issuer will reverse the charge, and the customer will get their money back. 

The merchant, on the other hand, may not be so lucky. If the chargeback is valid, they will lose the disputed amount and may be hit with additional fees from the payment processor. And if enough chargebacks are filed against a merchant, the payment processor may terminate their account. 

To add insult to injury, [81%](https://citcon.com/chargeback-statistics-merchants-need-to-know/) of chargebacks have no valid reason. Customers may simply be taking advantage of the system, knowing there's a good chance they'll get their money back even if they don't have a legitimate case. 

Unfortunately, chargebacks are often misused. And they can be very costly for merchants, to the tune of billions of dollars yearly.


## Table of Contents

```toc
exclude: Table of Contents
from-heading: 1
to-heading: 3
ordered: false
```

# How do payment processors handle chargebacks?

Payment processors have different policies regarding chargebacks, so it's essential to understand how each handles them.

Let's look at how these major processors handle chargebacks:

* Paypal
* Stripe
* Shopify
* WooCommerce
* Square
* Clover
* Adyen
* Helcim



## PayPal

For a good reason, PayPal has a longstanding reputation as a secure payment processor. Their annual payment [volume exceeds $1 trillion](<https://www.globaldata.com/data-insights/fnnilsrie/total-payment-volume-on-paypal-global/#:~:text=PayPal%3A%20Total%20Payment%20Volume%20(Q3,%E2%80%93%20Q1%202022%2C%20%24%20billion)&text=Whereas%20for%20FY2021%20PayPal's,TPV)%20of%20USD%201.25%20trillion.>) across nearly 20 billion transactions. 

Regarding chargebacks, PayPal offers [dispute resolution services](https://www.paypal.com/dm/webapps/mpp/security/resolve-disputes#:~:text=Buyers%20can%20file%20chargebacks%20180,or%20more%20in%20some%20instances.) and will work with buyers and sellers to resolve them. 

First, a buyer requests a chargeback from their credit card issuer. The credit card company then notifies PayPal's merchant bank and withdraws the funds from PayPal. The buyer can also directly report a transaction in the PayPal app. The seller's funds are put on hold during the investigation when PayPal notifies the seller. 

Buyers have 180 days from the transaction date to file a dispute, and sellers have ten days to respond once a dispute is filed. The dispute would include information about the chargeback, such as proof of product or service delivery. A PayPal chargeback specialist will dispute the chargeback on the merchant's behalf. Chargebacks are typically resolved in a few weeks but can take up to 75 days or more in some cases.

If the investigation finds the seller's favor, the funds are released back to them, and the buyer is notified. If the investigation finds in favor of the buyer, the funds are refunded, and the seller is notified. 

PayPal also offers a [Seller Protection program](https://www.paypal.com/us/webapps/mpp/security/seller-protection) for eligible transactions, which can help protect sellers from certain types of chargebacks.

### PayPal Chargeback Scams

PayPal is relatively strict regarding chargebacks, but that doesn't mean there aren't scams. One scam is setting up fake PayPal accounts - commonly online shops and charities - and luring people into making a payment. Once the payment is made, the scammer vanishes, leaving the victim with no way to get their money back. 

Shipping address scams are another type of PayPal chargeback scam. This is where a buyer will purchase an item and provide false delivery information, such that the shipping firm eventually marks the item "undeliverable." The buyer then files a chargeback with PayPal and informs the shipping firm of their correct address. The shipping firm ships the item to the buyer's address, and the merchant is left footing the bill. 

The PayPal gift scam is another common one. This is where a buyer purchases an item using PayPal but then tells the seller that they accidentally sent the payment as a gift instead of as goods and services. The buyer then asks for a refund, and if the seller complies, the buyer gets their money back plus the item they purchased - again getting the item for free. 

To avoid being scammed, it's essential to be aware of these and other scams. And if you're ever unsure about a transaction, you can contact PayPal's customer support for help.



## Stripe

When a cardholder [disputes a charge](https://stripe.com/docs/disputes#:~:text=To%20process%20a%20chargeback%2C%20the,payment%20amount%20and%20dispute%20fee.) with their card issuer, the issuer will immediately reverse the charge, and Stripe will debit the corresponding amount (as well as network dispute fees) from the merchant's Stripe account.

Stripe alerts the merchant, who can either submit evidence to dispute the chargeback, accept the dispute, or do nothing. The cardholder's bank will review evidence for up to 75 days, and if they find it in favor of the merchant, the funds will be returned to Stripe and then to the merchant. 

If the merchant does nothing or the cardholder's bank finds in favor of the cardholder, the chargeback is valid, and the funds will not be returned to the merchant. 

### Stripe Chargeback Protection

Stripe also offers a product called [Radar](https://stripe.com/radar), which uses machine learning to help identify and prevent fraud. Radar is built into Stripe and will learn from your business' unique data to identify high-risk payments.

Radar includes features like rich analytics on fraud performance and dispute rates, the ability to make custom rules for certain transactions, and a pipeline to consolidate your fraud data with Radars in your data warehouse.

Merchants will need to analyze if the extra fees are worth it, as Radar for fraud teams costs an [additional 7 cents](https://stripe.com/radar/pricing) per screened transaction on top of Stripe's regular fees.



## Shopify

Shopify is the largest eCommerce platform in the world, powering over 1 million businesses in 175 countries.

Shopify is more involved in the chargeback process than some of the other payment processors we have reviewed. Once a customer files a chargeback, Shopify collects evidence and sends it to the credit card company, giving time for the merchant to provide additional evidence in the Shopify admin portal. It'll take up to 120 days to get a final decision from the credit card company. 

The additional evidence may include proof of customer authorization and the service provided, item delivery, and the terms of service and refund policy. [Chargebacks](https://help.shopify.com/en/manual/payments/chargebacks) are marked in one of eight categories: 

* **Fraudulent:** A chargeback is marked "fraudulent" when the cardholder didn't authorize the charge, which is among the most common reasons for a chargeback, and typically happens when a card is stolen. Suppose you believe that the customer isn't being truthful. In that case, you can submit evidence to the credit card company, including the date and time of order fulfillment, billing information, IP address, and more.
* **Unrecognized:** An "unrecognized" chargeback happens when the buyer doesn't recognize the merchant's name or location on their statement. You can contact the customer directly to see if they remember making the purchase - sometimes, it's a mistake, or a spouse or family member might have made the purchase. If the customer still doesn't remember making the purchase, you can submit evidence to the credit card company, including shipping and tracking information.
* **Duplicate:** A "duplicate" chargeback is when customers believe they were charged twice for one product or service. For example, a customer may have mistakenly filed a chargeback because two products had identical prices.
* **Subscription canceled:** A "subscription canceled" chargeback happens when a customer believes they were charged for a subscription after it was supposed to have been canceled. This could be because the customer forgot they had a subscription or didn't realize it would renew automatically. You can contact the customer directly to explain the situation and work out a solution or submit evidence to the credit card company if you have documentation of their cancellation request.
* **Product not received:** A "product not received" chargeback is when the customer believes they never received the product they purchased. This is usually because of a shipping error, so you'll want to start by checking with your shipping company to see what happened.
* **Product unacceptable:** A "product unacceptable" chargeback is when the customer feels the product is defective, damaged, or not as described. This can be a quality issue with the product itself or a problem with how it was represented on your site. You'll need to submit that evidence if you believe there was no genuine issue with the product.
* **Credit not processed:** A "credit not processed" chargeback is when a merchant has failed to provide a timely refund or credit for a canceled transaction. You can submit this evidence to the credit card company if you have proof that the customer is not entitled to a refund.
* **General:** A "general" chargeback does not fit into the other categories. Misunderstandings usually cause these, so your best bet is to try and contact the customer directly to see the problem. 

Shopify chargeback protection is offered by [Shopify Protect](https://www.shopify.com/protect): Shopify's free, built-in chargeback protection. Shopify store owners can simply activate Shopify Protect, and Shopify will automatically cover the costs of the order and the chargeback fee on fraud-based chargebacks.

This only works, of course, if the merchant can prove that the chargeback was fraudulent.



## WooCommerce

A tremendous [43%](https://blog.hubspot.com/website/wordpress-stats#:~:text=(W3Techs%2C%202022),every%20five%20websites%20use%20WordPress.) of websites today are built on WordPress, and many use WooCommerce to power their online stores.

WooCommerce is a popular eCommerce plugin for WordPress and works with major payment processors, including PayPal, Stripe, and Authorize.net. 

WooCommerce features a ["Disputes" page](https://woocommerce.com/document/payments/managing-disputes-with-woocommerce-payments/#section-28), which includes a form to challenge disputes. The merchant can provide evidence like weblogs, email communications, delivery communications, proof of prior refunds, etc. WooCommerce recommends directly speaking with the customer, which is in line with best practices for chargebacks. 

Because setting up WooCommerce can be complex, it's essential to ensure you have everything set up correctly - including your integrations with platforms like Stripe if anything in the process breaks, like if a WooCommerce Stripe payment fails. If the customer makes two transactions, the customer may quickly file a chargeback.



## Square

Square is a popular payment processor for small businesses, offering features like POS systems and invoicing. The iconic white square card reader is ubiquitous in many small businesses today.

With Square, you have seven days to respond to a chargeback notice. If you have evidence to [dispute the chargeback](https://squareup.com/help/us/en/article/3882-payment-disputes-walkthrough), you can provide it online. This may include a copy of the sales receipt, invoice, or delivery receipt.

Square merchants can receive three types of chargebacks: EMV payment disputes, ACH payment disputes, and Cash App disputes.

* **EMV Payment Disputes:** "EMV" (Europay, Mastercard, and Visa) cards are microchipped and swiped chip card transaction disputes that are always resolved in the customer's favor (if the customer claims fraudulent use). Issuers will not reimburse merchants that swipe (instead of dip) a chip card.
* **ACH Payment Disputes:** ACH payment disputes are final, and there's no formal process for challenging them. These are typically due to unauthorized transactions, so it's crucial to ensure your customers know they're authorizing a payment when they provide their bank account information.
* **Cash App Disputes:** These are similar to any other payment dispute - you can provide evidence to dispute the chargeback. Still, if you don't have any proof or choose not to provide it, the chargeback is valid, and the funds will not be returned to you. 



## Clover

Clover is a popular choice for small businesses. Since 2012, Clover was initially part of First Data, which merged with Fiserv in 2019.

Clover does not have a built-in system for managing chargebacks but offers guidance on how to do so. Their merchant services team offers extensive [fraud monitoring tools](https://blog.clover.com/minimize-security-risks-with-fraud-management-tools/) like a velocity filter, on-hold functionality, CVV filter, geo IP tracking, and more.

When handling a chargeback, Clover doesn't offer much in the way of dispute resolution. So, the merchant would need to follow the [best practices](https://uk.clover.com/content/dam/firstdata/clover-uk/en/pdf/legal/Ops-Guide-FINAL_2021.pdf) the company lays out, including reaching out to the customer to try and resolve the dispute, providing evidence to the credit card company within the timeframe given, consistently delivering products and services as described, using a clear merchant descriptor, and so on.



## Adyen

Adyen is a relative newcomer to the payment processing scene but has quickly become a favorite among eCommerce businesses. Adyen is now [bigger than Block](https://www.protocol.com/fintech/adyen-payments-earnings) and just a little behind Stripe.

One of Adyen's key advantages is that they're a very [low-fee processor](https://www.adyen.com/pricing) - just €0.10 to Adyen per transaction, with no additional monthly or hidden fees.

Adyen's [stance on chargebacks](https://docs.adyen.com/risk-management/understanding-disputes/dispute-process-and-flow) is also beneficial for merchants who are too busy to deal with them: Adyen automatically defends chargebacks that don't require merchant action, such as fraud chargebacks with a liability shift. The merchant uploads evidence via the Adyen dashboard or API for other chargebacks. Adyen calls this the "1st chargeback," where the funds are automatically withdrawn from the merchant's account.

The chargeback is reversed, but if the card issuer finds it in favor of the customer, the "2nd chargeback" is filed, and the merchant is responsible for the total chargeback amount.



## Helcim

[Helcim](https://www.helcim.com/) is another processor that's popular among small businesses. Based in Canada, Helcim has been around since 2006 and offers features like POS systems, eCommerce platforms, virtual terminals, and more.

Helcim will email merchants that receive a chargeback, at which point the merchant can accept or dispute the chargeback. You'll be asked to provide evidence if you dispute the chargeback. If the verdict is in favor of the merchant, the chargeback and the $15 fee will be reversed. If the chargeback is valid, the merchant can enter arbitration for a [fee of $400 to $500](https://learn.helcim.com/docs/chargebacks). This fee will be refunded if the verdict is in favor of the merchant. Alternatively, the merchant can choose to do nothing, which means the chargeback will stand.

Chargebacks are costly and can be devastating for small businesses. Understanding how chargebacks work and your options for prevention and protection are essential. By understanding the policies of the major payment processors, you can be better prepared to handle chargebacks should they occur.



# The challenges of preventing chargebacks and fraud

Even if you apply all the best practices for chargeback prevention, from record-keeping to reliable customer service and communication, you'll still end up with chargebacks. Why? Because fraudsters are always coming up with new ways to exploit the system.

As businesses improve their defenses against chargebacks, fraudsters adapt their methods to find new ways to get around the safeguards. It's an ongoing arms race that businesses can't afford to lose. Consider that Visa, for instance, categorizes accounts with a chargeback ratio of just 1.8% as "[excessive](https://www.getbankcard.com/blog/chargeback-ratio-limit-high-risk-merchant/#:~:text=VISA's%20chargeback%20thresholds&text=It%20categorizes%20accounts%20into%20two,chargeback%20ratio%20of%201.8%20percent)."

Moreover, businesses are often on the hook for the entire fraudulent transaction amount, plus any associated fees. And if your chargeback rate gets too high, you could be dropped by your payment processor entirely.

Preventing chargebacks and fraud is essential for any business that accepts payments. But it's also a complex and ever-changing challenge.

## How fraudsters continue to exploit the system

Chargeback fraud schemes are not a static thing. As businesses implement new safeguards, fraudsters adapt their methods to find new ways to get around them.

For example, you may have noticed that a particular IP address is associated with many chargebacks. So you block that IP address from making any more purchases. But the fraudster switches to a new IP address and continues their scheme.

Other heuristic-based chargeback prevention methods include blocking transactions over a certain amount or requiring customers to verify their identity with a second factor, such as a one-time passcode. But fraudsters can quickly get around these measures by making multiple smaller transactions, using a different credit card for each purchase, or getting fake phone numbers.

A fraudster can spoof even something like GPS location data. They can use a VPN or proxy server to make it appear like they're in a different location than they are.

Sophisticated fraudsters use a combination of techniques to beat chargeback prevention measures. They might use multiple IP addresses, spoof their location and phone number, and make small transactions.



# Ten chargeback prevention strategies

Given the tremendous cost of chargebacks, businesses must do everything possible to prevent them. Chargebacks result in the loss of the disputed amount, additional fees from the payment processor, and possible termination of your account. 

Beyond the immediate financial costs, chargebacks can damage your business's reputation, take up a lot of time and resources to resolve, and be very frustrating for everyone involved.

Chargebacks are on the rise, but there are things you can do to prevent them. Here are ten chargeback prevention strategies.

### 1. Use a recognizable merchant descriptor

Customers who see an unknown or unrecognizable merchant descriptor on their credit card statement are more likely to file a chargeback. Use an identifiable merchant descriptor that matches your business name and website to avoid this.

For example, suppose you run a bar called "The Red Lion." If your merchant descriptor reads "TRL LLC," customers may not recognize it and file a chargeback. If, on the other hand, your merchant descriptor reads "The Red Lion Bar," customers will be more likely to recognize it and know that the charge is yours.

Including a working phone number in your descriptor can also help, as customers will be able to call you with any questions or concerns about the charge.

Logging in to your merchant portal, payments platform, or account with the processor should give you a way to change your descriptor. Contact the processor's customer service for help if you can't find that option.

### 2. Maintain good records

Maintaining good records is essential to preventing chargeback fraud. When a customer initiates a chargeback, the merchant must provide documentation showing that the purchase was made and that the customer received the product or service. If the merchant cannot provide this documentation, the chargeback is almost universally granted in favor of the customer.

This means merchants must save order confirmations, shipping information, and refund/return policy correspondence. It's also a good idea to require signatures for all orders and to take pictures of high-value items before shipping them. This can help prove that an item was delivered as ordered and that the customer received it in good condition.

In a dispute, good records can make all the difference. With clear and concise documentation, merchants can increase their chances of winning a chargeback dispute and protect their businesses from fraud.

### 3. Use prevention tools

Several chargeback prevention tools are available, which can help reduce the risk of chargebacks.

For example, address verification services (AVS) can help verify that the customer's billing address matches the one on file with their credit card issuer. This can help prevent so-called "shipping address" scams, where a customer provides a false shipping address and files a chargeback when the item is marked as undeliverable.

Another tool is [3D Secure](https://stripe.com/docs/payments/3d-secure), an authentication protocol that adds an extra layer of security to online transactions. This can help prevent fraud and give customers peace of mind knowing that their purchase is safe and secure.

Even something as simple as requiring a CVV code for online orders can help reduce chargebacks, adding an extra level of security.

As discussed in the section on how payment processors handle chargebacks, some also offer fraud prevention tools. For example, [Stripe's Radar](https://stripe.com/radar) software can help reduce the risk of fraudulent chargebacks.

### 4. Strengthen customer service

One of the best ways to prevent chargebacks is to provide excellent customer service. This includes responding quickly to customer inquiries, proactively addressing concerns, and going above and beyond to resolve problems.

If customers feel they're treated well and their concerns are addressed promptly, they're less likely to file a chargeback. On the other hand, if they think they're ignored, or their concerns are not addressed, they're more likely to file a chargeback.

Being easily accessible and responsive is especially important if you sell digital goods or services, as customers may not have any other way to get in touch with you if there's a problem.

Providing multiple contact methods, such as an on-site chat widget, a phone number, and an email address, can also be helpful. This way, customers can choose the contact method they're most comfortable with.

### 5. Improve order communication

Another way to improve customer service and prevent chargebacks is to ensure that your customers are well-informed about their orders. This includes sending order confirmation emails, shipping updates, and tracking information.

Order updates are essential for orders with longer delivery times, as customers may become anxious about their order status if they are still waiting to hear from you. Keeping them updated will help reduce the risk of them filing a chargeback.

Including clear and concise instructions with digital goods can also be helpful. For example, if you're selling an ebook, make sure to include instructions on how to download and open it. Customers unable to use your product or service are more likely to file a chargeback.

Tying this in with the last point, if a customer ever tries to contact a merchant about an order but cannot reach anyone, this can lead to a chargeback. Make sure you have a clear and accessible customer service policy and that someone is available to answer customer inquiries promptly.

Nowadays, providing those means of communication has become increasingly more manageable with the development of various order management software solutions. Those can automatically send out those notifications and give that information to the customer, taking a load off the merchant's shoulders. Further, tools like [Intercom](https://www.intercom.com/) can be used to provide answers to frequently asked questions or even live chat support, should a customer need assistance.

### 6. Reduce merchant error

Although most chargebacks are filed for no real reason, there are some cases where chargebacks are warranted. In these cases, it's crucial to prevent future chargebacks.

One common cause of chargebacks is errors on the part of the merchant. This can include billing the wrong amount, shipping to the incorrect address, or sending the wrong product.

Making sure that your billing, shipping, and fulfillment processes are error-free can help reduce the risk of chargebacks. This includes double-checking addresses and order details before shipping and using a shipping service that offers tracking and delivery confirmation.

Sources of merchant error can be subtle; even something as small as a typo in data entry can cause a problem. Use order management software to automate as much of the process as possible, and review orders carefully before shipping to catch any mistakes.

When errors do occur, make sure to take care of them quickly and efficiently. Resolving customer issues can help prevent chargebacks and may even win back disgruntled customers.

### 7. Transparent and honest marketing

Marketing and product teams can often be at odds with each other, with marketing wanting to make things sound as good as possible and product teams wanting to be transparent and honest about what they're selling.

However, there are clear lines that marketing should not cross. Making false claims, using deceptive practices, or otherwise misrepresenting your product or service will bite you in the form of chargebacks. 

These practices can also be very subtle; for example, a fashion retailer might edit their product photos to make clothes look more flattering, or a travel company might only show the best pictures of a destination.

It's essential to be transparent and honest in your marketing and ensure that your product or service lives up to the hype. Over-promising and under-delivering are a recipe for chargebacks.

### 8. Manage recurring payments

Recurring payments are becoming increasingly common but can also be a source of chargebacks. This is especially true if customers need to remember that they signed up for a recurring payment or if they no longer want or need the service.

You can do a few things to reduce the risk of chargebacks associated with recurring payments. First, ensure that your customers know they're signing up for a recurring charge. This could be done at sign-up or through email or SMS reminders before each payment is processed.

Second, customers can easily cancel their subscriptions if they no longer want or need the service. Making it difficult to cancel will only increase the likelihood of chargebacks.

Finally, consider using a "pre-notification" service to send customers a reminder before each recurring payment is processed. This can help reduce the number of accidental or unauthorized chargebacks.

### 9. Fight friendly fraud

Friendly fraud is when a customer knowingly files a false chargeback to get a refund for a product or service they received and used. While this may seem a victimless crime, it's quite costly for businesses.

There are a few things you can do to combat [friendly fraud](https://fingerprint.com/blog/what-is-friendly-fraud-prevention-tips/?utm_campaign=Fingerprint%20Blog&utm_source=Blog%20-%20How%20Major%20Payment%20Processors%20Handle%20Chargebacks&utm_medium=Blog&utm_content=Friendly%20Fraud%20Blog). For one, have a clear and concise refund policy, and make sure that your customers know it. This way, there will be clarity about what is and is not covered by a refund.

Also, keep good records of all customer communications, including order confirmations, shipping information, and refund policy correspondence. This can help prove that a customer received and used the product or service.

### 10. Seek professional help

If you're struggling with chargebacks, it may be time to seek professional help. Several companies specialize in chargeback prevention and dispute resolution, and they can be valuable resources.

These companies can help you develop a chargeback prevention plan, Identify and resolve problems leading to chargebacks, and represent you in disputes with the credit card issuer or acquirer.

Chargebacks are costly and time-consuming, but there are things you can do to prevent them. Using these chargeback prevention strategies can reduce the risk of chargebacks and save your business time and money.



# Preventing chargeback fraud with Fingerprint Pro

Traditional approaches to spotting bots rely on IP addresses and other heuristics, but these can be easily spoofed. Fingerprint Pro is a new approach that uses machine learning to analyze hundreds of characteristics and uniquely identify each user's device. 

Before the advent of machine learning, businesses had to rely on rule-based systems to detect fraud. This could have been more effective, as savvy fraudsters were able to find ways around the rules. Machine learning offers a more flexible and effective way to fight fraud.

Just as self-driving cars could never operate in the highly-complex world with a rule-based approach, the same is accurate for fraud detection. Machine learning offers the ability to learn and adapt as new fraud patterns emerge.

Leading companies already use Fingerprint Pro to prevent chargeback fraud and other types of abuse by identifying returning visitors with 99.5% accuracy. To learn more about how Fingerprint Pro can help your business, [create a free account](https://fingerprint.com/?utm_campaign=Fingerprint%20Blog&utm_source=Blog%20-%20How%20Major%20Payment%20Processors%20Handle%20Chargebacks&utm_medium=Blog&utm_content=Fingerprint%20Home%20Page) or [contact us](https://fingerprint.com/contact-sales/?utm_campaign=Fingerprint%20Blog&utm_source=Blog%20-%20How%20Major%20Payment%20Processors%20Handle%20Chargebacks&utm_medium=Blog&utm_content=Contact%20Sales%20Page) for a free demo.