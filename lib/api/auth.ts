import { RegisterMock } from "../mock/invite";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";
import { LoginResponse } from "../types/auth";
import { signIn } from "next-auth/react";

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
        method: "PATCH",
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

export const handleSignIn = async (
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    }
  );
  const data: LoginResponse = await res.json();
  if (!res.ok || !data.status || !data.data?.user) {
    return {
      success: false,
      error: data.errors?.[0]?.message || "Login failed",
    };
  }
  console.log("Response login data; ", data);

  const nextAuthRes = await signIn("credentials", {
    email,
    user: JSON.stringify(data.data.user),
    redirect: false,
  });

  if (nextAuthRes?.error) {
    return { success: false, error: nextAuthRes.error };
  }

  return { success: true };
};
