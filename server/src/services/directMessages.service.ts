import { DirectMessage } from '@prisma/client'
import { Request } from 'express'
import { db } from '~/configs/prisma.config'
import { BadRequestError } from '~/core/error.response'

const MESSAGES_BATCH = 10

class directMessagesService {
  getDirectMessages = async (req: Request) => {
    const { cursor, conversationId } = req.query as { cursor: string; conversationId: string }

    if (!conversationId) {
      throw new BadRequestError('Conversation ID missing')
    }

    let messages: DirectMessage[] = []

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        skip: 1,
        cursor: {
          id: cursor
        },
        where: {
          conversationId
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
      messages = await db.directMessage.findMany({
        take: MESSAGES_BATCH,
        where: {
          conversationId
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

    return {
      items: messages,
      nextCursor
    }
  }
}

export const DirectMessagesService = new directMessagesService()
