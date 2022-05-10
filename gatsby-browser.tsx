import * as React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import './src/styles/vendors/normalize.scss'
import './src/styles/vendors/tippy.scss'
import './src/styles/vendors/swiper.scss'
import './src/styles/vendors/code-theme.scss'
import './src/styles/global-styles.scss'
import './src/styles/custom-properties.scss'

import AppProviders from './src/AppProviders'

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({ element }) => {
  return <AppProviders>{element}</AppProviders>
}
