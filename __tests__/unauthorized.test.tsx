import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UnauthorizedPage from "@/app/unauthorized/page";
import { useRouter } from "next/navigation";
import { vi } from "vitest";

const mockSearchParam = new URLSearchParams({
  error: "Unauthorized access",
});
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParam,
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
}));

describe("UnauthorizedPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the unauthorized page with error message", () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(
      screen.getByText(decodeURIComponent(mockSearchParam.get("error") || ""))
    ).toBeInTheDocument();
  });

  it("navigates to dashboard on button click", async () => {
    render(<UnauthorizedPage />);
    expect(
      screen.getByRole("button", { name: "Return to Dashboard" })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Return to Dashboard" })
    );
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
