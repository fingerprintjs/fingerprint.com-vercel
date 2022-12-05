import React from 'react'
import { Layout } from '../components/Layout'

import HeroSection from '../components/homepage/HeroSection/HeroSection'
import ClientsSection from '../components/homepage/ClientsSection/ClientsSection'
import DemoSection from '../components/homepage/DemoSection/DemoSection'
import PlatformSection from '../components/homepage/PlatformSection/PlatformSection'
import UseCasesSection from '../components/homepage/UseCasesSection/UseCasesSection'
import CustomerStoriesSection from '../components/homepage/CustomerStoriesSection/CustomerStoriesSection'
import WhyFingerprintSection from '../components/homepage/WhyFingerprintSection/WhyFingerprintSection'
import ForDevelopersSection from '../components/homepage/ForDevelopersSection/ForDevelopersSection'
import SOCSection from '../components/homepage/SOCSection/SOCSection'
import VideoSection from '../components/homepage/VideoSection/VideoSection'
import BadgesSection from '../components/homepage/BadgesSection/BadgesSection'

import { SEO } from '../components/SEO/SEO'

export default function IndexPage() {
  return (
    <Layout>
      <HeroSection />
      <ClientsSection />
      <DemoSection />
      <PlatformSection />
      <UseCasesSection />
      <CustomerStoriesSection />
      <WhyFingerprintSection />
      <ForDevelopersSection />
      <SOCSection />
      <VideoSection />
      <BadgesSection />
    </Layout>
  )
}

export function Head() {
  return <SEO />
}
