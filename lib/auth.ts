import { jwtVerify } from "jose";
import { CustomJwtPayload } from "./types/auth";
import { RoleEnum } from "./types/user-slice";

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set.");
  }
  return new TextEncoder().encode(secret);
};

export async function verifyAuth(
  token: string
): Promise<CustomJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const typedPayload = payload as CustomJwtPayload;
    return typedPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
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
