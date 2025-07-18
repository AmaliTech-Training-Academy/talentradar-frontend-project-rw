import { RatingOption } from "./types";

export const RATING_OPTIONS: RatingOption[] = [
  {
    value: 1,
    color: "red",
    title: "Developing",
    desc: "Needs significant guidance",
  },
  {
    value: 2,
    color: "orange",
    title: "Progressing",
    desc: "Requires moderate guidance",
  },
  {
    value: 3,
    color: "yellow",
    title: "Proficient",
    desc: "Works independently",
  },
  { value: 4, color: "blue", title: "Advanced", desc: "Exceeds expectations" },
  { value: 5, color: "green", title: "Expert", desc: "Drives best practices" },
];

export const getRatingTitle = (rating: number): string => {
  return RATING_OPTIONS.find((option) => option.value === rating)?.title || "";
};