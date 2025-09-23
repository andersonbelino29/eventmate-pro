import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    dialect: "sqlite",
    url: ":memory:", // For development - replace with real DB in production
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  organization: {
    enabled: true,
    allowUserToCreateOrganization: true,
    requireInvitation: false,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
// Organization will be added when better-auth is properly configured