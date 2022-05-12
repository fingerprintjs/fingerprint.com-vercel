import React from 'react'
import Section from '../common/Section'
import Container from '../common/Container'
import styles from './ClientsSection.module.scss'
import { ReactComponent as EbaySVG } from '../../../static/img/company-logos/ebay.svg'
import { ReactComponent as TargetSVG } from '../../../static/img/company-logos/target.svg'
import { ReactComponent as UsBankSVG } from '../../../static/img/company-logos/us-bank.svg'
import { ReactComponent as BookingSVG } from '../../../static/img/company-logos/booking.svg'
import { ReactComponent as AmeritradeSVG } from '../../../static/img/company-logos/ameritrade.svg'
import { ReactComponent as HsnSVG } from '../../../static/img/company-logos/hsn.svg'
import { ReactComponent as AgodaSVG } from '../../../static/img/company-logos/agoda.svg'
import { ReactComponent as BAndHSVG } from '../../../static/img/company-logos/b_and_h.svg'
import { ReactComponent as CoinBaseSVG } from '../../../static/img/company-logos/coinbase.svg'
import { ReactComponent as HomeCreditSVG } from '../../../static/img/company-logos/home-credit.svg'
import { ReactComponent as RockstarSVG } from '../../../static/img/company-logos/rockstar.svg'
import { ReactComponent as CheckoutSVG } from '../../../static/img/company-logos/checkout.svg'
import { ReactComponent as WesterUnionSVG } from '../../../static/img/company-logos/western-union.svg'
import { ReactComponent as YahooSVG } from '../../../static/img/company-logos/yahoo.svg'

export default function ClientsSection() {
  return (
    <Section className={styles.clients}>
      <Container size='large'>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <strong>Fingerprint</strong> is trusted by public companies and innovative startups.
          </h2>
        </header>
        <div className={styles.content}>
          <CompanyLogo icon={EbaySVG} />
          <CompanyLogo icon={TargetSVG} />
          <CompanyLogo icon={UsBankSVG} />
          <CompanyLogo icon={BookingSVG} />
          <CompanyLogo icon={AmeritradeSVG} />
          <CompanyLogo icon={HsnSVG} />
          <CompanyLogo icon={AgodaSVG} />
          <CompanyLogo icon={CoinBaseSVG} />
          <CompanyLogo icon={BAndHSVG} />
          <CompanyLogo icon={HomeCreditSVG} />
          <CompanyLogo icon={RockstarSVG} />
          <CompanyLogo icon={CheckoutSVG} />
          <CompanyLogo icon={WesterUnionSVG} />
          <CompanyLogo icon={YahooSVG} />
        </div>
      </Container>
    </Section>
  )
}

interface CompanyLogoProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}
function CompanyLogo({ icon: Icon }: CompanyLogoProps) {
  return (
    <span className={styles.slide}>
      <Icon className={styles.logo} />
    </span>
  )
}
