// import { auth } from "@/auth";
// import { getSession, useSession } from "next-auth/react";
// import { Session } from "next-auth";
// interface FetchWithTokenOptions extends RequestInit {}

// export const fetchWithToken = async (
//   url: string,
//   options: FetchWithTokenOptions
// ): Promise<Response> => {
//   const isServer: boolean = typeof window === "undefined";
//   let session: Session | null;
//   if (isServer) session = await auth();
//   else {
//     session = await getSession();
//   }
//   const res: Response = await fetch(url, {
//     headers: {
//       Cookie: `token=${session?.user.token}`,
//       "Authorization": `Bearer ${session?.user.token}`,
//     },
//     ...options

//   });

//   return res;
// };
