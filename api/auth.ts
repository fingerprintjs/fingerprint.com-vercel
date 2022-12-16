import { NowRequest, NowResponse } from '@now/node'
import crypto from 'crypto'
import { create } from './_lib/oauth2'

export const randomString = () => crypto.randomBytes(4).toString(`hex`)

export default (req: NowRequest, res: NowResponse) => {
  const { host } = req.headers

  const oauth2 = create()

  // simple-oauth will use our config files to generate a client we can use to request access

  const url = oauth2.authorizationCode.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  })

  // Get redirected to Github for authorization
  res.writeHead(301, { Location: url })
  res.end()
}
