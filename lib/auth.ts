import { betterAuth } from "better-auth"
import { Pool } from "pg"

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.BETTER_AUTH_DATABASE_URL,
  }),
  socialProviders: {
    google: {
      profile: "select_account",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3001",
  trustedOrigins: [
    "http://localhost:3001",
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL ||  "http://localhost:3001" // Backend URL
  ].filter(Boolean) as string[],
})

export type Session = typeof auth.$Infer.Session
