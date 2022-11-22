---
templateKey: use-case-content
metadata:
  title: Coupon & Promo Abuse
  description: Coupon abuse occurs when a customer or fraudster takes advantage of
    a business’s promotions for monetary gain—for example, a single fraudster
    redeeming the same promo code multiple times at checkout.
  url: fingerprint.com/use-cases/coupon-promo-abuse
  image: /img/uploads/promo-abuse-min.png
  imageAlt: coupon promo fraud
  imageTitle: coupon promo fraud
  socialImage: /img/uploads/promo-abuse-min.png
publishDate: 2022-11-04T19:09:14.598Z
isPublished: true
title: Coupon & Promo Abuse
description: Coupon abuse occurs when a customer or fraudster takes advantage of
  a business’s promotions for monetary gain—for example, a single fraudster
  redeeming the same promo code multiple times at checkout.
funnel:
  - Payment
category:
  - Cheating
industry:
  - Ecommerce
useCaseCode:
  button2:
    buttonText: View demo source on GitHub
    url: https://github.com/fingerprintjs/fingerprintjs-pro-use-cases
  iframeUrl: https://fingerprinthub.com/coupon-fraud
---
### **Why is coupon & promo abuse prevention important?**

While increased sales are good for your business, customers acting in bad faith can dry up available promotional campaign dollars by repeatedly using coupon codes. Preventing customers, either signed-in or guests, from abusing your coupons and promotions can help:

* Prevent financial losses
* Increase sales

### **How to Increase Revenue Through Coupon Abuse Prevention**

**Install a browser identification service**

Device identification services like Fingerprint Pro can accurately identify anonymous visitor traffic by uniquely identifying their browsers. With JavaScript running in the background, Fingerprint Pro generates a unique identifier (the `visitorId`) anytime someone performs a critical action, such as checkout. Following the best practice of never trusting data from the client side, we can leverage server-side tools to validate incoming fingerprints. As a result, you can protect your storefront’s coupon system against fraudsters without harming the checkout experience for friendly customers.

**Configuring Fingerprint Pro for Coupon Abuse Prevention**

Here is boilerplate logic for protecting coupon codes, but additional checks may be necessary depending on your business needs.

* Firstly, your store’s frontend will need the Fingerprint Pro JavaScript agent to collect browser signals and generate a unique identifier. Alternatively, if your frontend is built atop a framework like Next.js or Vue, you may streamline the development experience using one of [our open-source libraries](https://fingerprint.com/sdk-libraries).

```javascript
// Initialize the agent
const fpPromise = import('https://fpjscdn.net/v3/your-public-api-key')
  .then(FingerprintJS => FingerprintJS.load({
    endpoint: 'https://fp.yourdomain.com'
  }));

// Once you need result, get and store it.
// Typically on page load or on button click.
fpPromise
  .then(fp => fp.get())
  .then(fpResult => {result = fpResult})
```

* The `endpoint` property here is highly recommended for all customers. It ensures the Fingerprint API request is not blocked by browser extensions and provides the highest accuracy for browsers like Safari and Firefox.
* For each successful checkout, send the spent coupon code with a `visitorId`. For subsequent checkouts when a customer attempt a coupon, verify the `visitorId` has not used this coupon code in the past.

```javascript
const couponData = {
  visitorId,
  requestId,
	couponId
};

const response = await fetch(`/api/checkout/coupons}`, {
  method: 'POST',
  body: JSON.stringify(fingerprintData),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
```

> **The next steps should be performed on the back-end. Please see our [GitHub](https://github.com/fingerprintjs) for available server-side integrations.**

* Using the Fingerprint Pro [Server API](https://dev.fingerprint.com/docs/server-api), an identification event can be validated for added security against forgery.
* First check the `visitorId` and `requestId` for valid formatting. We can use regex before sending a potentially unnecessary Fingerprint server API request.

```javascript
const visitorId = req.body.visitorId;
const requestId = req.body.requestId;

const isRequestIdFormatValid = /^\d{13}\.[a-zA-Z0-9]{6}$/.test(requestId);
const isVisitorIdFormatValid = /^[a-zA-Z0-9]{20}$/.test(visitorId);

if (!isRequestIdFormatValid || !isVisitorIdFormatValid) {
  return getForbiddenReponse();
}
```

* Check that the visitorId is legitimate by hitting the server API /visitors endpoint. An invalid identifier will result in an empty array.

```javascript
const fingerprintJSProServerApiUrl = new URL(
  `https://api.fpjs.io/visitors/${visitorId}`
);

fingerprintJSProServerApiUrl.searchParams.append('request_id', requestId);

const visitorServerApiResponse = await fetch(
  fingerprintJSProServerApiUrl.href, { method: 'GET', headers: { 'Auth-API-Key': 'secret-api-key' } }
);

// If there's something wrong with provided data, Server API might return non 200 response.
// We consider these data unreliable.
if (visitorServerApiResponse.status !== 200) {
	reportSuspiciousActivity(req);
  // Handle error internaly, do not allow the coupon code to be applied.
}

const visitorData = await visitorServerApiResponse.json();
return visitorData;
```

```javascript
if (visitorData.error || visitorData.visits.length !== 1) {
	// Do not allow the coupon code to be applied.
  return getForbiddenReponse();
}
```

* To prevent phishing, it is important to check the freshness of an identification request.

```javascript
if (new Date().getTime() - visitorData.visits[0].timestamp > 3000) {
	// Do not allow the coupon code to be applied.
  return getForbiddenReponse();
}
```

* To ensure the identification event came from the same IP as the coupon request, compare the IP addresses from each request for a match.

```javascript
// This is an example of obtaining the client IP address.
// In most cases, it's a good idea to look for the right-most external IP address in the list to prevent spoofing.
if (
  request.headers['x-forwarded-for'].split(',')[0] !==
  visitorData.visits[0].ip
) {
	// Do not allow the coupon code to be applied.
  return getForbiddenReponse();
}
```

* The Fingerprint API request should always originate from a trusted, production website. Check the origin in the response to ensure it is coming from your website.

```javascript
const ourOrigins = [
  'https://example.com',
];

const visitorDataOrigin = new URL(visitorData.visits[0].url).origin;
if (
  (visitorDataOrigin !== request.headers['origin'] ||
    !ourOrigins.includes(visitorDataOrigin) ||
    !ourOrigins.includes(request.headers['origin']))
) {
	// Do not allow the coupon code to be applied.
  return getForbiddenReponse();
}
```

* During the checkout process, typically on the button click such as "Apply coupon", check if the coupon exists and apply your coupon policies and rules. In the example below, we check if the coupon had been already claimed by the visitor before.

```javascript
/**
 * Checks if a coupon exists with the given coupon code.
 */
export async function checkCoupon(code) {
  return await CouponCode.findOne({
    where: {
      code: {
        [Op.eq]: code,
      },
    },
  });
}

async function getVisitorClaim(visitorId, couponCode) {
  return await CouponClaim.findOne({
    where: { visitorId, couponCode },
  });
}

const coupon = await checkCoupon(couponCode);

// Check if the coupon exists.
if (!coupon) {
  return getForbiddenReponse(res, 'Provided coupon code does not exist.', 'error');
}

const wasCouponClaimedByVisitor = await getVisitorClaim(visitorId, couponCode);
```

* Additionally, according to our fictional coupon policy, we also check if the visitor claimed another coupon recently. If everything is fine, we mark the coupon as claimed in the database and adjust the price accordingly.

```javascript
async function checkVisitorClaimedRecently(visitorId) {
  const oneHourBefore = new Date();
  oneHourBefore.setHours(oneHourBefore.getHours() - 1);

  return await CouponClaim.findOne({
    where: {
      visitorId,
      timestamp: {
        [Op.between]: [oneHourBefore, new Date()],
      },
    },
  });
}

/**
 * Claim coupon on behalf of the visitor.
 */
export async function claimCoupon(visitorId, couponCode) {
  const claim = await CouponClaim.create({
    couponCode,
    visitorId,
    timestamp: new Date(),
  });
  await claim.save();

  return claim;
}

const visitorClaimedAnotherCouponRecently = await checkVisitorClaimedRecently(visitorId);

if (visitorClaimedAnotherCouponRecently) {
  return getForbiddenReponse(res, 'The visitor claimed another coupon recently.\n', 'error');
}

await claimCoupon(visitorId, couponCode);

return getOkReponse(res, `Coupon claimed you get a 119 USD discount!`, 'success');
```

### Explore our Coupon Abuse Prevention Demo

We have built a fully open-sourced [coupon abuse prevention demo](https://fingerprinthub.com/coupon-fraud) to demonstrate the concepts above. Feel free to view the live demo on StackBlitz or jump into the GitHub repo for code. If you have any questions, please reach out to us at support@fingerprint.com.