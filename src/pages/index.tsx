import React from 'react'
import { Layout } from '../components/Layout'

import ClientsSection from '../components/homepage/ClientsSection/ClientsSection'
import { SEO } from '../components/SEO/SEO'

export default function IndexPage() {
  return (
    <Layout>
      <ClientsSection />
    </Layout>
  )
}

export function Head() {
  return <SEO />
}
