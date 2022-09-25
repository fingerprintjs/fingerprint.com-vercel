import React from 'react'

import { useSiteMetadata } from '../../hooks/useSiteMetadata'

type SeoProps = {
  title?: string
  description?: string
  pathname?: string
  image?: string
  children?: React.ReactNode
}
export function SEO({ title, description, pathname, image, children }: SeoProps) {
  const { title: defaultTitle, description: defaultDescription, image: defaultImage, siteUrl } = useSiteMetadata()
  const imageUrl = image ? `${siteUrl}${image}` : defaultImage
  const seo = {
    title: title ?? defaultTitle,
    description: description ?? defaultDescription,
    image: imageUrl,
    url: `${siteUrl}${pathname ?? ``}`,
  }
  return (
    <>
      <link
        rel='icon'
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👤</text></svg>"
      />

      <title>{seo.title}</title>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' type='image/x-icon' href='/img/favicon.ico' />
      <meta name='description' content={seo.description} />
      <meta httpEquiv='Content-type' content='text/html; charset=UTF-8' />

      <meta property='og:type' content={seo.url?.includes('/blog') ? 'blog' : 'website'} />
      <meta property='og:url' content={seo.url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={seo.image} />

      <meta name='image' content={seo.image} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={seo.title} />
      <meta name='twitter:url' content={seo.url} />
      <meta name='twitter:description' content={seo.description} />
      <meta name='twitter:image' content={seo.image} />

      <meta name='facebook-domain-verification' content='dz50t3zs49efpmvtb6nzog8xj3fes0' />

      {children}
    </>
  )
}
