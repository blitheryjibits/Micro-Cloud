import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma/client";

export const auth = betterAuth({
  database: prismaAdapter(prisma),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  user: {
    additionalFields: {
      displayName: { type: "string", required: false, defaultValue: "" },
      role: { type: "string", required: false, defaultValue: "USER" },
    },
  },

  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
  },

  plugins: [nextCookies()],
});
