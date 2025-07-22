import { jwtVerify } from "jose";
import { CustomJwtPayload } from "./types/auth";

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set.");
  }
  return new TextEncoder().encode(secret);
};

export async function verifyAuth(token: string): Promise<CustomJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    const typedPayload = payload as CustomJwtPayload;
    return typedPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
