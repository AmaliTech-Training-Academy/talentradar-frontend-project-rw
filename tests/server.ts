import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost";

export const handlers = [
    http.get(`${API_BASE}/notifications`, async ({ request }) => {
        return HttpResponse.json({
            success: true,
            data: {
                items: [{ id: "1", title: "Test", content: "Test notification" }],
                meta: {
                    totalItems: 1,
                    itemCount: 1,
                    itemsPerPage: 10,
                    totalPages: 1,
                    currentPage: 1,
                },
            },
        });
    }),

    http.patch(`${API_BASE}/notifications/:id/read`, async ({ params }) => {
        return HttpResponse.json({
            success: true,
            data: { id: params.id, title: "Marked as read" },
        });
    }),

    http.patch(`${API_BASE}/notifications/:id/dismiss`, async ({ params }) => {
        return HttpResponse.json({
            success: true,
            data: { id: params.id, title: "Dismissed" },
        });
    }),
];

export const server = setupServer(...handlers);
