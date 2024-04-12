import { Request } from 'express'
import { db } from '~/configs/prisma.config'

class profileService {
  checkProfile = async (req: Request) => {
    const { id, name, imageUrl, emailAddress } = req.body

    const profile = await db.profile.findUnique({
      where: {
        userId: id
      }
    })

    if (!profile) {
      const newProfile = await db.profile.create({
        data: {
          userId: id,
          name,
          imageUrl: imageUrl,
          email: emailAddress
        }
      })

      return newProfile
    }

    return profile
  }
}

export const ProfileService = new profileService()
