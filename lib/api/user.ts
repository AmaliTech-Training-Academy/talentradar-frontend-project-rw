import { User } from "../types";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAllUsers = async (): Promise<ApiResponse<{data: {users: User[]}}>> => {
  try {
    const res = await fetch(`${API_BASE}/users`, {
      credentials: "include",
    });
    return await handleResponse<{data: {users: User[]}}>(res);
  } catch (err) {
    return handleError(err);
  }
};

