import { RegisterFormValues } from "../schemas/register-schema";

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
    throw new Error(result.message || "An unknown error occurred");
  }
  return result;
}
