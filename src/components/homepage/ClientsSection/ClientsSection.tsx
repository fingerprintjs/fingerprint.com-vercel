import React from 'react'
import Section from '../../common/Section'

import { ReactComponent as CoinBaseSVG } from '../../../../static/img/company-logos/coinbase.svg'
import { ReactComponent as UsBankSVG } from '../../../../static/img/company-logos/us-bank.svg'
import { ReactComponent as AmeritradeSVG } from '../../../../static/img/company-logos/ameritrade.svg'
import { ReactComponent as WesternUnionSVG } from '../../../../static/img/company-logos/western-union.svg'
import { ReactComponent as BookingSVG } from '../../../../static/img/company-logos/booking.svg'
import { ReactComponent as AgodaSVG } from '../../../../static/img/company-logos/agoda.svg'
import { ReactComponent as HomeCreditSVG } from '../../../../static/img/company-logos/home-credit.svg'
import { ReactComponent as RockstarSVG } from '../../../../static/img/company-logos/rockstar.svg'
import { ReactComponent as YahooSVG } from '../../../../static/img/company-logos/yahoo.svg'
import { ReactComponent as TargetSVG } from '../../../../static/img/company-logos/target.svg'
import { ReactComponent as Upstar } from '../../../../static/img/company-logos/upstar.svg'

import styles from './ClientsSection.module.scss'
import { repeatElement } from '../../../helpers/repeatElement'
import classNames from 'classnames'

export default function ClientsSection() {
  return (
    <Section className={styles.root}>
      <div className={styles.marquee}>
        <LogosRow />
        <LogosRow />
      </div>
    </Section>
  )
}

function LogosRow() {
  return (
    <div className={styles.logos}>
      {repeatElement(2, () => (
        <>
          <CoinBaseSVG className={classNames(styles.logo, styles.coinbase)} />
          <UsBankSVG className={classNames(styles.logo, styles.usBank)} />
          <AmeritradeSVG className={classNames(styles.logo, styles.ameritrade)} />
          <WesternUnionSVG className={classNames(styles.logo, styles.western)} />
          <BookingSVG className={classNames(styles.logo, styles.booking)} />
          <AgodaSVG className={classNames(styles.logo, styles.agoda)} />
          <HomeCreditSVG className={classNames(styles.logo, styles.homeCredit)} />
          <RockstarSVG className={classNames(styles.logo, styles.rockstar)} />
          <YahooSVG className={classNames(styles.logo, styles.yahoo)} />
          <TargetSVG className={classNames(styles.logo, styles.target)} />
          <Upstar className={classNames(styles.logo, styles.upstar)} />
        </>
      ))}
    </div>
  )
}
