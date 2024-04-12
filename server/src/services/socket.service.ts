import { MemberRole } from '@prisma/client'
import { Request } from 'express'
import { db } from '~/configs/prisma.config'
import { BadRequestError, NotFoundError, UnauthorizedError } from '~/core/error.response'

class socketService {
  private findServer = async (serverId: string, profileId: string) => {
    const server = await db.server.findFirst({
      where: {
        id: serverId,
        members: {
          some: {
            profileId
          }
        }
      },
      include: {
        members: true
      }
    })

    if (!server) {
      throw new NotFoundError('Server not found')
    }

    return server
  }

  private findMember = (server: any, profileId: string) => {
    const member = server.members.find((member: any) => member?.profileId === profileId)

    if (!member) {
      throw new NotFoundError('Member not found')
    }

    return member
  }

  createMessageBySocket = async (req: Request) => {
    const { profile } = req
    const { content, fileUrl } = req.body
    const { serverId, channelId } = req.query

    const server = await this.findServer(serverId as string, profile.id)
    const member = this.findMember(server, profile.id)

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const channelKey = `chat:${channelId}:messages`
    global.io.emit(channelKey, message)

    return message
  }

  deleteMessageBySocket = async (req: Request) => {
    const { profile } = req
    const { serverId, channelId } = req.query
    const { messageId } = req.params

    const server = await this.findServer(serverId as string, profile.id)
    const member = this.findMember(server, profile.id)

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!message || message.deleted) {
      throw new NotFoundError('Message not found')
    }

    const isMessageOwner = message.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) {
      throw new UnauthorizedError('Unauthorized')
    }

    message = await db.message.update({
      where: {
        id: messageId as string
      },
      data: {
        fileUrl: null,
        content: 'This message has been deleted.',
        deleted: true
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const updateKey = `chat:${channelId}:messages:update`
    global.io.emit(updateKey, message)

    return message
  }

  updateMessageBySocket = async (req: Request) => {
    const { profile } = req
    const { serverId, channelId } = req.query
    const { content } = req.body
    const { messageId } = req.params

    const server = await this.findServer(serverId as string, profile.id)
    const member = this.findMember(server, profile.id)

    let message = await db.message.findFirst({
      where: {
        id: messageId as string,
        channelId: channelId as string
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!message || message.deleted) {
      throw new NotFoundError('Message not found')
    }

    const isMessageOwner = message.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) {
      throw new UnauthorizedError('Unauthorized')
    }

    message = await db.message.update({
      where: {
        id: messageId as string
      },
      data: {
        content
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const updateKey = `chat:${channelId}:messages:update`
    global.io.emit(updateKey, message)

    return message
  }

  createDirectMessageBySocket = async (req: Request) => {
    const { content, fileUrl } = req.body
    const { conversationId } = req.query
    const profile = req.profile

    if (!conversationId) {
      throw new NotFoundError('Conversation not found')
    }

    if (!content) {
      throw new NotFoundError('Content is required')
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id
            }
          },
          {
            memberTwo: {
              profileId: profile.id
            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!conversation) {
      throw new NotFoundError('Conversation not found')
    }

    const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

    if (!member) {
      throw new NotFoundError('Member not found')
    }

    const message = await db.directMessage.create({
      data: {
        content,
        fileUrl,
        conversationId: conversationId as string,
        memberId: member.id
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const channelKey = `chat:${conversationId}:messages`

    global.io.emit(channelKey, message)

    return message
  }

  deleteDirectMessageBySocket = async (req: Request) => {
    const profile = req.profile
    const { conversationId } = req.query
    const { directMessageId } = req.params

    if (!conversationId) {
      throw new BadRequestError('Conversation ID missing')
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id
            }
          },
          {
            memberTwo: {
              profileId: profile.id
            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!conversation) {
      throw new NotFoundError('Conversation not found')
    }
    const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

    if (!member) {
      throw new NotFoundError('Member not found')
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!directMessage || directMessage.deleted) {
      throw new NotFoundError('Message not found')
    }

    const isMessageOwner = directMessage.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) {
      throw new UnauthorizedError('Unauthorized')
    }

    directMessage = await db.directMessage.update({
      where: {
        id: directMessageId as string
      },
      data: {
        fileUrl: null,
        content: 'This message has been deleted.',
        deleted: true
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const updateKey = `chat:${conversation.id}:messages:update`

    global.io.emit(updateKey, directMessage)

    return directMessage
  }

  updateDirectMessageBySocket = async (req: Request) => {
    const profile = req.profile
    const { conversationId } = req.query
    const { content } = req.body
    const { directMessageId } = req.params

    if (!conversationId) {
      throw new BadRequestError('Conversation ID missing')
    }

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id
            }
          },
          {
            memberTwo: {
              profileId: profile.id
            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!conversation) {
      throw new NotFoundError('Conversation not found')
    }
    const member = conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo

    if (!member) {
      throw new NotFoundError('Member not found')
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!directMessage || directMessage.deleted) {
      throw new NotFoundError('Message not found')
    }

    const isMessageOwner = directMessage.memberId === member.id
    const isAdmin = member.role === MemberRole.ADMIN
    const isModerator = member.role === MemberRole.MODERATOR
    const canModify = isMessageOwner || isAdmin || isModerator

    if (!canModify) {
      throw new UnauthorizedError('Unauthorized')
    }

    directMessage = await db.directMessage.update({
      where: {
        id: directMessageId as string
      },
      data: {
        content
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const updateKey = `chat:${conversation.id}:messages:update`

    global.io.emit(updateKey, directMessage)

    return directMessage
  }
}

export const SocketService = new socketService()
