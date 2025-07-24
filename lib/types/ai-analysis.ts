import {
  LucideIcon,
  MessageSquare,
  Users,
  Lightbulb,
  Code,
  MessagesSquare,
} from "lucide-react";

export interface AverageScores {
  [key: string]: number;
}

export interface UserSummary {
  userId: string;
  icon: React.ElementType | string;
  readinessScore: number;
  performanceLevel: string;
  averageScores: AverageScores;
  overallFeedback: string;
}

interface SkillConfig {
  label: string;
  color: string;
  Icon: LucideIcon;
}

export const skillConfig: Record<string, SkillConfig> = {
  communicationcollaboration: {
    label: "Communication and Collaboration",
    color: "bg-primary",
    Icon: MessageSquare,
  },
  executionresults: {
    label: "Execution Results",
    color: "bg-green",
    Icon: MessageSquare,
  },
  teamdynamicsleadership: {
    label: "Team Work",
    color: "bg-violet",
    Icon: Users,
  },
  growthinnovation: {
    label: "Growth and Innovation",
    color: "bg-orange",
    Icon: Lightbulb,
  },
  technicalexcellence: {
    label: "Techical Exellence",
    color: "bg-teal",
    Icon: Code,
  },
};

export const configColors = [
  {
    icon: MessageSquare,
    color: "bg-green",
  },
  {
    icon: Users,
    color: "bg-violet",
  },
  {
    icon: Lightbulb,
    color: "bg-teal",
  },
  {
    icon: MessagesSquare,
    color: "bg-primary",
  },
  {
    icon: Lightbulb,
    color: "bg-orange",
  },
];
