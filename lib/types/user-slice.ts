export interface AuthState {
  id: string | null;
  email: string | null;
  role: RoleEnum | null;
  userName: string | null;
  isAuthenticated: boolean;
}

export enum RoleEnum {
  ADMIN = "admin",
  DEVELOPER = "developer",
  MANAGER = "manager",
}
