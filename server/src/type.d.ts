declare namespace Express {
  interface Request {
    profile: {
      id: string
      userId: string
      name: string
      imageUrl: string
      email: string
      createdAt: Date
      updatedAt: Date
    }
  }
}
