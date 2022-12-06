import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as GithubSVG } from './github.svg'
import { ReactComponent as LinkedInSvg } from './linkedin.svg'
import { ReactComponent as TwitterSvg } from './twitter.svg'
import { ReactComponent as SOC2_SVG } from '../../img/SocSVG.svg'
import { ReactComponent as CCPA_SVG } from '../../img/CcpaSVG.svg'
import { ReactComponent as GDPR_SVG } from '../../img/GdprSVG.svg'

import { ReactComponent as SOC2_DARK_SVG } from '../../img/SocDarkSVG.svg'
import { ReactComponent as CCPA_DARK_SVG } from '../../img/CcpaDarkSVG.svg'
import { ReactComponent as GDPR_DARK_SVG } from '../../img/GdprDarkSVG.svg'

import { ReactComponent as FpjsSVG } from '../../../static/img/company-logos/fpjs.svg'

import SubscribeNewsletterForm from '../SubscribeNewsletterForm/SubscribeNewsletterForm'
import { Forms } from '../../hooks/useForm'

import Container from '../common/Container'
import styles from './Footer.module.scss'
import { solutions, platform, developers, resourcesDropdown } from '../../constants/content'
import { PATH, URL, DOC_URL, MAILTO } from '../../constants/content'
import classNames from 'classnames'

interface FooterLinkSection {
  title: string
  links: { title: string | React.ReactNode; url: string; isLocal?: boolean }[]
}

const footerLinks: FooterLinkSection[] = [
  {
    title: 'Solutions',
    links: solutions,
  },
  {
    title: 'Platform',
    links: platform,
  },
  {
    title: 'Developers',
    links: developers,
  },
  {
    title: 'Resources',
    links: resourcesDropdown,
  },
  {
    title: 'Company',
    links: [
      {
        title: (
          <>
            Careers
            <div className={styles.labelWrapper}>
              <span className={styles.label}>We&lsquo;re hiring</span>
            </div>
          </>
        ),
        url: `${PATH.careers}`,
        isLocal: true,
      },
      {
        title: 'System Status',
        url: `${URL.statusUrl}`,
      },
      {
        title: 'Support',
        url: `${PATH.support}`,
        isLocal: true,
      },
      {
        title: 'Login',
        url: `${URL.dashboardLoginUrl}`,
      },
      {
        title: 'Privacy Policy',
        url: `${DOC_URL.privacyPolicyUrl}`,
      },
    ],
  },
]

interface FooterProps {
  darkVariant?: boolean
}
export default function Footer({ darkVariant }: FooterProps) {
  return (
    <footer className={classNames(styles.footer, { [styles.dark]: darkVariant })}>
      <Container size='large' className={styles.navContainer}>
        <nav className={styles.nav}>
          <section className={styles.links}>
            {footerLinks.map(({ title, links }) => {
              return (
                <div key={title} className={styles.menu}>
                  <h3 className={styles.title}>{title}</h3>
                  {links.map(({ title, url, isLocal }) => {
                    return isLocal ? (
                      <Link className={styles.link} key={url} to={url} target='_blank' rel='noreferrer'>
                        {title}
                      </Link>
                    ) : (
                      <a className={styles.link} key={url} href={url} target='_blank' rel='noreferrer'>
                        {title}
                      </a>
                    )
                  })}
                </div>
              )
            })}
          </section>
          <section className={styles.logos}>
            <div className={styles.newsLetter}>
              <h3 className={styles.title}>Subscribe to our newsletter</h3>
              <p className={styles.description}>Get updates about company news and new features of Fingerprint Pro.</p>
              <SubscribeNewsletterForm
                size='big'
                variant={darkVariant ? 'dark' : 'white'}
                origin={Forms.NewsletterFooter}
              />
            </div>
            <div className={styles.soc2Logo}>
              {darkVariant ? (
                <>
                  <SOC2_DARK_SVG />
                  <CCPA_DARK_SVG />
                  <GDPR_DARK_SVG />
                </>
              ) : (
                <>
                  <SOC2_SVG />
                  <CCPA_SVG />
                  <GDPR_SVG />
                </>
              )}
            </div>
          </section>
        </nav>
      </Container>
      <Container size='large' className={styles.contactContainer}>
        <section className={styles.contact}>
          <FpjsSVG className={styles.fpjsLogo} />
          <address className={styles.address}>
            1440 W. Taylor St #735, Chicago, IL 60607, USA
            <a className={styles.mailto} href={MAILTO.mailToUrl}>
              support@fingerprint.com
            </a>
          </address>
        </section>
        <section className={styles.social}>
          <div className={styles.copyrights}>&copy; 2022 FingerprintJS, Inc</div>

          <ul className={styles.links}>
            <li className={styles.link}>
              <a href={URL.githubRepoUrl} target='_blank' rel='noreferrer' aria-label='GitHub link'>
                <GithubSVG />
              </a>
            </li>
            <li className={styles.link}>
              <a href={URL.linkedinUrl} target='_blank' rel='noreferrer' aria-label='LinkedIn link'>
                <LinkedInSvg />
              </a>
            </li>
            <li className={styles.link}>
              <a href={URL.twitterUrl} target='_blank' rel='noreferrer' aria-label='Twitter link'>
                <TwitterSvg />
              </a>
            </li>
          </ul>
        </section>
      </Container>
    </footer>
  )
}
