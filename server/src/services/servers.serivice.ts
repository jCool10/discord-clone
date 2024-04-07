import { MemberRole } from '@prisma/client'
import { Request } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { db } from '~/configs/prisma.config'
import { BadRequestError } from '~/core/error.response'

class servicesService {
  createServer = async (req: Request) => {
    const profile = req.profile
    const { name, imageUrl } = req.body

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuidv4(),
        channels: {
          create: [{ name: 'general', profileId: profile.id }]
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }]
        }
      }
    })

    return server
  }

  deleteServer = async (req: Request) => {
    const profile = req.profile
    const { serverId } = req.params

    const server = await db.server.delete({
      where: {
        id: serverId,
        profileId: profile.id
      }
    })

    return server
  }

  updateServer = async (req: Request) => {
    const profile = req.profile
    const { name, imageUrl } = req.body

    const { serverId } = req.params

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        name,
        imageUrl
      }
    })

    return server
  }

  leaveServer = async (req: Request) => {
    const profile = req.profile
    const { serverId } = req.params

    if (!serverId) throw new BadRequestError('Server ID missing')

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })

    return server
  }

  inviteServer = async (req: Request) => {
    const profile = req.profile
    const { serverId } = req.params
    if (!serverId) throw new BadRequestError('Server ID missing')

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        inviteCode: uuidv4()
      }
    })

    return server
  }

  findServerByProfile = async (req: Request) => {
    const profile = req.profile

    const server = await db.server.findFirst({
      where: {
        members: {
          some: {
            profileId: profile.id
          }
        }
      }
    })

    return server || {}
  }

  findServersByProfile = async (req: Request) => {
    const profile = req.profile

    const servers = await db.server.findMany({
      where: {
        members: {
          some: {
            profileId: profile.id
          }
        }
      }
    })

    return servers
  }

  findServerByIdAndProfile = async (req: Request) => {
    const profile = req.profile
    const { serverId } = req.params

    const server = await db.server.findUnique({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        channels: {
          where: {
            name: 'general'
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    console.log('server', server)

    return server || {}
  }

  getServerAndProfileById = async (req: Request) => {
    const profile = req.profile
    const { serverId } = req.params

    console.log(serverId)

    const server = await db.server.findUnique({
      where: {
        id: serverId
      },
      include: {
        channels: {
          orderBy: {
            createdAt: 'asc'
          }
        },
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: 'asc'
          }
        }
      }
    })

    if (!server) throw new BadRequestError('Server not found')

    console.log(server)

    return { server, profile }
  }

  getServerByInviteCode = async (req: Request) => {
    const { inviteCode } = req.params
    const profile = req.profile

    const server = await db.server.findFirst({
      where: {
        inviteCode: inviteCode,
        members: {
          some: {
            profileId: profile.id
          }
        }
      }
    })

    if (!server) throw new BadRequestError('Server not found')

    return server
  }

  updateServerByInviteCode = async (req: Request) => {
    const { inviteCode } = req.params
    const profile = req.profile

    const server = await db.server.update({
      where: {
        inviteCode: inviteCode
      },
      data: {
        members: {
          create: [
            {
              profileId: profile.id
            }
          ]
        }
      }
    })

    return server
  }
}

export const ServersService = new servicesService()
