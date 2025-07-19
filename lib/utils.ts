import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ApiResponse } from "./types/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = <T>(error: unknown): ApiResponse<T> => {
  const message = error instanceof Error ? error.message : "An unknown error occurred";
  console.log('Error: ', message);
  return {
    success: false,
    message,
    data: null,
    errors: message,
  };
}

// Handle fetch response
export const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  try {
    const data = await res.json();
    return {
      success: res.ok,
      data: res.ok ? (data.data as T) : null,
      message: data.message,
      errors: data.errors || null,
    };
  } catch {
    return {
      success: false,
      data: null,
      message: "Invalid server response",
      errors: null,
    };
  }
};