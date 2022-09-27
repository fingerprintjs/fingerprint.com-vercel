import React from 'react'
import IntegrationCard, { IntegrationCardProps } from '../IntegrationCard/IntegrationCard'

import styles from './IntegrationCards.module.scss'

export interface IntegrationCardsProps {
  cards: IntegrationCardProps[]
}
export default function IntegrationCards({ cards }: IntegrationCardsProps) {
  return (
    <div className={styles.integrationCards}>
      {cards.map(({ title, description, cardImage, docsLink, githubLink }) => (
        <IntegrationCard
          key={title}
          title={title}
          description={description}
          cardImage={cardImage}
          docsLink={docsLink}
          githubLink={githubLink}
        />
      ))}
    </div>
  )
}
