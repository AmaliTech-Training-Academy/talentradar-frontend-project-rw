import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillItem } from "@/app/dashboard/ai-scores/components/skill-item";

// Mock Icon component
import { forwardRef } from "react";
import { LucideProps } from "lucide-react";

const MockIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg data-testid="mock-icon" ref={ref} {...props} />
));

describe("SkillItem", () => {
  it("should render the skill label and score", () => {
    render(
      <SkillItem
        label="technicalSkill"
        score={4}
        color="bg-blue-500"
        Icon={MockIcon}
      />
    );
    // Label should be converted from camelCase to words
    expect(screen.getByText("Technical Skill")).toBeInTheDocument();
    // Score should be rendered
    expect(screen.getByText("4")).toBeInTheDocument();
    // Icon should be rendered
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("should render the progress bar with the correct value", () => {
    render(
      <SkillItem
        label="communication"
        score={3}
        color="bg-green-500"
        Icon={MockIcon}
      />
    );
    // The Progress component should have value={(score / 5) * 100}
    // Since Progress is a custom component, check for the style or value prop
    const progressBar = screen.getByRole("progressbar", { hidden: true });
    // The Progress component uses style transform: translateX(-{100 - value}%)
    // For score=3, value should be 60
    expect(progressBar.firstChild).toHaveStyle(
      "transform: translateX(-40%)"
    );
  });
});