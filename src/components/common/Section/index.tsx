import React from 'react'
import classNames from 'classnames'

import styles from './Section.module.scss'

export interface SectionProps {
  children: React.ReactNode
  className?: string | string[]
}
export default function Section({ children, className }: SectionProps) {
  return <section className={classNames(styles.section, className)}>{children}</section>
}
