export enum role {
  ADMIN = "admin",
  DEVELOPER = "developer",
  MANAGER = "manager",
}

export interface RolesResponse {
  data:{

    roles: {
      id: string;
      roleName: string;
    }[];
  }
}
