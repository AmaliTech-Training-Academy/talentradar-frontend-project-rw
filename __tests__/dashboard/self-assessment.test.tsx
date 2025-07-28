import { describe, it, expect, vi, beforeEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import SelfAssessmentPage from "@/app/dashboard/self-assessment/page";
import { toast } from "sonner";

vi.mock("sonner", () => ({
  toast: {
    message: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock ConfirmationModal
vi.mock("@/app/dashboard/components/confirmation-modal", () => ({
  ConfirmationModal: () => (
    <div data-testid="confirmation-modal">Confirmation Modal</div>
  ),
}));

// Mock RatingSelector
vi.mock("@/app/dashboard/manager-feedback/components/rating-selector", () => ({
  default: () => <div data-testid="rating-selector">Rating Selector</div>,
}));

describe("SelfAssessmentPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders loading spinner initially", async () => { 
    render(<SelfAssessmentPage />);
    expect(await screen.findByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders heading text after loading", async () => {
    render(<SelfAssessmentPage />);
    expect(
      await screen.findByText("Professional Self-Assessment")
    ).toBeInTheDocument();
  });

  it("renders Submit Assessment button", async () => {
    render(<SelfAssessmentPage />);
    expect(
      await screen.findByRole("button", { name: /submit assessment/i })
    ).toBeInTheDocument();
  });

  it("shows validation error if ratings are not selected", async () => {
    render(<SelfAssessmentPage />);

    const submitButton = await screen.findByTestId("submit-assessment-button");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please fix all validation errors before submitting"
      );
    });
  });

});
