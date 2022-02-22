import type { ExtendedGetResult } from '@fingerprintjs/fingerprintjs-pro'

export interface VisitorResponse extends ExtendedGetResult {
  timestamp: number
  browserDetails: {
    botProbability: number
    browserName: string
    browserVersion: string
    os: string
    osVersion: string
    device: string
  }
}
