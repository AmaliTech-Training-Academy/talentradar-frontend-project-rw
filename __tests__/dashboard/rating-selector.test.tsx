import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RatingSelector from "@/app/dashboard/manager-feedback/components/rating-selector";
import { RatingOption } from "@/lib/types";

const mockOptions: RatingOption[] = [
  {
    value: 1,
    title: "Beginner",
    desc: "Just getting started",
    color: "red",
  },
  {
    value: 2,
    title: "Learning",
    desc: "Some experience",
    color: "orange",
  },
  {
    value: 3,
    title: "Intermediate",
    desc: "Good grasp of concepts",
    color: "yellow",
  },
  {
    value: 4,
    title: "Advanced",
    desc: "Very confident",
    color: "blue",
  },
  {
    value: 5,
    title: "Expert",
    desc: "Master of this area",
    color: "green",
  },
];

describe("RatingSelector", () => {
  it("should render all rating options", () => {
    const mockSelect = vi.fn();
    render(<RatingSelector options={mockOptions} selected={0} onSelectAction={mockSelect} />);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.title)).toBeInTheDocument();
      expect(screen.getByText(option.desc)).toBeInTheDocument();
    });
  });

  it("should call onSelectAction with correct value when clicked", () => {
    const mockSelect = vi.fn();
    render(<RatingSelector options={mockOptions} selected={0} onSelectAction={mockSelect} />);

    const ratingButton = screen.getByText("Intermediate"); // value 3
    fireEvent.click(ratingButton);

    expect(mockSelect).toHaveBeenCalledWith(3);
  });

});
