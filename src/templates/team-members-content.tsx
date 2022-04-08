import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

import PreviewProviders from '../cms/PreviewProviders'
import TeamMembersSection from '../components/careers/TeamMembersSection/TeamMembersSection'

export function TeamMembersContentPreview({ entry }: PreviewTemplateComponentProps) {
  const teamMembers = {
    pacificAmerica: entry.getIn(['data', 'pacificAmerica']) as number,
    mountainAmerica: entry.getIn(['data', 'mountainAmerica']) as number,
    centralAmerica: entry.getIn(['data', 'centralAmerica']) as number,
    easternAmerica: entry.getIn(['data', 'easternAmerica']) as number,
    westernEurope: entry.getIn(['data', 'westernEurope']) as number,
    southeastEurope: entry.getIn(['data', 'southeastEurope']) as number,
    centralEurope: entry.getIn(['data', 'centralEurope']) as number,
    northeastEurope: entry.getIn(['data', 'northeastEurope']) as number,
    eastAsia: entry.getIn(['data', 'eastAsia']) as number,
    easternEurope: entry.getIn(['data', 'easternEurope']) as number,
    southAmericaNorth: entry.getIn(['data', 'southAmericaNorth']) as number,
    southAmericaSouth: entry.getIn(['data', 'southAmericaSouth']) as number,
  }

  return (
    <PreviewProviders>
      <TeamMembersSection {...teamMembers} />
    </PreviewProviders>
  )
}
