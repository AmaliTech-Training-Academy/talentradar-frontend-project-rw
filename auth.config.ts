import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginUser, RegisterUser } from "./lib/api/auth";
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
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const demoData = setDemoData(email);
        if (demoData) return demoData;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({ email, password }),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "X-Requested-With": "XMLHttpRequest",
            },
          }
        );
        if (!res.ok) return null;
        const response: LoginResponse = await res.json();
        const token = res.headers
          .get("set-cookie")
          ?.split("=")[1]
          ?.split(";")[0];
        // Return only the user object as expected by NextAuth
        return { ...response.data.user, token };
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
