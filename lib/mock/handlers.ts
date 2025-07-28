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
    return HttpResponse.json(
      { success: true, message: `Registration completed!` },
      { status: 200 }
    );
  }),
  http.get(new RegExp("/ws-notifications/.*"), () => {
    return HttpResponse.json({});
  }),
  http.get(`${API_URL}/dimensions`, async () => {
    return HttpResponse.json(
      {
        success: true,
        message: `dimensions retrieved`,
        data: [
          {
            id: "550e8400-e29b-41d4-a716-446655440001",
            dimensionName: "Technical Excellence",
            description:
              "Mastery of programming languages, frameworks, architecture patterns",
            weight: 25.0,
            gradingCriteria: [
              {
                id: "550e8400-e29b-41d4-a716-446655440010",
                criteriaName: "Code quality and maintainability",
              },
              {
                id: "550e8400-e29b-41d4-a716-446655440011",
                criteriaName: "Technology stack proficiency",
              },
            ],
          },
        ],
      },
      { status: 200 }
    );
  }),
];
