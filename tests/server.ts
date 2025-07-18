import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const handlers = [
    http.get(`${API_BASE}/notifications`, async ({ request }) => {
        const url = new URL(request.url);
        const status = url.searchParams.get("status");
        const category = url.searchParams.get("category");

        if (status === "UNREAD" && category === "ALL") {
            return HttpResponse.json({
                success: true,
                data: {
                    items: [/* your 3 mock notifications */],
                    pagination: {
                        page: 1,
                        size: 10,
                        totalElements: 3,
                        totalPages: 1,
                        hasNext: false,
                        hasPrevious: false,
                    },
                },
            });
        }

        return HttpResponse.json(
            { success: false, message: "Not Found" },
            { status: 404 }
        );
    }),

    http.patch(`${API_BASE}/notifications/:id/read`, async ({ params }) => {
        return HttpResponse.json({
            success: true,
            data: {
                id: params.id,
            },
            message: "Notification marked as read",
        });
    }),

    http.patch(`${API_BASE}/notifications/:id/dismiss`, async ({ params }) => {
        return HttpResponse.json({
            success: true,
            data: {
                id: params.id
            },
            message: "Notification dismissed",
        });
    }),
];

export const server = setupServer(...handlers);