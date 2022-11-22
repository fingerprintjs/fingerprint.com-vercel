---
templateKey: long-form-content
metadata:
  title: Why Social Engineering Attacks Are Successful with Technical Staff
  url: www.fingerprint.com/blog/why-social-engineering-attacks-are-successful-with-technical-staff
  image: /img/uploads/the-basics-of-social-engineering-examples-and-prevention.jpg
  socialImage: /img/uploads/the-basics-of-social-engineering-examples-and-prevention.jpg
  description: No one is safe from social engineering - even the most tech-savvy
    professionals. Learn how cyber attackers are using new methods to trick
    users into giving personal or confidential information.
  imageAlt: Social Engineering Keyboard
  imageTitle: Social Engineering Keyboard
featured: true
publishDate: 2022-10-13T14:00:01.957Z
title: Why Social Engineering Attacks Are Successful with Technical Staff
isPublished: true
isHidden: false
tags:
  - leak
  - account takeover
authors:
  - Jennifer Marsh
heroImage:
  image: /img/uploads/the-basics-of-social-engineering-examples-and-prevention.jpg
  imageTitle: Why Social Engineering Attacks Are Successful with Technical Staff
customCTA:
  openCtaNewTab: false
  title: ""
---
Many organizations focus on data protection from outside attacks but fail to realize that many threats happen from within. Insider threats can be malicious or innocent mistakes; however, social engineering is a common factor among both types. You'd expect untrained employees unfamiliar with cyber-attacks to fall victim to social engineering. 

Still, the technical staff (e.g., engineers, security people) are also a target and occasionally fall victim to it. Social engineering is effective because companies rely entirely on their employees' ability to detect it. Even the most cyber-savvy individuals can have a mishap, usually from being busy, stressed, tired, or simply forgetting to take a minute to ask questions.

In September 2022, Uber's private network was [breached by a teenage attacker](https://www.entrepreneur.com/business-news/the-latest-uber-hacker-was-reportedly-a-teenager/435693) who used social engineering methods to gain secure information from an engineer. It started with a simple text message asking an engineer to divulge their credentials. The teenager posed as a people operations employee supporting Uber's infrastructure. After tricking the engineer into sending their credentials, the teenage attacker added their device to the two-factor authentication (2FA) system. Most 2FA systems that use push notifications require validation before adding a new device to a user's account. The teenage attacker spammed notifications to the engineer and then sent a social engineering message telling the engineer to accept them to get the messages to stop. The engineer obliged, allowing the attacker to access Uber's private network.

The attacker scanned the network for sensitive information and found PowerShell scripts with hardcoded administrator credentials. From there, the attacker had access to various data-driven storage that held Uber's intellectual property. This recent story is just one example of how social engineering can successfully trick tech-savvy individuals.   

## The Four Phases in Social Engineering

Attempts seem to choose targets indiscriminately, but social engineering is performed using four distinct phases. Arguably, the most crucial phase is the last one – closure – to avoid letting the victim sense that they've been tricked. Leaving the victim unaware gives the attacker more time to exfiltrate data.

### Here are the four phases:

#### Reconnaissance 

A successful social engineering attack is performed only after research into the target. Various social media sites, including LinkedIn, are useful for attackers to gain insight into the organization hierarchy and who would be a great high-privilege target. Most organizations are unaware of the wealth of knowledge available from employees that post their interests, titles, work projects, company interests, coworkers, and events. It could take weeks for an attacker to complete reconnaissance, but it's effective and finding the perfect target.

#### Engagement 

The next step is to contact the targeted victim. If the first target identifies the contact message as malicious, it could ruin the attack. The attacker might wait to try again later or choose a new target. Phishing is often a component in engagement to steal credentials for future account takeover.

#### Exploitation 

With stolen credentials, it's now time to compromise the targeted organization. It could require additional steps, illustrated in the Uber data breach. If the first two phases are successful, an attacker will exploit the system, exfiltrate data, install malware, or monitor the network for future attack potential.

#### Closure 

Again, this is arguably the most crucial phase. After contacting the target, the attacker must drop the conversation without allowing the target to realize what just happened. At this point, victims must recognize what happened to minimize damage and alert the right people to remediate the issue.

## Social Engineering Targets the Human Element

The weakest link in your organization is the human element. Sometimes, the weakest link is employees who think they are invulnerable to social engineering and phishing attacks. These employees are always targets based on their high-privilege access to sensitive data. They have access to code repositories, administrative controls, trade secrets, databases, and possibly customer data. 

Cyber-attacks can target security researchers, network administrators, executives, and other employees. Like the Uber compromise, it only takes one employee to fall for an attack for a company to lose multiple files, large amounts of data, trade secrets, and intellectual property. Spear phishing and social engineering are more effective than most organizations realize.

Cyber-defense requires that the target identifies social engineering for what it is – an attack to gain access to the internal network. As much as organizations train for it, anyone can have a weak moment and let their guard down. This results in a successful social engineering attack that can lead to months of undetected malware, backdoors, and continual exfiltration of data.

## What Can Be Done to Stop a Social Engineering Attack?

The trick to stopping social engineering is to educate users, but many engineers and cybersecurity people already know how an attack works. For these people, the most significant advice is to stop and think before clicking a link. Does the link point to a web page that asks for credentials? If yes, then avoid entering credentials and ask questions. Research the request, and there is a good chance you'll figure out it is social engineering.

Any information publicly posted on social media can be used to gather intelligence on your job and potential authorized access, making you a target for social engineering. Be wary of posting anything too personal on social media, including LinkedIn. LinkedIn is one of the best ways to perform reconnaissance on your job title and function, your bosses, and any executives overseeing infrastructure to get your business information. 

Email spoofing is common in social engineering and phishing, so organizations should have email filters installed to stop most messages from reaching the intended targeted victim. These systems use various email validation using DNS and signatures to identify a forged message, which catches most spoofed emails standard in attacks. Even with email security in place, it's still necessary to be alert whenever you receive a request for information.

Finally, organizations should work with technology to detect and stop credential theft. No amount of education and training eliminates the risk of credential theft. Organizations need failover to take precautions in case of credential theft from a successful social engineering attack. After an attacker steals credentials, the next step is to attempt authentication across various resources. 

With Fingerprint, developers can code fail-safe systems into their applications to detect and block authentication attempts. Credential theft still creates a security incident that should be investigated. Integrating Fingerprint into an application will stop brute-force attacks and account takeover botted scans against the web application. It also adds a layer of protection to stop the next exploit phase in social engineering.

To get started with credential stuffing prevention and phishing attacks, check out Fingerprint's [account takeover solution](https://fingerprint.com/account-takeover/) or try out our [demo application](https://fingerprint.com/demo/).