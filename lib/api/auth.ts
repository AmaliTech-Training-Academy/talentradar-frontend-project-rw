import { RegisterMock } from "../mock/invite";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";

const useMock = false;
export async function RegisterUser(data: {
  password: string;
  confirmPassword?: string;
  token: string;
  fullName: string;
}): Promise<ApiResponse<null>> {
  if (useMock) {
    return RegisterMock();
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/complete-registration?token=${data.token}`,
      {
        method:"PATCH",
        body: JSON.stringify({
          password: data.password,
          confirmPassword: data.confirmPassword,
          fullName: data.fullName,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    }
  );
  const result = await res.json();
  if (!res.ok) {
    handleError(result.message);
  }
  return result;
}
