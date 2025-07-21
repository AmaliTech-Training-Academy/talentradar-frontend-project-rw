import { RoleEnum } from "./user-slice"

export interface JwtPayload {
  userId: string
  role: RoleEnum
}

export interface ProtectedRoute {
  title: string
  url: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  icon?: any 
  role: RoleEnum[]
}
