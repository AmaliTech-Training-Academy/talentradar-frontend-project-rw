import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { toast } from "sonner";
import { InviteForm } from "@/app/dashboard/security/components/invite-form";

vi.mock("sonner", () => ({
  toast: {
    message: vi.fn(),
    error: vi.fn(),
  },
}));

describe("InviteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders when open", async () => {
    render(<InviteForm isOpen={true} />);
    expect(await screen.findByText("Add a user")).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty fields", async () => {
    render(<InviteForm isOpen={true} />);
    const button = await screen.findByTestId("invite-button");
    fireEvent.click(button);

    expect(
      await screen.findByText(/Please enter a valid email address/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Role is required/i)).toBeInTheDocument();
  });

  it("submits valid data and shows success toast", async () => {
    render(<InviteForm isOpen={true} />);
    fireEvent.input(await screen.findByPlaceholderText("m@example.com"), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(await screen.findByText("Select role"));
    fireEvent.click(screen.getByRole("option", { name: "Admin" }));

    const button = await screen.findByTestId("invite-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.message).toHaveBeenCalledWith(
        "Invite sent!",
        expect.anything()
      );
    });
  });

  it("shows error toast on invite failure", async () => {
    render(<InviteForm isOpen={true} />);
    fireEvent.input(await screen.findByPlaceholderText("m@example.com"), {
      target: { value: "fail@example.com" },
    });

    fireEvent.click(await screen.findByText("Select role"));
    fireEvent.click(screen.getByRole("option", { name: "Admin" }));

    const button = await screen.findByTestId("invite-button");
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong");
    });
  });
});
