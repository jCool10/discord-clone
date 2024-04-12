import { MemberRole } from '@prisma/client'
import { Request } from 'express'
import { db } from '~/configs/prisma.config'
import { BadRequestError, NotFoundError } from '~/core/error.response'

class channelsService {
  createChannel = async (req: Request) => {
    const { name, type } = req.body
    const profile = req.profile
    const { serverId } = req.query as { serverId: string }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type
          }
        }
      }
    })
    return server
  }

  deleteChannel = async (req: Request) => {
    const { serverId } = req.query as { serverId: string }
    const { channelId } = req.params
    const profile = req.profile

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          delete: {
            id: channelId,
            name: {
              not: 'general'
            }
          }
        }
      }
    })

    return server
  }

  updateChannel = async (req: Request) => {
    const { name, type } = req.body
    const { serverId } = req.query as { serverId: string }
    const { channelId } = req.params
    const profile = req.profile

    if (name === 'general') {
      throw new BadRequestError('Name cannot be general')
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          update: {
            where: {
              id: channelId,
              NOT: {
                name: 'general'
              }
            },
            data: {
              name,
              type
            }
          }
        }
      }
    })

    return server
  }

  getChannelById = async (req: Request) => {
    const { channelId } = req.params

    const channel = await db.channel.findUnique({
      where: {
        id: channelId
      }
    })

    if (!channel) {
      throw new NotFoundError('Channel not found')
    }

    return channel
  }
}

export const ChannelsService = new channelsService()
