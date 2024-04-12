import { Request } from 'express'
import { db } from '~/configs/prisma.config'

class conversationService {
  getOrCreateConversation = async (req: Request) => {
    try {
      const profile = req.profile
      const { memberOneId, memberTwoId } = req.body

      let conversation = await db.conversation.findFirst({
        where: {
          OR: [
            { AND: [{ memberOneId: memberOneId }, { memberTwoId: memberTwoId }] },
            { AND: [{ memberOneId: memberTwoId }, { memberTwoId: memberOneId }] }
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
        conversation = await db.conversation.create({
          data: {
            memberOneId,
            memberTwoId
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
      }

      return { conversation, profile }
    } catch (error) {
      console.log(error)
    }
  }
}

export const ConversationService = new conversationService()
