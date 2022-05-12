import React, { useState, useEffect, memo } from 'react'
import { getVisitTitle, getBrowserName, getBotDecision } from '../../helpers/fpjs-widget'
import { ReactComponent as InfoSvg } from '../../img/info.svg'
import { ReactComponent as IncognitoSvg } from './incognito.svg'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { VisitorResponse } from '../../types/visitorResponse'
import MobileWidget, { MobileLoadingState } from './MobileWidget'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import useRollbar from '../../hooks/useRollbar'
import { getErrorMessage } from '../../helpers/error'
import { FPJS_SECRET_TOKEN, FPJS_VISITORS_ENDPOINT, MAPBOX_ACCESS_TOKEN } from '../../constants/env'
import styles from './FpjsWidget.module.scss'
import Skeleton from '../Skeleton/Skeleton'
import { repeatElement } from '../../helpers/repeatElement'
import { getConfig } from '../../helpers/fpjs'

const secretToken = FPJS_SECRET_TOKEN
const endpoint = FPJS_VISITORS_ENDPOINT
const mapboxToken = MAPBOX_ACCESS_TOKEN

export default memo(function FpjsWidget() {
  const [currentVisit, setCurrentVisit] = useState<VisitorResponse>()
  const [visitorId, setVisitorId] = useState<string>()
  const [visits, setVisits] = useState<VisitorResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  const rollbar = useRollbar()

  const {
    getData,
    error: identificationError,
    isLoading: fpjsIsLoading,
  } = useVisitorData(getConfig, { immediate: false })
  const [historyLoadError, setHistoryLoadError] = useState(false)
  const hasError = identificationError != null || historyLoadError

  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)

    async function fetchVisits() {
      if (!visitorId) {
        const data = await getData(true)

        setVisitorId(data?.visitorId)
        const visitsFpjs = [
          {
            ...data,
            timestamp: 1,
            browserDetails: {
              botProbability: data?.bot?.probability,
              browserName: data?.browserName,
              os: data?.os,
              osVersion: data?.osVersion,
              device: data?.device,
            },
          },
        ] as VisitorResponse[]

        setVisits(visitsFpjs)
        setCurrentVisit(visitsFpjs[0])
      }

      if (!visitorId) {
        return
      }

      try {
        const { visits } = await loadFpjsHistory(endpoint, visitorId, secretToken)

        if (!isCancelled) {
          setIsLoaded(true)
          setVisits(visits)
          setCurrentVisit(visits[0])
        }
      } catch (e) {
        if (e) {
          setHistoryLoadError(true)
          rollbar.error('Unable to load visits', getErrorMessage(e))
        }
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
  }, [getData, visitorId, rollbar])

  if (hasError) {
    return <LoadingState hasError />
  }

  if (fpjsIsLoading && isLoading) {
    return <LoadingState isVisitHistoryLoading={isLoading} isVisitDetailsLoading={fpjsIsLoading} />
  }

  return (
    <FpjsWidgetLoaded
      isVisitHistoryLoading={isLoading}
      isLoaded={isLoaded}
      currentVisit={currentVisit}
      visits={visits}
      visitorId={visitorId}
      setCurrentVisit={setCurrentVisit}
    />
  )
})

async function loadFpjsHistory(endpoint: string, visitorId: string, secretToken: string) {
  const response = await fetch(`${endpoint}${visitorId}?token=${secretToken}&limit=20`)
  return await response.json()
}

interface LoadingStateProps {
  isVisitDetailsLoading?: boolean
  isVisitHistoryLoading?: boolean
  hasError?: boolean
}

function LoadingState({ isVisitDetailsLoading, isVisitHistoryLoading, hasError }: LoadingStateProps) {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.demo, styles.desktopOnly)}>
        <VisitHistory isLoading={isVisitHistoryLoading ?? hasError} />
        <VisitDetails isLoading={isVisitDetailsLoading ?? hasError} />

        {hasError && (
          <div className={styles.errorMessage}>
            <h2 className={styles.tryMessage}>An error occurred.</h2>
            <h2 className={styles.tryMessage}>Please refresh the page or try in incognito mode.</h2>
          </div>
        )}
      </div>
      <MobileLoadingState />
    </div>
  )
}

interface FpjsWidgetLoadedProps extends VisitDetailsProps {
  isLoaded: boolean
  isVisitHistoryLoading: boolean
}

function FpjsWidgetLoaded({
  isLoaded,
  currentVisit,
  visits,
  visitorId,
  setCurrentVisit,
  isVisitHistoryLoading,
}: FpjsWidgetLoadedProps) {
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.demo, styles.desktopOnly, {
          [styles.loaded]: isLoaded,
          [styles.incognito]: currentVisit?.incognito,
        })}
      >
        <VisitHistory
          isLoading={isVisitHistoryLoading}
          visits={visits}
          currentVisit={currentVisit}
          setCurrentVisit={setCurrentVisit}
        />
        {visitorId ? ( // show noJS error
          <VisitDetails visits={visits} currentVisit={currentVisit} visitorId={visitorId} />
        ) : (
          <>
            <VisitDetails isLoading={true} />
            <noscript className={styles.errorMessage}>
              <h1 className={styles.message}>Enable JS to run the demo</h1>
            </noscript>
          </>
        )}
      </div>
      {visits && visitorId && (
        <MobileWidget isLoaded={isLoaded} visitorId={visitorId} visits={visits} currentVisit={currentVisit} />
      )}
    </div>
  )
}

interface VisitHistoryProps {
  isLoading?: boolean
  visits?: VisitorResponse[]
  currentVisit?: VisitorResponse
  setCurrentVisit?: React.Dispatch<React.SetStateAction<VisitorResponse>>
}

function VisitHistory({ isLoading, visits, currentVisit, setCurrentVisit }: VisitHistoryProps) {
  if (isLoading) {
    return (
      <>
        <div className={styles.history}>
          <div className={styles.header}>
            <Skeleton width={136} height={22} className={styles.headerLoading} />
          </div>
          <div className={styles.content}>
            <ul className={styles.visits}>
              {repeatElement(8, (i) => (
                <Skeleton key={i} width={160} height={30} className={styles.visitLoading} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={styles.history}>
      <div className={styles.header}>
        Visit History
        <Tippy content='Fingerprint Pro allows you to get a history of visits with all available information'>
          <InfoSvg tabIndex={0} />
        </Tippy>
      </div>
      <div className={styles.content}>
        <ul className={styles.visits}>
          {visits &&
            setCurrentVisit &&
            visits.map(({ requestId, timestamp, incognito }, i) => {
              return (
                <li
                  className={classNames(
                    styles.visit,
                    { [styles.selected]: currentVisit?.requestId === requestId },
                    { [styles.incognito]: incognito },
                    { [styles.now]: i === 0 }
                  )}
                  id={`visit_${requestId}`}
                  key={requestId}
                  onClick={() => setCurrentVisit(visits[i])}
                >
                  <span className={styles.visitLabel}>{i === 0 ? 'Current visit' : getVisitTitle(timestamp)}</span>
                  {incognito && <IncognitoSvg />}
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

interface VisitDetailsProps extends VisitHistoryProps {
  visitorId?: string
}

function VisitDetails({ isLoading, visits, visitorId, currentVisit }: VisitDetailsProps) {
  if (isLoading) {
    return (
      <div className={styles.currentVisit}>
        <div className={styles.header}>
          <Skeleton width={156} height={22} className={styles.headerLoading} />
        </div>
        <div className={styles.content}>
          <div className={styles.visitId}>
            <Skeleton width={396} height={32} />
          </div>
          <div className={classNames(styles.info, styles.bot)}>
            <Skeleton width={160} height={22} />
          </div>
          <div className={classNames(styles.info, styles.ip)}>
            <Skeleton width={160} height={22} />
          </div>
          <div className={classNames(styles.info, styles.incognito)}>
            <Skeleton width={160} height={22} />
          </div>
          <div className={classNames(styles.info, styles.browser)}>
            <Skeleton width={160} height={22} className={styles.loadingBrowser} />
          </div>
          <div className={classNames(styles.info, styles.location)}>
            <Skeleton width={188} height={22} />
            <Skeleton square />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.currentVisit}>
      <div className={styles.header}>
        <div className={styles.title}>
          {currentVisit &&
            visits &&
            (currentVisit.requestId === visits[0].requestId
              ? 'Your Current Visit'
              : getVisitTitle(currentVisit.timestamp))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.visitId}>
          <span className={styles.label}>Your ID: </span>
          <span className={styles.noWrap}>
            <span className={styles.value}>{visitorId}</span>
            <Tippy content='Every visitor to your website is assigned a unique & permanent identifier.'>
              <InfoSvg tabIndex={0} />
            </Tippy>
          </span>
        </div>
        <div className={classNames(styles.info, styles.bot)}>
          <span className={styles.label}>Headless Browser</span>
          <span className={styles.value}>
            {getBotDecision(currentVisit?.bot?.probability ?? currentVisit?.browserDetails?.botProbability ?? 0)}
          </span>
        </div>
        <div className={classNames(styles.info, styles.ip)}>
          <span className={styles.label}>IP</span>
          <span className={styles.value}>{currentVisit?.ip}</span>
        </div>
        <div className={classNames(styles.info, styles.incognito)}>
          <span className={styles.label}>Incognito</span>
          <span className={styles.value}>{currentVisit?.incognito ? 'Yes' : 'No'}</span>
          <Tippy content='Fingerprint Pro analyzes every page view and detects if it was made in incognito mode. Open this page in private mode to see it in action.'>
            <InfoSvg tabIndex={0} />
          </Tippy>
        </div>
        <div className={classNames(styles.info, styles.browser)}>
          <span className={styles.label}>Browser</span>
          <span className={styles.value}>
            {currentVisit && getBrowserName(currentVisit?.browserDetails || currentVisit)}
          </span>
        </div>
        <div className={classNames(styles.info, styles.location)}>
          <span className={styles.label}>
            Location
            <Tippy content='Based on the visit IP address'>
              <InfoSvg style={{ marginLeft: '10px' }} tabIndex={0} />
            </Tippy>
          </span>
          <div
            className={classNames(styles.value, {
              [styles.unavailable]: currentVisit?.ipLocation?.latitude && currentVisit?.ipLocation?.longitude,
            })}
          >
            {currentVisit && (
              <img
                alt='Location map'
                src={`https://api.mapbox.com/styles/v1/mapbox/${
                  currentVisit?.incognito ? 'dark-v10' : 'outdoors-v11'
                }/static/${currentVisit?.ipLocation?.longitude},${
                  currentVisit?.ipLocation?.latitude
                },7.00,0/512x512?access_token=${mapboxToken}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
