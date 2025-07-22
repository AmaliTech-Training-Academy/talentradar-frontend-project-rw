import {
  Home,
  BarChartIcon as ChartColumn,
  Map,
  UserCheck,
  FileText,
  Brain,
  MessageSquare,
  Bell,
  GitBranch,
  BarChartBigIcon as ChartBarBig,
  Settings,
} from "lucide-react";
import { RoleEnum } from "../types/user-slice";
import { ProtectedRoute } from "../types/auth";

export const protectedRoutes: ProtectedRoute[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  {
    title: "Productivity Scorecard",
    url: "/dashboard/productivity-scorecard",
    icon: ChartColumn,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "AI Roadmap & Tests",
    url: "/dashboard/ai-roadmap", // Changed to a concrete URL for middleware
    icon: Map,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "Security Dashboard",
    url: "/dashboard/security",
    icon: UserCheck,
    role: [RoleEnum.ADMIN],
  },
  {
    title: "Self-assessment",
    url: "/dashboard/self-assessment",
    icon: FileText,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "AI Score",
    url: "/dashboard/ai-scores",
    icon: Brain,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER],
  },
  {
    title: "Manager Feedback",
    url: "/dashboard/manager-feedback",
    icon: MessageSquare,
    role: [RoleEnum.MANAGER],
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: Bell,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  {
    title: "Developer Flow",
    url: "/dashboard/developer-flow",
    icon: GitBranch,
    role: [RoleEnum.DEVELOPER],
  },
  {
    title: "Micro services",
    url: "/dashboard/microservices",
    icon: ChartBarBig,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    role: [RoleEnum.DEVELOPER, RoleEnum.MANAGER, RoleEnum.ADMIN],
  },
];

export const publicPaths = ["/", "/login", "/register", "/unauthorized"];

