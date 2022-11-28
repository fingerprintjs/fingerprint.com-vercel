import React from 'react'
import { Layout } from '../components/Layout'

import HeroSection from '../components/homepage/HeroSection/HeroSection'
import ClientsSection from '../components/homepage/ClientsSection/ClientsSection'
import DemoSection from '../components/homepage/DemoSection/DemoSection'
import PlatformSection from '../components/homepage/PlatformSection/PlatformSection'
import CustomerStoriesSection from '../components/homepage/CustomerStoriesSection/CustomerStoriesSection'
import { SEO } from '../components/SEO/SEO'

export default function IndexPage() {
  return (
    <Layout>
      <HeroSection />
      <ClientsSection />
      <DemoSection />
      <PlatformSection />
      <CustomerStoriesSection />
    </Layout>
  )
}

export function Head() {
  return <SEO />
}
