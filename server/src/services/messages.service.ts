import { Message } from '@prisma/client'
import { Request } from 'express'
import { db } from '~/configs/prisma.config'
import { BadRequestError } from '~/core/error.response'

const MESSAGES_BATCH = 10

class messagesService {
  getMessages = async (req: Request) => {
    const { cursor, channelId } = req.query as { cursor: string; channelId: string }

    console.log({ cursor, channelId })

    if (!channelId) throw new BadRequestError('Channel ID missing')

    let messages: Message[] = []

    if (cursor) {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor
        },
        where: {
          channelId
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      messages = await db.message.findMany({
        take: MESSAGES_BATCH,
        where: {
          channelId
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    let nextCursor = null

    if (messages.length === MESSAGES_BATCH) {
      nextCursor = messages[MESSAGES_BATCH - 1].id
    }

    console.log(messages, nextCursor)

    return {
      items: messages,
      nextCursor
    }
  }
}

export const MessagesService = new messagesService()
