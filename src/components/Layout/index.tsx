import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../Footer'
import Header from '../Header'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useConsolePromotionMessage } from '../../hooks/useConsolePromotionMessage'
import { FPJS_CDN_URL, FPJS_VISITORS_ENDPOINT, GTM_TOKEN } from '../../constants/env'
import { withTrailingSlash } from '../../helpers/url'
import { BASE_URL, URL } from '../../constants/content'
import { defaultDataLayer } from '../../constants/content'
import { enableAnalytics } from '../../helpers/gtm'
import { useUserLocation } from '../../hooks/useUserLocation'
import { useStaticQuery, graphql } from 'gatsby'

interface LayoutProps {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  const siteMetadata = useSiteMetadata()
  const data = useStaticQuery<GatsbyTypes.NotificationQueryQuery>(graphql`
    query NotificationQuery {
      notificationBarYaml {
        arrowText
        barBody
        showNotBar
        url
        backgroundColor
      }
    }
  `)

  return data.notificationBarYaml?.showNotBar ? (
    <LayoutTemplate siteMetadata={siteMetadata} notificationBar={data.notificationBarYaml}>
      {children}
    </LayoutTemplate>
  ) : (
    <LayoutTemplate siteMetadata={siteMetadata}>{children}</LayoutTemplate>
  )
}

interface LayoutTemplateProps extends LayoutProps {
  siteMetadata: GatsbyTypes.SiteSiteMetadata
  notificationBar?: {
    arrowText?: string
    barBody?: string
    url?: string
    backgroundColor?: string
  }
}

// We need this to not use static GraphQL queries in order use it in CMS preview (it runs it in browser directly)
export function LayoutTemplate({ children, siteMetadata, notificationBar }: LayoutTemplateProps) {
  const { title, description, siteUrl, image } = siteMetadata
  const gtmToken = GTM_TOKEN
  const { isEuUser } = useUserLocation()

  useEffect(() => {
    if (isEuUser === false) {
      enableAnalytics()
    }
  }, [isEuUser])

  useConsolePromotionMessage(`Like breaking things to see how they work? Join us: ${URL.careersConsoleLogUrl}`)

  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='icon' type='image/x-icon' href='/img/favicon.ico' />
        <meta name='description' content={description} />
        <meta httpEquiv='Content-type' content='text/html; charset=UTF-8' />

        <meta property='og:type' content={siteUrl?.includes('/blog') ? 'blog' : 'website'} />
        <meta property='og:url' content={withTrailingSlash(siteUrl ?? BASE_URL)} />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content={withTrailingSlash(siteUrl ?? BASE_URL)} />
        <meta property='twitter:title' content={title} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={image} />

        <meta name='facebook-domain-verification' content='dz50t3zs49efpmvtb6nzog8xj3fes0' />

        <script>{`dataLayer = ${JSON.stringify(defaultDataLayer)};`}</script>
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${gtmToken}');`}
        </script>
        {!!FPJS_CDN_URL && <link rel='preconnect' href={FPJS_CDN_URL} />}
        <link rel='preconnect' href={FPJS_VISITORS_ENDPOINT} />
      </Helmet>
      <Header notificationBar={notificationBar} />
      {children}
      <Footer />
    </>
  )
}
