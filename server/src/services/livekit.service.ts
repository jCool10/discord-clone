import { Request } from 'express'
import { BadRequestError } from '~/core/error.response'

let AccessToken: any

import('livekit-server-sdk')
  .then((module) => {
    AccessToken = module.AccessToken
  })
  .catch((error) => {
    console.error('Failed to load livekit-server-sdk', error)
  })

class livekitService {
  getToken = async (req: Request) => {
    const { room, username } = req.query

    if (!room) throw new BadRequestError("Missing 'room' query parameter")
    else if (!username) throw new BadRequestError("Missing 'username' query parameter")

    const apiKey = process.env.LIVEKIT_API_KEY
    const apiSecret = process.env.LIVEKIT_API_SECRET
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

    if (!apiKey || !apiSecret || !wsUrl) throw new BadRequestError('Server misconfigured')

    const at = new AccessToken(apiKey, apiSecret, { identity: username as string })

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true })

    return { token: await at.toJwt() }
  }
}

export const LivekitService = new livekitService()
