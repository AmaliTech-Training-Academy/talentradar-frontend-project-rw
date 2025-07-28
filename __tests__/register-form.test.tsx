import { beforeEach, it, vi } from "vitest";
import { RegisterForm } from "@/app/(auth)/components/register-form";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () =>
      new URLSearchParams({
        token: "abc123",
        email: "test@example.com",
      }),
  };
});

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders form with email pre-filled", async () => {
    render(<RegisterForm />);

    expect(screen.getByPlaceholderText("email")).toHaveValue(
      "test@example.com"
    );
    expect(screen.getByTestId("register-button")).toBeInTheDocument();
  });
  it("shows validation errors for missing fields", async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByTestId("register-button"));

    expect(
      await screen.findByText(/Field cannot be empty/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must be at least 8 characters long/i)
    ).toBeInTheDocument();
  });
  it("submits form and redirects on success", async () => {  vi.spyOn(toast, "success");
  vi.spyOn(toast, "success");
    render(<RegisterForm />);
    

    fireEvent.input(screen.getByPlaceholderText("John Doe"), {
      target: { value: "John Test" },
    });

    fireEvent.input(screen.getByTestId("password"), {
      target: { value: "Test@123" },
    });

    fireEvent.input(screen.getByTestId("conf-password"), {
      target: { value: "Test@123" },
    });

    fireEvent.click(screen.getByTestId("register-button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Account set successfully");
    });
  });
});
