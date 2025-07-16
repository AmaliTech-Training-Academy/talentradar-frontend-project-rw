"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function usePagination(paramKey = "page") {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get(paramKey) || "0", 10);

  const setPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, page.toString());
    router.push(`?${params.toString()}`);
  };

  return { currentPage, setPage };
}
