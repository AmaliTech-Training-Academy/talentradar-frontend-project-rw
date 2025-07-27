import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { sendInvite } from "@/lib/api/invite";
import { getRoles } from "@/lib/api/role";
import { toast } from "sonner";
import { InviteForm } from "@/app/dashboard/security/components/invite-form";

// vi.mock("@/lib/api/role", () => ({
//   getRoles: vi.fn(),
// }));
vi.mock("sonner", () => ({
  toast: {
    message: vi.fn(),
    error: vi.fn(),
  },
}));

describe("InviteForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // (getRoles as any).mockResolvedValue({
    //   success: true,
    //   data: {
    //     data: {
    //       roles: [{ id: "1", roleName: "Admin" }],
    //     },
    //   },
    // });
  });

  it("renders when open", async () => {
    render(<InviteForm isOpen={true} />);
    expect(await screen.findByText("Add a user")).toBeInTheDocument();
  });

  it("shows validation errors on submit with empty fields", async () => {
    render(<InviteForm isOpen={true} />);
    const button = await screen.findByRole("button", { name: /send invite/i });
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

    const button = screen.getByRole("button", { name: /send invite/i });
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

    fireEvent.click(screen.getByRole("button", { name: /send invite/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong");
    });
  });
});
