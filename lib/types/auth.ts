import { type JWTPayload } from "jose";
import { RoleEnum } from "./user-slice";
import { DefaultSession } from "next-auth";
export interface CustomJwtPayload extends JWTPayload {
  userId: string;
  role: RoleEnum;
  fullName: string;
  email: string;
}

export interface ProtectedRoute {
  title: string;
  url: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon?: any;
  role: RoleEnum[];
}
export interface LoginResponse {
  status: boolean;
  message: string;
  errors: { message: string }[] | null;
  data: {
    user: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      role: RoleEnum;
    };
  };
}
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      fullName: string;
      email: string;
      role: RoleEnum;
      token: string;
    } & DefaultSession["user"];
  }
}
