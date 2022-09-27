import React, { memo } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'
import { Link } from 'gatsby'
import { isLocalLink } from '../../../helpers/url'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'clear' | 'faded' | 'white' | 'blue'
  size?: 'small' | 'medium' | 'big'
  href?: string
  mobileIcon?: React.ReactNode
  children?: React.ReactNode
  label?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  download?: boolean
  openNewTab?: boolean
  disabled?: boolean
}

export default memo(function Button({
  variant = 'primary',
  size,
  href,
  className = '',
  mobileIcon,
  children,
  type,
  label = '',
  onClick,
  download,
  openNewTab,
  disabled,
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    { [styles.outlined]: variant === 'outline' },
    { [styles.clear]: variant === 'clear' },
    { [styles.faded]: variant === 'faded' },
    { [styles.white]: variant === 'white' },
    { [styles.blue]: variant === 'blue' },
    { [styles.small]: size === 'small' },
    { [styles.medium]: size === 'medium' },
    { [styles.big]: size === 'big' },
    { [styles.disabled]: disabled },
    className
  )
  const newTabProps = openNewTab && { target: '_blank', rel: 'noreferrer' }

  return href ? (
    isLocalLink(href) ? (
      <Link to={href} className={classes} onClick={onClick} aria-label={label} download={download} {...newTabProps}>
        {mobileIcon && <span className={styles.mobileOnly}>{mobileIcon}</span>}
        <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
      </Link>
    ) : (
      <a href={href} className={classes} onClick={onClick} aria-label={label} download={download} {...newTabProps}>
        {mobileIcon && <span className={styles.mobileOnly}>{mobileIcon}</span>}
        <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
      </a>
    )
  ) : (
    <button type={type} className={classes} onClick={onClick} aria-label={label}>
      {mobileIcon && <span className={classNames(styles.icon, styles.mobileOnly)}>{mobileIcon}</span>}
      <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
    </button>
  )
})
