import React from 'react'
import { Layout } from '../components/Layout'

import ClientsSection from '../components/homepage/ClientsSection/ClientsSection'
import DemoSection from '../components/homepage/DemoSection/DemoSection'
import { SEO } from '../components/SEO/SEO'

export default function IndexPage() {
  return (
    <Layout>
      <ClientsSection />
      <DemoSection />
    </Layout>
  )
}

export function Head() {
  return <SEO />
}
