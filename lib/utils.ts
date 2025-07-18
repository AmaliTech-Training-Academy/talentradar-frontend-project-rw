import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiResponse, ErrorResponse } from "./types/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown): ErrorResponse => {
  const message = error instanceof Error ? error.message : "An unknown error occurred";
  return { success: false, message };
}

// Handle fetch response
export const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  const data = await res.json();

  if (!res.ok) {
    const message = data.message ?? "An unknown error occurred";
    return {
      success: false,
      message,
    };
  }

  return {
    success: true,
    data,
    message: data.message,
  };
};