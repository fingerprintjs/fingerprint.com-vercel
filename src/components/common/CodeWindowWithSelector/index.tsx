import React, { useState, memo, useEffect } from 'react'
import styles from './CodeWindow.module.scss'
import classNames from 'classnames'
import Prism from 'prismjs'
import { copyToClipboard } from '../../../helpers/clipboard'
import { ReactComponent as CopySVG } from '../../../img/CopySVG.svg'
import Tippy from '@tippyjs/react'
import { ReactComponent as InfoSvg } from './InfoIconSVG.svg'
import { isBrowser } from '../../../helpers/detector'

import { AnimatePresence, motion } from 'framer-motion'

interface CodeWindowProps {
  codeBlocks: { type: string; code: string; language: string }[]
  hasLineNumbers?: boolean
  className?: string
  tooltips?: React.ReactNode[]
}

export default memo(function CodeWindowWithSelector({
  codeBlocks,
  hasLineNumbers = true,
  className,
  tooltips,
}: CodeWindowProps) {
  const [activeTab, setActiveTab] = useState(codeBlocks[0])
  const [activeTabHighlight, setActiveTabHighlight] = useState(codeBlocks[0].type)
  const [activeIndex, setActiveIndex] = useState(0)

  const showTabs = codeBlocks.length > 1

  useEffect(() => {
    Prism.highlightAll()
  }, [codeBlocks, activeTabHighlight])

  const handleTab = (index: number) => {
    setActiveTab(codeBlocks[index])
    setActiveIndex(index)
  }

  const onCopyClick = (text: string) => {
    copyToClipboard(text)
  }

  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <div className={classNames(styles.button, styles.close)} />
        <div className={classNames(styles.button, styles.minimize)} />
        <div className={classNames(styles.button, styles.expand)} />
      </div>
      {showTabs && (
        <div className={styles.nav}>
          <ul className={styles.tabs}>
            {codeBlocks.map((block, index) => (
              <li
                key={index}
                className={classNames(styles.tab, { [styles.active]: activeTab.type === block.type })}
                onClick={() => handleTab(index)}
              >
                {block.type}
              </li>
            ))}
          </ul>
          <div className={styles.copy} onClick={() => onCopyClick(codeBlocks[activeIndex].code)}>
            <CopySVG className={styles.icon} />
            Copy
          </div>
        </div>
      )}
      <AnimatePresence initial={false} mode='wait' onExitComplete={() => setActiveTabHighlight(activeTab.type)}>
        <motion.div
          key={activeTab.type}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={classNames(className, styles.content)}
        >
          <pre className={styles.pre}>
            <code
              className={classNames(
                styles.code,
                {
                  'line-numbers': hasLineNumbers,
                },
                `language-${activeTab.language}`
              )}
            >
              {codeBlocks[activeIndex].code}
            </code>
            {tooltips && tooltips.map((tooltip) => tooltip)}
          </pre>
        </motion.div>
      </AnimatePresence>
    </div>
  )
})

export interface CodeTooltipProps {
  children: React.ReactNode
  className: string
  left?: number
}
export function CodeTooltip({ children, className, left }: CodeTooltipProps) {
  return (
    <Tippy
      interactive
      appendTo={isBrowser() ? document.body : undefined} // to prevent the tooltip from taking space from the description
      placement='right'
      theme='checkmark'
      maxWidth={460}
      popperOptions={{
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['bottom', 'top'],
            },
          },
        ],
      }}
      content={children}
    >
      <InfoSvg
        tabIndex={0}
        className={classNames(className, styles.infoIcon)}
        style={{ left: `${left}px` } as React.CSSProperties}
      />
    </Tippy>
  )
}
