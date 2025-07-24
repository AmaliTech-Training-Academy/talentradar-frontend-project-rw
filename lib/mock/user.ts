import { User } from "../types";
import { ApiResponse } from "../types/response";
export async function getUsersMock(): Promise<ApiResponse<User[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: [
          {
            id: "1",
            name: "Alice Johnson",
            fullName: "Alice Johnson",
            email: "alice.johnson@example.com",
            joinDate: "2023-09-15T10:00:00Z",
            avatar: "https://i.pravatar.cc/150?img=1",
            role: "Admin",
            username: "alice.johnson",
          },
          {
            id: "2",
            name: "Brian Smith",
            fullName: "Brian Smith",
            email: "brian.smith@example.com",
            joinDate: "2023-11-02T14:30:00Z",
            avatar: "https://i.pravatar.cc/150?img=2",
            role: "Manager",
            username: "brian.smith",
          },
          {
            id: "3",
            name: "Cynthia Lee",
            fullName: "Cynthia Lee",
            email: "cynthia.lee@example.com",
            joinDate: "2024-01-10T08:45:00Z",
            avatar: "https://i.pravatar.cc/150?img=3",
            role: "User",
            username: "cynthia.lee",
          },
        ],
      });
    }, 300);
  });
}
