# Discord clone

This is a repository for Fullstack Discord Clone: Next.js, Socket.io, Tailwind CSS, React Hook Form, Express, Prisma, Node.js, My SQL, Docker,

## Features

- Real-time messaging using Socket.io
- Send attachments as messages using UploadThing
- Delete & Edit messages in real time for all users
- Create Text, Audio and Video call Channels
- 1:1 conversation between members
- 1:1 video calls between members
- Member management (Kick, Role change Guest / Moderator)
- Unique invite link generation & full working invite system
- Infinite loading for messages in batches of 10 (tanstack/query)
- Server creation and customization
- Beautiful UI using TailwindCSS and ShadcnUI
- Full responsive and mobile UI
- Light / Dark mode
- Websocket fallback: Polling with alerts
- ORM using Prisma
- Authentication with Clerk

## Usage

1. Clone the repository

```bash
git clone https://github.com/jCool10/discord-clone.git
```

2. Install dependencies

   2.1. Install dependencies for the client and create a `.env.local` file in the `client` directory and add the following environment variables

   ```bash
   cd client
   npm install
   ```

   ```bash
   # https://clerk.com/
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # https://uploadthing.com/
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=

   # https://livekit.io/
   NEXT_PUBLIC_LIVEKIT_URL=
   ```

   2.2. Install dependencies for the server and create a `.env` file in the `server` directory and add the following environment variables

   Open a new terminal and run the following commands

   ```bash
   cd server
   npm install
   ```

   ```bash
   # docker-compose.yml
   DATABASE_URL="mysql://root:root@localhost:3306/my_database"

   PORT=5000

   # https://livekit.io/
   LIVEKIT_API_KEY=
   LIVEKIT_API_SECRET=
   NEXT_PUBLIC_LIVEKIT_URL=

   # https://uploadthing.com/
   UPLOADTHING_SECRET=
   UPLOADTHING_APP_ID=
   ```

3. Run docker-compose to start the MySQL database and setup prisma

```bash
docker-compose up -d
```

```bash
npx prisma migrate dev --name init
```

5. Run the project

   5.1. Run the client

   ```bash
   cd client
   npm run dev
   ```

   5.2. Run the server

   ```bash
   cd server
   npm run dev
   ```

6. Open the browser and go to `http://localhost:3000`
