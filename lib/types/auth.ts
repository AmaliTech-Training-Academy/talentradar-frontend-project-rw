import { type JWTPayload } from "jose"
import { RoleEnum } from "./user-slice"

export interface CustomJwtPayload extends JWTPayload {
  userId: string
  role: RoleEnum
  fullName: string
  email: string
}

export interface ProtectedRoute {
  title: string
  url: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon?: any 
  role: RoleEnum[]
}
