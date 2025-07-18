import { Activity, Award, Code, Target, Users } from "lucide-react";

export const infocardData = [
  {
    colors: ["var(--primary)", "var(--green)"],
    title: "Workload balance &  Task Complexity",
    description:
      "measure the ability to manage workload effectively while handling complex tasks",
    Icon: Target,
    trendingVal: 1.4,
  },
  {
    colors: ["var(--orange)", "var(--violet)"],
    title: "Code readability and stability",
    description:
      "Evaluated code maintainability, testing coverage,  and bug frequency",
    Icon: Code,
    trendingVal: 3.1,
  },
  {
    colors: ["var(--teal)", "var(--violet)"],
    title: "Flow efficiency & Predictability",
    description:
      "Tracks development velocity, sprint predictability, and delively  consistency",
    Icon: Activity,
    trendingVal: 2.5,
  },
  {
    colors: ["var(--green)", "var(--teal)"],
    title: "Cross functionality and adaptability",
    description:
      "Assess ability to work across  different  technologies and collaborate effectively",
    Icon: Users,
    trendingVal: 4.3,
  },
  {
    colors: ["var(--primary)", "var(--violet)"],
    title: "Proactive ownership & Business Value",
    description:
      "Measures initiative, business impact awareness,  and value delively",
    Icon: Award,
    trendingVal: 2.4,
  },
];
export type InfoCardDataProps = (typeof infocardData)[0];
