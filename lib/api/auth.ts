import { RegisterFormValues } from "../schemas/register-schema";
import { handleError } from "../utils";

export async function RegisterUser(data: RegisterFormValues) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/set-password`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  if (!res.ok) {
    handleError(result.message);
  }
  return result;
}
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  if (!res.ok) {
    handleError(result.message);
  }
  return result;
}
