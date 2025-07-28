import { http, HttpResponse } from "msw";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const handlers = [
  http.post(
    `${API_URL}/auth/invite`,
    async ({ request }: { request: Request }) => {
      const body = await request.clone().json();
      if (body.email === "fail@example.com") {
        return HttpResponse.json(
          { success: false, message: "Something went wrong" },
          { status: 400 }
        );
      }

      return HttpResponse.json(
        { success: true, message: `Invite sent!` },
        { status: 200 }
      );
    }
  ),
  http.get(`${API_URL}/roles`, async () => {
    return HttpResponse.json(
      {
        success: true,
        message: `roles retrieved`,
        data: { roles: [{ id: "1", roleName: "Admin" }] },
      },
      { status: 200 }
    );
  }),
  http.patch(`${API_URL}/auth/complete-registration`, async () => {
    console.log("Complete registration called");
    return HttpResponse.json(
      { success: true, message: `Registration completed!` },
      { status: 200 }
    );
  }),
];
