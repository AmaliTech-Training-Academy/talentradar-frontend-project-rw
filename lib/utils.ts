import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { FetchResponse } from "./types/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleApiError(error: unknown): FetchResponse<null> {
  if (error instanceof Error) {
    return { success: false, message: error.message, data: null };
  }
  return { success: false, message: "Unexpected error occurred", data: null };
}