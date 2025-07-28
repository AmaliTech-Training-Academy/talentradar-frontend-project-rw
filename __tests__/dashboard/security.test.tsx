import { WelcomeCard } from "@/app/dashboard/security/components/welcome-card";
import Page from "@/app/dashboard/security/page";
import { render, screen, act } from "@testing-library/react";

let mockSearchParams = new URLSearchParams({
  tabs: "overview",
});

vitest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => mockSearchParams,
}));

describe("Security Dashboard Page", () => {
  it("Should display the security dashboard page and add user button", () => {
    render(<Page />);
    expect(screen.getByText("Security Dashboard")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add user/i })
    ).toBeInTheDocument();
  });
  it("shouuld display the add user form when the add user button is clicked", () => {
    render(<WelcomeCard />);
    const addUserButton = screen.getByRole("button", { name: /Add user/i });
    act(() => {
      addUserButton.click();
    });
    expect(screen.getByText(/hide/i)).toBeInTheDocument();
  });
});
