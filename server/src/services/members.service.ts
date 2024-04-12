import { Request } from 'express'
import { db } from '~/configs/prisma.config'
import { BadRequestError, NotFoundError } from '~/core/error.response'

class membersService {
  deleteMember = async (req: Request) => {
    const profile = req.profile
    const { memberId } = req.params
    if (!memberId) throw new BadRequestError('Member ID missing')

    const { serverId } = req.query as { serverId: string }
    if (!serverId) throw new BadRequestError('Server ID missing')

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
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

    return server
  }

  updateMember = async (req: Request) => {
    const profile = req.profile
    const { memberId } = req.params
    if (!memberId) throw new BadRequestError('Member ID missing')
    const { serverId } = req.query as { serverId: string }
    if (!serverId) throw new BadRequestError('Server ID missing')

    const { role } = req.body

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id
              }
            },
            data: {
              role
            }
          }
        }
      },
      include: {
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

    return server
  }

  getMemberById = async (req: Request) => {
    const profile = req.profile
    const { serverId } = req.params

    const member = await db.member.findFirst({
      where: {
        serverId: serverId,
        profileId: profile.id
      },
      include: {
        profile: true
      }
    })

    if (!member) throw new NotFoundError('Member not found')

    return member
  }
}

export const MembersService = new membersService()
