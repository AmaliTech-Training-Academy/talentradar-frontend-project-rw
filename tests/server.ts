import { setupServer } from "msw/node";
import { rest } from "msw";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const handlers = [
  rest.get(`${API_BASE}/notifications`, (req, res, ctx) => {
    const url = new URL(req.url.toString());
    const status = url.searchParams.get("status");
    const category = url.searchParams.get("category");

    if (status === "UNREAD" && category === "ALL") {
      return res(
        ctx.json({
          success: true,
          data: {
            items: [
              /* your 3 mock notifications */
            ],
            pagination: {
              page: 1,
              size: 10,
              totalElements: 3,
              totalPages: 1,
              hasNext: false,
              hasPrevious: false,
            },
          },
        })
      );
    }

    return res(
      ctx.status(404),
      ctx.json({ success: false, message: "Not Found" })
    );
  }),

  rest.patch(`${API_BASE}/notifications/:id/read`, (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.json({
        success: true,
        data: { id },
        message: "Notification marked as read",
      })
    );
  }),

  rest.patch(`${API_BASE}/notifications/:id/dismiss`, (req, res, ctx) => {
    const { id } = req.params as { id: string };
    return res(
      ctx.json({
        success: true,
        data: { id },
        message: "Notification dismissed",
      })
    );
  }),
];

export const server = setupServer(...handlers);
