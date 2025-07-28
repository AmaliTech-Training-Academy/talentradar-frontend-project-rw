import React from "react";
import { render, screen } from "@testing-library/react";
import { SkillItem } from "@/app/dashboard/ai-scores/components/skill-item";
import { forwardRef } from "react";
import { LucideProps } from "lucide-react";

const MockIcon = forwardRef<SVGSVGElement, LucideProps>((props, ref) => (
  <svg data-testid="mock-icon" ref={ref} {...props} />
));

describe("SkillItem", () => {
  it("renders skill label, score, and icon", () => {
    render(
      <SkillItem
        label="Technical Skill"
        score={4}
        color="bg-blue-500"
        Icon={MockIcon}
      />
    );

    expect(screen.getByText("Technical Skill")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("renders progress bar with correct transform", () => {
    render(
      <SkillItem
        label="communication"
        score={3}
        color="bg-green-500"
        Icon={MockIcon}
      />
    );

    const progressBar = screen.getByRole("progressbar", { hidden: true });
    const innerBar = progressBar.querySelector("div");

    expect(innerBar).toHaveStyle("transform: translateX(-40%)");
  });
});
