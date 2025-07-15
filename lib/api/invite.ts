import { InviteFormValues } from "../schemas/invite-schema";

export async function sendInvite(data: InviteFormValues) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/users`,
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
