import { jwtVerify, type JWTPayload } from "jose"
import { TextEncoder } from "util"

const getSecretKey = () => {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET environment variable is not set.")
  }
  return new TextEncoder().encode(secret)// itt  expects the secret to be a Uint8Array
}

export async function verifyAuth(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey())
    return payload
  } catch (error) {
    console.error("JWT verification failed:", error)
    return null
  }
}
