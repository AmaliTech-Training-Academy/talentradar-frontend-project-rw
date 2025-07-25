import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";
import { setDemoData } from "./lib/auth";
export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      authorize: async (credentials) => {
        const { email, user: receivedUser } = credentials as {
          email: string;
          user: string;
        };
        const demoData = setDemoData(email);
        if (demoData) return demoData;
        const user: LoginResponse["data"]["user"] = JSON.parse(
          receivedUser || "{}"
        );
        return user;
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
