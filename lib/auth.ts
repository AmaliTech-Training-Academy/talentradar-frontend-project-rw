import { RoleEnum } from "./types/user-slice";

export function setDemoData(email: string) {
  if (email === "manager@gmail.com") {
    return {
      id: "1",
      email: "admin@gmail.com",
      username: "manager",
      fullName: "Manager Demo",
      role: RoleEnum.MANAGER,
      token: "token",
    };
  }
  else if (email === "developer@gmail.com") {
    return {
      id: "1",
      email: "admin@gmail.com",
      username: "developer",
      fullName: "Developer Demo",
      role: RoleEnum.DEVELOPER,
     token: "token",
    };
  }
  else if (email === "admin@gmail.com") {
    return {
      id: "1",
      email: "admin@gmail.com",
      username: "admin",
      fullName: "Admin Demo",
      role: RoleEnum.ADMIN,
      token: "token",
    };
  }
  return null;
}
