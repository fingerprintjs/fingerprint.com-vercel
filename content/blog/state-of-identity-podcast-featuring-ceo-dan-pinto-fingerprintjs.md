---
templateKey: long-form-content
metadata:
  title: State of Identity Podcast with CEO Dan Pinto
  url: https://fingerprint.com/blog/state-of-identity-podcast
  image: /img/uploads/fingerprintjs.png
  imageAlt: State of Identity Podcast - Fingerprint
  imageTitle: State of Identity Podcast - Fingerprint
  description: Listen to our podcast episode with CEO Dan Pinto and State of
    Identity host Cameron D'Ambrosi talk about browser identification and the
    future of identity management!
featured: true
publishDate: 2021-08-19T14:02:00.000Z
title: "State of Identity Podcast: Featuring CEO Dan Pinto, Fingerprint"
isPublished: true
isHidden: false
tags:
  - fingerprinting
authors:
  - Savannah Copland
heroImage:
  image: /img/uploads/fingerprintjs.png
  imageAlt: State of Identity Podcast - Fingerprint
  imageTitle: State of Identity Podcast - Fingerprint
---
We are excited to announce our featured episode on OWI's State of Identity podcast.

Host Cameron D'Ambrosi interviewed CEO Dan Pinto on the origin story of Fingerprint, the power of anonymous identification to reduce friction while preventing online fraud, and the future of identity management in a post-pandemic world.

## [Listen to the podcast](https://liminal.co/podcast/fingerprintjs-fraud-at-the-source/)

<br>
<br>
<br>
<hr>
<br>

### Audio Transcript

<br>

#### CAMERON:

Welcome to State of Identity! I'm your host, Cameron D’Ambrosi. 

Joining me this week is Dan Pinto, CEO at Fingerprint. Dan, welcome to the podcast. 

#### DAN:

Thanks for having me. 

#### CAMERON:

So you are what the kids call these days a serial entrepreneur, with a few different startups under your belt. Obviously, you're building some really cool and interesting stuff at Fingerprint, which is why you're on the podcast. I’m really excited to dive into that platform and its applicability in the digital identity space. 

But before we do that, I would love to get a bit of an overview of your career journey, how you came to be the CEO at Fingerprint and what your touchpoints with digital identity might have been prior to joining.

#### DAN:

Yeah, thanks. I have always wanted to be a serial entrepreneur since I was a kid. I learned programming as a hobby growing up, dabbled a little bit in different tech startups, learned a lot, and knew that someday I wanted to do entrepreneurship myself. So I'm happy to be on my second startup now. 

Before Fingerprint, I started a company called Machinio which was a search engine for used machinery. I was CTO there and built the first version of all the technology. We had crawlers, we had search engine technology, we did a lot of search engine optimization in order to rank well. The idea for that was to try and find as much inventory online as we could and create a single resource for used machinery and the idea worked out. 

While at Machinio, I hired a person named Valentin as one of our first software engineers. He's actually the original creator of the Fingerprint library. So that's when I first found out about it, we used it for a little while at Machinio to help us catch different kinds of fraud, and Valentin and I worked together for about six years. 

After selling Machinio, Valentin decided that he wanted to try and create a professional version of the Fingerprint library. So he started working on the product way before I even considered joining. The interesting thing about the background for Fingerprint is that we really didn't know what it was going to be when we started. It was more just two technical guys tinkering on things, trying to see what we could build. He started with it at first and built a nice service from it. Then when it was time for me to leave Machinio, I decided to start working on Fingerprint, at least part time in the beginning. But then once I started seeing what he was actually building and the feedback from customers, I decided to join full time. And it turned out to be a really interesting opportunity for me and for him. 

Since then things have gone really smoothly. We've raised two rounds of funding. We're at 23 people at the company right now, mostly engineers, and yeah, things are going well for us right now. We're focused on solving any and all anti-fraud problems that are on the internet. So happy to talk more about that later on the podcast.

#### CAMERON:

Let's get right into it. Before we talk about use cases, an overview of the technology itself that underpins Fingerprint would be super helpful. I understand there's a little bit of a teaser there in the name that it involves fingerprinting. My advanced layman's understanding of your core product offering is essentially the ability to provide a fairly unique device level fingerprint for each session that you see coming across a website or application and then be able to use that to understand who's visiting your platform and hopefully determine if they're a user that should be trusted or not trusted? Is that a fair assessment?

#### DAN:

Yeah, that's pretty much correct. In terms of what we do, there's some minor nuances to exactly what we can and can't do. So I can definitely go into that. 

As you can imagine, when you're on the internet connecting to a website, the website can't know with 100% accuracy who you are - who the person behind the computer actually is. So that's where we come in to try and bridge that gap a little bit. We cannot tell who the human is necessarily. But with the techniques that we've developed, we've been able to reach a 99.5% level of accuracy in detecting a browser that comes back to a website. So technically, the identifier that we generate is unique to a browser, but not necessarily to a device. And because we decided to make that architectural decision early on, that's why we've been able to get to such a high level of accuracy. 

So a little bit more about how that works. What we do is we run JavaScript on our clients’ websites that tries to pull as many parameters from a device as possible. And we go very deep into browser APIs. So there’s specific APIs for Chrome, there's a set of APIs that we can use on Safari, the set of APIs that we can use for Firefox, etc. And for each browser, we go as deep as we can to pull as many parameters as we can. So we can pull things like the screen resolution, CPU details, GPU details, what fonts you have installed on your computer, more advanced technical things like fingerprinting, the SSL connection, TLS analysis, and so on. We're able to collect all these pieces of data inside the browser, send them to our back end, process it and generate an identifier that we call a visitorID for businesses to use. So that visitorID is the one that we provide with a 95.9 9.5% accuracy. And that is the core business value that we provide. 

So imagine, you have a login page on a banking website. Whenever people log in, they have to provide a username and a password. But in some cases somebody may get access to your username and password and then be able to log in to your account. So where we come in is we fingerprint every person that comes to that login page for that bank. And then they store that fingerprint, or visitorID, with every login. And that provides an additional identifier in addition to the username and password that can increase the security of the page. So without needing to go all the way to full two factor authentication, which is very high friction, we can provide a passive method of fingerprinting someone as they visit the website. And if a visitor attempts to login and has the same fingerprint as a previous visit, you can allow them to login. If the fingerprint is different, you can then step up to another level of authentication. So you can require the visitor to verify their email address, you can require them to verify their phone number, or something else. And as a result, with the combination of our technology and traditional methods, we get to a much higher level of accuracy than anyone else and can solve problems like account takeovers, reducing credit card fraud, and stopping people from sharing accounts when they're not supposed to. There's actually a very long list of problems that we can help solve. 

The one thing that wasn't clear in describing the business is that we're an API driven business. So anyone can come to our website and sign up - it's completely free for the first 30 days with no credit card required. And they can start using it and start solving problems. So every day, I'm actually surprised whenever we see new signups and how they're actually using it, because they teach us how the technology can be used.

#### CAMERON:

You're working in a really interesting space, which is this almost choke point, if you will, where someone's legal identity needs to interface with a platform. That choke point is through the browser and to the degree you can uniquely identify that browser really gives you a really good chance of understanding who might be on the other side of that transaction. Obviously, there are certain use cases where that may be more useful than others. But I think you can make a pretty convincing argument that no matter what other information you're requesting, the ability to with a fairly high degree of certainty have assurance around whether you've seen this browser before, and what session it was associated with. It is really, really helpful for wrapping your head around who your customers are, and delighting your good users, while confounding the risky users. 

It seems like from that perspective, the big challenges that are facing many of the platforms that we speak with at OWI are around how to balance the level of friction that you're presenting your customers with that level of assurance you're getting. Is it fair to say that there is essentially a complete transparency to the end user, they essentially have no idea that any sort of data is being used to create this browser fingerprint? It requires no interaction on the user's part, correct?

#### DAN:

Yeah, that's correct. And that's basically one of the key benefits of our technology. So if you wanted to completely lock down your website and make it so that only customers that verify their email address, and their phone number, completed a two factor authentication, username and password is there, you can definitely do that. And that's not really the type of customers that we work with. 

The types of customers that we do especially well with are the ones that understand that there's a balance between user friction and security. So you don't want to lock the system too much, because then you're going to lock out your less tech-savvy users, or your users that have a weaker intent during their current session. But you also don't want to fully open it up, because then you open the floodgates to malicious actors doing bad things on your website. So for all of our customers, there's always the balance between the two. 

Discovering this balance has actually been a great learning experience in building the startup. In the beginning, we were very focused on “catching the bad actor” only: we can help you catch this person that's going to break into other people's accounts, or put in stolen credit cards, etc. But what we learned was that for a lot of businesses, especially the more sophisticated businesses, they think about the friction just as much as the security aspect. So they wanted a solution that can be very seamless for a customer where they don't have to take any more steps, but at the same time catch significantly more malicious users. And that's exactly where we've come in. 

So on that login page or that credit card checkout process, we're running fingerprinting in the background, very seamlessly without the customer even noticing and providing that intelligence to our customer. That way they can make sure that they can keep their customers happy and also reduce any bad events from happening in the future.

#### CAMERON:

It's a really powerful technology. I think the main question I have for you around the technology side before we kind of get into use cases is how has this push around securing what data plugins can extract from browsers. Apple has had a data privacy push, and Google has been tightening up some of the APIs that devs have access to as well. How has that impacted your ability to uniquely identify browsers? And do you expect this to be a major challenge for you moving forward?

#### DAN:

Yeah, so it's definitely been interesting. It's kind of a double edged sword. From a technical perspective, there's also a legal perspective to data collection, but we can talk about that separately. From the technical side, whenever a browser makes a change to something, it does make it more challenging for us to be able to pull information to be able to generate fingerprints. But usually what happens is that they’ve also introduced something else around the same time that we can use. 

So for example, one of the recent upgrades for TLS closed off some techniques that we were able to use, but it opened up significantly more techniques for us to be able to uniquely identify someone coming to a website. So those kinds of things we expect will continue in the future. So certain techniques will be around for 18 months. And because we're doing continuous R&D, we keep finding new techniques and keep integrating those into our platform to keep our accuracy as high as possible. 

But the reason that it's a double edged sword is that it actually benefits us because it creates a niche for us, as you can imagine. Even large technical businesses don't have the teams necessary to keep doing research into browsers and keep staying up to date with what techniques can you use to uniquely identify someone coming from your website to reduce fraud. So that's where we come in. By not focusing on creating a platform, but instead focusing on deep technical analysis for how to generate fingerprints, we can provide the highest accuracy identifier for businesses to integrate into their platforms, and then provide that value to their customers or use it directly for themselves. So it's actually been great for us. 

In addition, our developers actually love it. Because you don't want to have a very stagnant technological product, they love doing additional research, figuring out ways that browsers work and new features that were just introduced to a browser. We use that research to figure out how can better detect and prevent fraud for our customers.

#### CAMERON:

Shifting the lens to the customers, in terms of industry verticals, I would be curious to know  where you think you've seen the greatest uplift from platforms utilizing your technology. Have you seen success in terms of directly integrating with end platforms that are facing consumers directly? Or are you taking more of a channel partnership route, where you're embedded within other identity vendors that are maybe solving some of those, for example, legal identity challenges? Curious to hear how you're tackling those go-to-market questions.

#### DAN:

Yeah, so we're pretty agnostic around who's using us other than some of the legal issues. We only do first party tracking, we don't do any third party tracking. So we don't work with any adtech customers, for example. But beyond that, as long as somebody is trying to do some kind of first party tracking for the purposes of anti-fraud or security, we work with them. 

As far as partners and working directly, again, we don't have any preferences, we allow anyone to use the service, again, within whatever legal restrictions there are. And it really comes down to the value and how the customer can use it. 

Usually the customers that use us directly are more technically savvy, so tech startups or larger tech businesses. And then there are definitely some platforms using us as well. There's a lot of anti-fraud platforms using our technology, where the value that they provide for their customers is the set of rules and everything on top of our identification technology, while we focus on the identification aspect. So a way to think about that is in the anti-fraud space, the anti-fraud, large providers provide the car, and then we provide the engine for the car. It’'s beneficial for everyone to be working together as the end customer gets a much better car, in this case, better anti-fraud technology, by using the better engine or in our case, the browser frame printing technology. So from our perspective, it's fine for us to work with anyone in the space, as long as they see and understand the value of browser fingerprinting and what we can provide for them.

#### CAMERON:

And from a vertical perspective, are there any verticals that you've seen that have become particularly excited about this technology? I mean, from my perspective, it feels fairly applicable to just about every use case, whether it's financial services, online to offline platforms, sharing economy, e-commerce, you name it. We're big believers in that everyone needs digital identity and digital identity kind of underpins every market segment, but have you seen specific use cases that have really popped in terms of where adoption has been highest?

#### DAN:

Yeah. So as far as we've run the business, so far, it's been all inbound leads coming in. So we really only work with customers that are experiencing some kind of problem today that they need to solve. And we've seen that there's two main categories of problems in which there's many different industries within that. 

The first one is industries that have high value targets. So cryptocurrency platforms use us a lot, as well as banking use cases. Anything where if you break into someone's account, there's a high value that can accrue to the malicious actor that's trying to break into the account. 

There’s also high volume platforms where they have so much data coming in that their existing methods are not effective enough at preventing fraudulent activity, like stolen credit cards or other credit card related fraud techniques from happening on their platforms. And then that's where we come in with a passive approach. Our technology doesn't slow down the velocity at all of any of the transaction volume that they're receiving. But they get an additional really high value identifier from us that they can use to detect malicious actors. 

So for example, we have a lot of customers that sell some kind of online product that they don't want to increase the friction at all for because it's something like let's say, a minecraft server where you're selling small packages, or digital goods of some kind. And in that case, they have a high rate of what's called credit card testing attacks, where malicious actors test credit cards that they stole or bought on the dark web, and they want to see if it works first. Then after they successfully see if it works, they can try it on another platform where they can actually steal something of higher value. So those customers with a high velocity very much will benefit from using our technology, because they don't need to do anything different. They install our fingerprinting solution, and then they can look at the identifiers and detect, okay, wait a second, these 20 different accounts are actually connected by this one fingerprint. And we didn't notice it before, because the VPN allowed them to change their IP address, they cleared their cookies, they did all the typical techniques. But with our identifier, we're able to actually tie those together, and then they can stop those malicious attacks from continuing.

#### CAMERON:

That's really interesting. When it comes to how digital identity fits into the stack of companies that we work with, I think folks get pigeonholed a little bit around this notion of kind of legal identity being tied into it or the fact that they may not need to scan a driver's license for my platform, and therefore I don't have a use for digital identity. Digital identity, I think is all encompassing and includes just as many of these questions around, have I seen this device before, and can I trust it just as much as for example, I need Dan Pinto’s legal identity. So I think it's really, really cool that you guys are building this. 

Is it still the case that if I want to implement a freeware version of this plugin that I can do that without engaging you guys on the product side? However if I want the more robust version, with more support from your team on the engineering side and more features, then I can engage you  to purchase the Cadillac version, is that a fair assessment?

#### DAN:

Yeah. Because of the stage of startup that we're at, we're going for maximum adoption, so we have two different free versions of the product that you can use. There's the completely free open source products, where you have to build everything yourself. It's fully available on GitHub, and you can use the code in whatever way you want, but you'll have to build all of the additional pieces that we've built for the professional version. Additionally, because we really want to incentivize developers to come in and use our technology and build cool stuff with it, we also have a free forever tier of our professional version where you can use up to 1000 unique fingerprints per month. This is ideal for any kind of small service, where developers can build something from that, and then use it indefinitely until they reach a much larger scale. And then they can consider whether to use the professional version. 

The professional version is just like the typical SaaS pay-per-fingerprint type product where you can get the full value. But the free developer tier also gets you the full accuracy, just with the limitation for how many unique fingerprints you can use in a month.

#### CAMERON:

That's very cool. Now let’s take a slight step back to some more technical minutiae. I want to make sure for my own edification I'm understanding this fully. Would you say it is a one-to-one fingerprinting or a one-to-many in the sense that are you looking to see whether am I the same person who kind of came in previously, or can I identify a browser who came in from that fingerprint, and then you see back in time, okay, I've seen this person 10 times previously, and can tie that back to all their previous sessions?

#### DAN:

Yeah, so typically, our customers aren't necessarily benefiting from the historical data for multiple instances. Like they don't do anything different. If this person came back 10 times or one time, it's more important to just verify whether this browser came back compared to a previous time when they first signed up, or when they completed a previous action. So that's usually what people are doing.

There are situations though, where people do look at the entire history when they're trying to detect more sophisticated types of fraud. So that's usually more common for our payment processing customers where they want to take one fingerprint and look at its history on one account, or across many different accounts to try and detect patterns of bad behavior. So when somebody is trying to test stolen credit cards, they don't test it on one account, they test it across multiple accounts, multiple IP addresses, different browsers, clearing cookies, etc. So using our technology, they're able to create a web, usually in some kind of graph database, to connect all of the different pieces of data that they have. Our identifier is one of the key linchpins for that, where they can tie those interactions together in ways that they couldn't do before. So, in the old days, using IP address alone was enough to be able to detect these things. But now it's so easy to change your IP address that you need a much higher level of accuracy, which you can get from our technology.

#### CAMERON:

Very cool. So, Dan, in terms of the potential legal or regulatory impact from continued privacy pushes, do you expect this to have an impact on your ability to kind of get the attributes that you need to feed your model and really make these determinations to the same high degree of accuracy that you become used to?

#### DAN:

Yes, that's a great question, we get that question a lot. So the short answer is basically no, because the way that the laws have been written, and the way the privacy changes typically go, they're actually great for consumers, and great for anti fraud use cases, all of the legal frameworks and ways that people are thinking about it do take into consideration anti-fraud use cases. So it hasn't been a problem at all. 

We've been privacy first since the very early days of the business. GDPR had already come out by the time that we started working on our first version of the technology. So we knew going into it what we had to do to make sure that both the technology was safe for consumers to use and great for our customers to get full transparency and legal coverage for using our technology to solve anti-fraud problems. 

The key thing to understand is that in GDPR and other similar regulations, there's always a carve out for legitimate interest. Legitimate interest can be interpreted in many different ways, but almost all of the use cases that we specialize in fall into that category. So things like security and anti-fraud, there are clear requirements for running a safe website that you can carve out, and there is no restriction within how you can use our technology for those use cases. For marketing use cases, you have to get consent under GDPR. But for preventing fraud, you don't necessarily need to get consent. 

Most of our customers put some kind of wording in their privacy policy saying that they're using fingerprinting, but that it falls under legitimate interest. So it actually is great. And we actually have leaned into it a lot. We put in all of our marketing that we're GDPR and CCPA compliant, and it's a very common question that we get from our customers. And I would think that if it hadn't been for these legislations, it would actually be harder for us to get into these organizations. Now it's much easier because they can ask us, how are you going to handle my customers’ data privacy? And we can say we're fully compliant with all these laws. So it actually makes the entire process much smoother for people to use our technology.

#### CAMERON:

Dan, before we go, I want to ask you, I guess what's become my signature podcast question, which is for some crystal ball predictions. As a technologist and someone who has their finger on the pulse of the latest and greatest in the space, I would love to hear directly from you what your thoughts are and what we can expect to see over the next year or two in the digital identity space. I won't tailor it much more down than that - will give you carte blanche to kind of throw some fun and exciting ideas out there. And we don't grade these too harshly - there's no annual review of whose predictions were good and whose were bad. We just like folks to have fun with it. So don't feel too much pressure.

#### DAN:

Yeah, no problem. Yeah, definitely predicting the future is very hard. One of the benefits, though, in our space, and the stage of startup that we're at right now, is that because we are so early in our journey, and we focus on an API driven approach and focus on developers, we're actually at the forefront of these technological changes. So by just looking at who signs up to our website, and how they're using the technology, we can kind of see what our bigger company is going to do in two to three years. And there's been a number of interesting things that we've seen, from how people are using the technology and what problems they're solving, that I think gives us a little bit of insight into that future. 

The biggest theme of all these different changes is the shifts in the world economy that have been accelerated because of COVID, and  the need to work from home. We've seen a lot more issues with our customers where they don't really know where somebody is working from, whether they're a valid employee, whether they're a valid customer, or whether the device belongs to a certain company, that was much easier to determine before when everybody's coming from the same office. In the old world, there was a lot of easy things that you could check to verify someone's identity for the purposes of preventing fraud. Because if everyone is working in the same office, they'll have the same external IP address, and you won't be able to tell. But as soon as everybody starts to work from home, everyone has different IP addresses. And it's easier for malicious people to hide due to that. There are services that you can get online, usually for like crawling purposes, but sometimes people use it for fraud purposes, where you can get residential IP addresses inside of the United States. Ways to prevent attacks from those environments in the past was, you just wouldn't allow residential IP addresses or you would set up like a tunneling VPN for your employees or something like that. But now it's much more challenging because everyone is working more dynamically from home from different places, and everything's web based. So that's basically the main shift that we've seen. So a lot of our customers didn't need to verify as much in the past and didn't see as many attacks from different places in the past, where now they're starting to see that. So they need some kind of identifier that didn't exist before, or they didn't need before.

What we've seen is that our adoption has really gone up because of these changes. During COVID, it was kind of an atypical path for us relative to the ecomy, because instead of our company struggling because of it, it actually got stronger, because so much moved online. And there were significantly more attacks as a result of that. So we saw tons of signups of people that two years before would not even be thinking about the problems that they're solving now with our technology. And when they researched browser fingerprinting and saw that we were the best solution for that, they started using it and they solved their problems immediately. So it's been very exciting to see that happen and I think it's just going to continue further. 

So that tip of the iceberg that we're seeing so far, in terms of businesses coming in signing up for services to solve those work-from-home and digital-first problems, is only going to continue. And we're going to see a lot more businesses, especially bigger ones that are moving a little bit more slowly. But we are starting to see larger businesses need to solve these problems, that smaller nimble businesses have already dealt with. Once that happens, they'll come to our technology.

#### CAMERON:

I couldn't agree more with you, I think you've really hit the nail on the head when it comes to the evolving needs around digital identity, and specifically, the demand to do so again, without layering on a bunch of incremental friction. When you think about it hard enough, it's possible to get, if not perfect security, close to perfect security. And part of the reason why you'd be able to get that perfect security would be layering so much friction on the users of your platform that you know, only one or two of them show up. And this offers a way forward. That really mitigates a lot of that downside while preserving your upside tremendously. And a consumer-centric focus on how we can engage with good customers in the best possible way without burdening them and enabling growth just as much as we are stopping fraud and mitigating risk. I think this is the narrative that's really top of mind for us as an organization in 2021 and beyond. And so, really excited to watch what you do next. And please don't stay a stranger - we would love to have you back on the podcast and circle back on some of these predictions sometime in the next year. 

But before we wrap up today, for folks who are listening who want to get access to you and your team and implement Fingerprint, what's the best place for them to go to learn more to get in touch?

#### DAN:

Yeah, sure. So, we're a completely open company in terms of documentation and ability to use our service. So the best thing to do would be to go to [fingerprint.com](). Start on the homepage, take a look at different use cases on there, read about how our technology can be used, and then read through our documentation. And you'll basically be able to see everything about how our technology works, how to use it, how to implement it. That's basically the approach that we follow.

#### CAMERON:

Fantastic, Dan, I will also include a link to your website in the show notes below. Definitely check that out if any of this conversation intrigued you. 

Thank you again for your time. So great to chat with you and hope to talk to you again soon!

#### DAN:

Thank you.