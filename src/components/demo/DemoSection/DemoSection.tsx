import React, { useState, useEffect } from 'react'
import useRollbar from '../../../hooks/useRollbar'
import { VisitorResponse } from '../../../types/visitorResponse'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { loadFpjsHistory } from '../../../helpers/api'
import { getErrorMessage } from '../../../helpers/error'

import VisitorSection from './VisitorSection/VisitorSection'
import AlgorithmSection from './AlgorithmSection/AlgorithmSection'
import VisitsSection from './VisitsSection/VisitsSection'

export default function DemoSection() {
  const [currentVisit, setCurrentVisit] = useState<VisitorResponse>()
  const [visits, setVisits] = useState<VisitorResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { data } = useVisitorData()
  const visitorId = data?.visitorId
  const rollbar = useRollbar()

  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)

    async function fetchVisits() {
      if (!visitorId) {
        return
      }
      try {
        const { visits } = await loadFpjsHistory(visitorId)

        if (!isCancelled) {
          setVisits(visits)
          setCurrentVisit(visits[0])
        }
      } catch (e) {
        rollbar.error('Unable to load visits', getErrorMessage(e))
      } finally {
        if (!isCancelled) {
          setIsLoading(false)
        }
      }
    }
    fetchVisits()

    return () => {
      isCancelled = true
    }
  }, [visitorId, rollbar])

  return (
    <>
      <VisitorSection isLoading={isLoading} currentVisit={currentVisit} visitorId={visitorId} />
      <AlgorithmSection isLoading={isLoading} visitorId={visitorId} visits={visits} currentVisit={currentVisit} />
      <VisitsSection isLoading={isLoading} visits={visits} currentVisit={currentVisit} />
    </>
  )
}
