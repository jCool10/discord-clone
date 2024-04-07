export const config = {
  app: {
    port: process.env.PORT,
    env: process.env.NODE_ENV
  },
  db: {
    url: process.env.DATABASE_URL
  },
  uploadthing: {
    secret: process.env.UPLOAD_SECRET,
    id: process.env.UPLOADTHING_APP_ID
  }
}
