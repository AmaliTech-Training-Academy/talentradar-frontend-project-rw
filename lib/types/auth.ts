import { RoleEnum } from "./user-slice"

export interface JwtPayload {
  userId: string
  role: RoleEnum
}

export interface ProtectedRoute {
  title: string
  url: string
  icon?: any // Lucide icon component
  role: RoleEnum[]
}
