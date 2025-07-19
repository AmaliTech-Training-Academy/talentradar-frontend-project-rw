import { RegisterMock } from "../mock/invite";
import { RegisterFormValues } from "../schemas/register-schema";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";

const useMock = true;
export async function RegisterUser(
  data: RegisterFormValues
): Promise<ApiResponse<null>> {
  if (useMock) {
    return RegisterMock();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/set-password`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return await handleResponse<null>(res);
  } catch (error) {
    return handleError(error);
  }
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
