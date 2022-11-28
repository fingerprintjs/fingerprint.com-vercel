import React from 'react'
import Section from '../../common/Section'

import { ReactComponent as LineSVG } from './LineSVG.svg'
import classNames from 'classnames'

import styles from './Chart.module.scss'

export default function Chart() {
  const chartWidth = 615
  const chartHeight = 334
  const xPoints = 4
  const maxY = 100000
  const offset = 25
  const yPointsPro = [99500, 99003, 98507, 98015]
  const xScale = ['30 days', '60 days', '90 days', '120 days']
  const yScale = ['100k', '75k', '50k', '25k', '0']

  const chartPointsPro = [
    {
      y: (yPointsPro[0] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 0 + offset,
      yLine: (yPointsPro[0] / maxY) * chartHeight,
      xLine: 0,
    },
    {
      y: (yPointsPro[1] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 1,
      yLine: (yPointsPro[0] / maxY) * chartHeight - 2,
      xLine: (chartWidth / (xPoints - 1)) * 1,
    },
    {
      y: (yPointsPro[2] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 2,
      yLine: (yPointsPro[0] / maxY) * chartHeight - 4,
      xLine: (chartWidth / (xPoints - 1)) * 2,
    },
    {
      y: (yPointsPro[3] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 3 - offset,
      yLine: (yPointsPro[0] / maxY) * chartHeight - 6,
      xLine: (chartWidth / (xPoints - 1)) * 3,
    },
  ]
  const xSidesPro = [
    chartPointsPro[1].xLine - chartPointsPro[0].xLine,
    chartPointsPro[2].xLine - chartPointsPro[1].xLine,
    chartPointsPro[3].xLine - chartPointsPro[2].xLine,
  ]
  const ySidesPro = [
    chartPointsPro[0].y - chartPointsPro[1].y,
    chartPointsPro[1].y - chartPointsPro[2].y,
    chartPointsPro[2].y - chartPointsPro[3].y,
  ]
  const HypoPro = [
    Math.hypot(xSidesPro[0], ySidesPro[0]),
    Math.hypot(xSidesPro[1], ySidesPro[1]),
    Math.hypot(xSidesPro[2], ySidesPro[2]),
  ]
  const AnglePro = [ySidesPro[0] / HypoPro[0], ySidesPro[1] / HypoPro[1], ySidesPro[2] / HypoPro[2]]

  const yPointsOss = [60000, 36000, 21600, 12960]

  const chartPointsOss = [
    {
      y: (yPointsOss[0] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 0 + offset,
      yLine: (yPointsOss[0] / maxY) * chartHeight - 10,
      xLine: 0,
    },
    {
      y: (yPointsOss[1] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 1,
      yLine: (yPointsOss[1] / maxY) * chartHeight,
      xLine: (chartWidth / (xPoints - 1)) * 1,
    },
    {
      y: (yPointsOss[2] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 2,
      yLine: (yPointsOss[2] / maxY) * chartHeight,
      xLine: (chartWidth / (xPoints - 1)) * 2,
    },
    {
      y: (yPointsOss[3] / maxY) * chartHeight,
      x: (chartWidth / (xPoints - 1)) * 3 - offset,
      yLine: (yPointsOss[3] / maxY) * chartHeight + 2,
      xLine: (chartWidth / (xPoints - 1)) * 3,
    },
  ]
  const xSidesOss = [
    chartPointsOss[1].xLine - chartPointsOss[0].xLine,
    chartPointsOss[2].xLine - chartPointsOss[1].xLine,
    chartPointsOss[3].xLine - chartPointsOss[2].xLine,
  ]
  const ySidesOss = [
    chartPointsOss[0].y - chartPointsOss[1].y,
    chartPointsOss[1].y - chartPointsOss[2].y,
    chartPointsOss[2].y - chartPointsOss[3].y,
  ]
  const HypoOss = [
    Math.hypot(xSidesOss[0], ySidesOss[0]),
    Math.hypot(xSidesOss[1], ySidesOss[1]),
    Math.hypot(xSidesOss[2], ySidesOss[2]),
  ]

  const AngleOss = [ySidesOss[0] / HypoOss[0], ySidesOss[1] / HypoOss[1], ySidesOss[2] / HypoOss[2]]

  return (
    <Section className={styles.root}>
      <div className={styles.chartTitle}>
        <span>Correctly Identified Devices</span>
        <div className={styles.chartLinesTitle}>
          <div className={styles.lineTitle}>
            <LineSVG className={styles.ossLine} />
            <span>Open Source</span>
          </div>
          <div className={styles.lineTitle}>
            <LineSVG className={styles.proLine} />
            <span>Fingerprint Pro</span>
          </div>
        </div>
      </div>
      <figure className={styles.chart}>
        <ul className={styles.chartY}>
          {yScale.map((point) => (
            <li key={point}>
              {point}
              <div className={styles.xLine} />
            </li>
          ))}
        </ul>
        <ul className={styles.chartLine} style={{ height: `${chartHeight}px`, width: `${chartWidth}px` }}>
          {chartPointsPro.map(({ y, x, yLine, xLine }, index) => {
            return (
              <li
                key={`pro-${x}`}
                style={
                  {
                    '--y': `${y}px`,
                    '--x': `${x}px`,
                    '--yLine': `${yLine}px`,
                    '--xLine': `${xLine}px`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={styles.lineSegmentPro}
                  style={
                    {
                      '--hypotenuse': HypoPro[index],
                      '--angle': Math.asin(AnglePro[index]) * (180 / Math.PI),
                    } as React.CSSProperties
                  }
                />
                <span className={classNames(styles.labelPro, styles.labelProStability)}>
                  {yPointsPro[index].toLocaleString()}
                </span>
                <div className={styles.dataPointPro} data-value={`${yPointsPro[index]}`} />
                <span className={styles.xPoint}>{xScale[index]}</span>
              </li>
            )
          })}
          {chartPointsOss.map(({ y, x, yLine, xLine }, index) => {
            return (
              <li
                key={`oss-${x}`}
                style={
                  {
                    '--y': `${y}px`,
                    '--x': `${x}px`,
                    '--yLine': `${yLine}px`,
                    '--xLine': `${xLine}px`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={styles.lineSegmentOss}
                  style={
                    {
                      '--hypotenuse': HypoOss[index],
                      '--angle': Math.asin(AngleOss[index]) * (180 / Math.PI),
                    } as React.CSSProperties
                  }
                />
                <div className={styles.dataPointOss} data-value={`${yPointsOss[index]}`} />
                <span className={classNames(styles.labelOss, styles.labelOssStability)}>
                  {yPointsOss[index].toLocaleString()}
                </span>
              </li>
            )
          })}
        </ul>
      </figure>
      <span className={styles.daysLabel}>Days after initial identification</span>
    </Section>
  )
}
