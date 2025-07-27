import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
vi.mock("@/lib/api/auth", () => ({
  handleSignIn: vi.fn(),
}));

import { LoginForm } from "@/app/(auth)/components/login-form";
import * as authApi from "@/lib/api/auth";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => "/login",
  useSearchParams: () => new URLSearchParams(),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the login form", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should show validation errors for empty fields", async () => {
    render(<LoginForm />);
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should call handleSignIn on form submission", async () => {
    const handleSignInSpy = vi.spyOn(authApi, "handleSignIn");
    handleSignInSpy.mockResolvedValue({
      success: true,
      error: "",
    });
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(handleSignInSpy).toHaveBeenCalled();
      expect(handleSignInSpy).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      );
    });
  });
  it("should show an error message on failed login", async () => {
    const handleSignInSpy = vi.spyOn(authApi, "handleSignIn");
    handleSignInSpy.mockResolvedValue({
      success: false,
      error: "Invalid credentials",
    });
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled();
      expect(handleSignInSpy).toHaveBeenCalled();
    });
  });
});
