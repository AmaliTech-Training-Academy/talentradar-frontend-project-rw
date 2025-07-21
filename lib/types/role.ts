export enum role {
  ADMIN = "admin",
  DEVELOPER = "developer",
  MANAGER = "manager",
}

export interface RolesResponse {
  roles: {
    id: string;
    roleName: string;
  }[];
}
