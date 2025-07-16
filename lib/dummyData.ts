import { Dimension } from "./types"
export const dimensions: Dimension[]  = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    dimension_name: "Technical Skills",
    description:
      "Proficiency in programming languages, frameworks, and technical problem-solving",
    Weight: "30",
    criteria: [
      {
        id: "660e8400-e29b-41d4-a716-446655440000",
        criteria_name: "Code Quality",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440001",
        criteria_name: "Best Practices",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440002",
        criteria_name: "System Architecture",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440003",
        criteria_name: "Testing & Debugging",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440004",
        criteria_name: "Performance Optimization",
      },
    ],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    dimension_name: "Communication",
    description:
      "Ability to articulate ideas clearly and collaborate effectively",
    Weight: "20",
    criteria: [
      {
        id: "660e8400-e29b-41d4-a716-446655440005",
        criteria_name: "Stakeholder Communication",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440006",
        criteria_name: "Team Collaboration",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440007",
        criteria_name: "Documentation",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440008",
        criteria_name: "Knowledge Sharing",
      },
    ],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    dimension_name: "Problem Solving",
    description: "Analytical thinking and approach to resolving complex issues",
    Weight: "50",
    criteria: [
      {
        id: "660e8400-e29b-41d4-a716-446655440009",
        criteria_name: "Root Cause Analysis",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440010",
        criteria_name: "Critical Thinking",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440011",
        criteria_name: "Innovation",
      },
      {
        id: "660e8400-e29b-41d4-a716-446655440012",
        criteria_name: "Decision Making",
      },
    ],
  },
];

export const users: User[] = [
  {
    id: "1",
    name: "Jane Doe",
    email: "jane.doe@company.com",
    joinDate: "15/01/2024",
    avatar: "/avatars/jane.png",
    role: "Frontend Developer"
  },
  {
    id: "2",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    joinDate: "01/02/2024",
    avatar: "/avatars/alex.png",
    role: "Backend Developer"
  },
  {
    id: "3",
    name: "David Park",
    email: "david.park@company.com",
    joinDate: "01/03/2022",
    avatar: "/avatars/david.png",
    role: "Full Stack Developer"
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    joinDate: "20/06/2023",
    avatar: "/avatars/sarah.png",
    role: "UI/UX Designer"
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@company.com",
    joinDate: "10/04/2023",
    avatar: "/avatars/michael.png",
    role: "DevOps Engineer"
  },
  {
    id: "6",
    name: "Emma Wilson",
    email: "emma.wilson@company.com",
    joinDate: "05/08/2023",
    avatar: "/avatars/emma.png",
    role: "QA Engineer"
  },
  {
    id: "7",
    name: "Ryan Martinez",
    email: "ryan.martinez@company.com",
    joinDate: "15/09/2023",
    avatar: "/avatars/ryan.png",
    role: "Mobile Developer"
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa.taylor@company.com",
    joinDate: "03/11/2023",
    avatar: "/avatars/lisa.png",
    role: "Data Engineer"
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james.anderson@company.com",
    joinDate: "22/07/2023",
    avatar: "/avatars/james.png",
    role: "Cloud Architect"
  },
  {
    id: "10",
    name: "Sophie Garcia",
    email: "sophie.garcia@company.com",
    joinDate: "12/12/2023",
    avatar: "/avatars/sophie.png",
    role: "Security Engineer"
  }
];

export const commentTypes = [
  {
    comment_id: "1",
    comment_title: "Key Strengths & Achievements",
    placeholder: "Highlight specific strengths, achievements, and exceptional contributions. Include concrete examples and measurable impacts..."
  },
  {
    comment_id: "2",
    comment_title: "Development Opportunities",
    placeholder: "Identify specific areas for growth and development. Provide constructive feedback with actionable suggestions..."
  },
  {
    comment_id: "3",
    comment_title: "Development Goals & Action Plan",
    placeholder: "Define specific, measurable development goals for the next quarter. Include recommended training, projects, or experiences that will support growth..."
  },

];

