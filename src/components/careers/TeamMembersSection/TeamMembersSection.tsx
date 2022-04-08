import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './TeamMembersSection.module.scss'

import { ReactComponent as WorldSVG } from './WorldSVG.svg'
import { ReactComponent as LabelSVG } from './LabelSVG.svg'

export interface TeamMembersSectionProps {
  pacificAmerica: number
  mountainAmerica: number
  centralAmerica: number
  easternAmerica: number
  westernEurope: number
  southeastEurope: number
  centralEurope: number
  easternEurope: number
  northeastEurope: number
  eastAsia: number
  southAmericaNorth: number
  southAmericaSouth: number
}

export default function TeamMembersSection({
  pacificAmerica,
  mountainAmerica,
  centralAmerica,
  easternAmerica,
  westernEurope,
  southeastEurope,
  centralEurope,
  easternEurope,
  northeastEurope,
  eastAsia,
  southAmericaNorth,
  southAmericaSouth,
}: TeamMembersSectionProps) {
  const totalMembers =
    pacificAmerica +
    mountainAmerica +
    centralAmerica +
    easternAmerica +
    westernEurope +
    southeastEurope +
    centralEurope +
    easternEurope +
    northeastEurope +
    eastAsia +
    southAmericaNorth +
    southAmericaSouth

  const labelNumber = Math.floor(totalMembers / 10) * 10

  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div className={styles.box}>
          <header className={styles.header}>
            <div className={styles.label}>
              <p className={styles.labelText}>
                {labelNumber}+ team
                <br />
                members
              </p>
            </div>
            <h3 className={styles.headerTitle}>We are global</h3>
            <p className={styles.headerDescription}>
              We are a remote-first and globally distributed team that works from our own time zones. From LA to Toronto
              to St. Petersburg, you can join our team from anywhere in the world!
            </p>
          </header>
          <div className={styles.worldSection}>
            <WorldSVG className={styles.world} />
            <ZoneMembers
              pacificAmerica={pacificAmerica}
              mountainAmerica={mountainAmerica}
              centralAmerica={centralAmerica}
              easternAmerica={easternAmerica}
              westernEurope={westernEurope}
              southeastEurope={southeastEurope}
              centralEurope={centralEurope}
              easternEurope={easternEurope}
              northeastEurope={northeastEurope}
              eastAsia={eastAsia}
              southAmericaNorth={southAmericaNorth}
              southAmericaSouth={southAmericaSouth}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ZoneMembers({
  pacificAmerica,
  mountainAmerica,
  centralAmerica,
  easternAmerica,
  westernEurope,
  southeastEurope,
  centralEurope,
  easternEurope,
  northeastEurope,
  eastAsia,
  southAmericaNorth,
  southAmericaSouth,
}: TeamMembersSectionProps) {
  return (
    <div>
      <div className={styles.pacific}>
        <MembersLabel members={pacificAmerica} />
      </div>
      <div className={styles.mountain}>
        <MembersLabel members={mountainAmerica} />
      </div>
      <div className={styles.central}>
        <MembersLabel members={centralAmerica} />
      </div>
      <div className={styles.eastern}>
        <MembersLabel members={easternAmerica} />
      </div>
      <div className={styles.westernEurope}>
        <MembersLabel members={westernEurope} />
      </div>
      <div className={styles.southeastEurope}>
        <MembersLabel members={southeastEurope} />
      </div>
      <div className={styles.centralEurope}>
        <MembersLabel members={centralEurope} />
      </div>
      <div className={styles.northeastEurope}>
        <MembersLabel members={northeastEurope} />
      </div>
      <div className={styles.easternEurope}>
        <MembersLabel members={easternEurope} />
      </div>
      <div className={styles.eastAsia}>
        <MembersLabel members={eastAsia} />
      </div>
      <div className={styles.southAmericaNorth}>
        <MembersLabel members={southAmericaNorth} />
      </div>
      <div className={styles.southAmericaSouth}>
        <MembersLabel members={southAmericaSouth} />
      </div>
    </div>
  )
}

interface MembersLabelProps {
  members: number
}
function MembersLabel({ members }: MembersLabelProps) {
  return members > 0 ? (
    <div className={styles.member}>
      <LabelSVG className={styles.memberIcon} />
      <p className={styles.memberNumber}>{members}</p>
    </div>
  ) : null
}
