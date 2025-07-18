import { Session } from "../types/sessions";

export const sessions: Session[] = [
  {
    id: "s1",
    user: {
      id: "u1",
      fullName: "John Doe",
      email: "johndoe@gmail.com",
    },
    userId: "u1",
    ipAddress: "192.168.0.101",
    deviceInfo: "Chrome on Windows 10",
    active: true,
    sessionId: "sess_abc123",
    createdAt: "2024-10-01T09:15:00Z",
  },
  {
    id: "s2",
    user: {
      id: "u1",
      fullName: "John Doe",
      email: "johndoe@gmail.com",
    },
    userId: "u1",
    ipAddress: "192.168.0.101",
    deviceInfo: "Chrome on Windows 10",
    active: true,
    sessionId: "sess_abc123",
    createdAt: "2024-10-01T09:15:00Z",
  },
  {
    id: "s3",
    user: {
      id: "u1",
      fullName: "John Doe",
      email: "johndoe@gmail.com",
    },
    userId: "u1",
    ipAddress: "192.168.0.101",
    deviceInfo: "Chrome on Windows 10",
    active: true,
    sessionId: "sess_abc123",
    createdAt: "2024-10-01T09:15:00Z",
  },
];

export const userData = [
  {
    id: "sess_005",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: true,
    role: "Developer",
  },
  {
    id: "sess_006",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: true,
    role: "Admin",
  },
  {
    id: "sess_007",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: false,
    role: "Developer",
  },
  {
    id: "sess_008",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: true,
    role: "Manager",
  },
  {
    id: "sess_009",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: false,
    role: "Manager",
  },
  {
    id: "sess_0010",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: false,
    role: "Manager",
  },
  {
    id: "sess_011",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: false,
    role: "Developer",
  },
  {
    id: "sess_012",
    full_name: "user_004",
    email: "johndoe@gmail.com",
    date_added: "2025-07-15T08:00:00Z",
    status: false,
    role: "Manager",
  },
];
