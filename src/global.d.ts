/// <reference types="./gatsby-types" />

declare module '*.inline.svg' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any
  export default content
}
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png'

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.webm'
declare module '*.mp4'
