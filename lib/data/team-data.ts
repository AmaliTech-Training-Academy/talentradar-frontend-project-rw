import {
  Brain,
  Code,
  Lightbulb,
  LucideIcon,
  MessageSquare,
  Target,
  Users,
} from "lucide-react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType | string;
  overallScore: number;
  percentage: number;
  status: "High Performer" | "Strong" | "Needs Improvement";
  skills: {
    technical: number;
    communication: number;
    collaboration: number;
    execution: number;
    innovation: number;
  };
  stats: {
    aiActions: number;
    onTimeDelivery: number;
    projectsCompleted: number;
  };
  lastUpdated: string;

  overallFeedback: string;

}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior Developer",
    icon: Brain,
    overallScore: 4.3,
    percentage: 87,
    status: "High Performer",
    skills: {
      technical: 4.4,
      communication: 4.0,
      collaboration: 4.1,
      execution: 3.9,
      innovation: 4.5,
    },
    stats: {
      aiActions: 47,
      onTimeDelivery: 91,
      projectsCompleted: 8,
    },
    lastUpdated: "2 hours ago",
    overallFeedback:
      "Sarah demonstrates exceptional technical leadership and innovative problem-solving skills. Her strong execution and collaborative approach make her a key contributor to team success.",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Product Manager",
    icon: Brain,
    overallScore: 4.1,
    percentage: 82,
    status: "High Performer",
    skills: {
      technical: 3.7,
      communication: 4.5,
      collaboration: 4.2,
      execution: 4.1,
      innovation: 3.9,
    },
    stats: {
      aiActions: 52,
      onTimeDelivery: 88,
      projectsCompleted: 12,
    },
    lastUpdated: "1 hour ago",
    overallFeedback:
      "Michael demonstrates strong technical skills and reliable project delivery. His communication and collaboration abilities continue to improve, making him a valuable team contributor.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "UX Designer",
    icon: Brain,
    overallScore: 4.3,
    percentage: 86,
    status: "High Performer",
    skills: {
      technical: 3.8,
      communication: 4.7,
      collaboration: 4.4,
      execution: 4.2,
      innovation: 4.1,
    },
    stats: {
      aiActions: 39,
      onTimeDelivery: 94,
      projectsCompleted: 6,
    },
    lastUpdated: "3 hours ago",
    overallFeedback:
      "Emily excels in user experience design with outstanding communication and collaboration skills. Her innovative approach to UX challenges consistently delivers user-centered solutions.",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Data Scientist",
    icon: Brain,
    overallScore: 4.1,
    percentage: 83,
    status: "High Performer",
    skills: {
      technical: 4.6,
      communication: 3.8,
      collaboration: 3.7,
      execution: 4.4,
      innovation: 4.3,
    },
    stats: {
      aiActions: 61,
      onTimeDelivery: 89,
      projectsCompleted: 9,
    },
    lastUpdated: "4 hours ago",
    overallFeedback:
      "David shows exceptional technical prowess and innovation in data science. His execution is strong, but there's an opportunity to enhance collaboration and communication within cross-functional teams.",
  },
  {
    id: "5",
    name: "Lisa Wang",
    role: "Frontend Developer",
    icon: Brain,
    overallScore: 3.9,
    percentage: 78,
    status: "Strong",
    skills: {
      technical: 4.2,
      communication: 3.6,
      collaboration: 3.9,
      execution: 3.8,
      innovation: 4.0,
    },
    stats: {
      aiActions: 33,
      onTimeDelivery: 85,
      projectsCompleted: 7,
    },
    lastUpdated: "5 hours ago",
    overallFeedback:
      "Lisa shows strong technical abilities in frontend development with good innovation skills. There's room for growth in communication and collaboration to reach her full potential.",
  },
  {
    id: "6",
    name: "Alex Thompson",
    role: "DevOps Engineer",
    icon: Brain,
    overallScore: 4.2,
    percentage: 84,
    status: "High Performer",
    skills: {
      technical: 4.5,
      communication: 3.9,
      collaboration: 4.0,
      execution: 4.3,
      innovation: 4.1,
    },
    stats: {
      aiActions: 45,
      onTimeDelivery: 92,
      projectsCompleted: 11,
    },
    lastUpdated: "6 hours ago",
    overallFeedback:
      "Alex brings excellent technical expertise and strong execution skills to DevOps operations. His reliability in project delivery and innovative approaches to infrastructure challenges are commendable.",
  },
  {
    id: "7",
    name: "James Wilson",
    role: "Junior Developer",
    icon: Brain,
    overallScore: 2.8,
    percentage: 56,
    status: "Needs Improvement",
    skills: {
      technical: 2.9,
      communication: 2.5,
      collaboration: 3.1,
      execution: 2.7,
      innovation: 2.8,
    },
    stats: {
      aiActions: 18,
      onTimeDelivery: 67,
      projectsCompleted: 3,
    },
    lastUpdated: "1 hour ago",
    overallFeedback:
      "James is developing his technical skills and shows potential for growth. With continued mentoring and focus on communication and collaboration, he can become a strong team contributor.",
  },
];

interface SkillConfig {
  label: string;
  color: string;
  description: string;
  Icon: LucideIcon;
}

export const skillConfig: Record<string, SkillConfig> = {
  technical: {
    label: "Technical Excellence",
    color: "bg-primary",
    description: "Code quality, architecture, and technical innovation",
    Icon: Code,
  },
  communication: {
    label: "Communication",
    color: "bg-green",
    description: "Stakeholder engagement and knowledge sharing",
    Icon: MessageSquare,
  },
  collaboration: {
    label: "Collaboration",
    color: "bg-violet",
    description: "Team dynamics and mentoring capabilities",
    Icon: Users,
  },
  execution: {
    label: "Execution",
    color: "bg-orange",
    description: "Project delivery and business impact",
    Icon: Target,
  },
  innovation: {
    label: "Innovation",
    color: "bg-teal",
    description: "Learning agility and change leadership",
    Icon: Lightbulb,
  },
};

export const statsConfig = [
  { key: "aiActions", label: "AI Actions", color: "text-primary" },
  {
    key: "onTimeDelivery",
    label: "On-time Delivery",
    color: "text-green",
    suffix: "%",
  },
  {
    key: "projectsCompleted",
    label: "Projects Completed",
    color: "text-violet",
  },
];

export const skillLabels = {
  technical: "Technical Excellence",
  communication: "Communication",
  collaboration: "Collaboration",
  execution: "Execution",
  innovation: "Innovation",
};

export const skillColors = {
  technical: "bg-primary",
  communication: "bg-green",
  collaboration: "bg-violet",
  execution: "bg-orange-500",
  innovation: "bg-teal",
};
