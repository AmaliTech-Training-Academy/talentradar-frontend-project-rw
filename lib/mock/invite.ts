import { User } from "../types";
import { InviteRes } from "../types/invite";
import { ApiResponse } from "../types/response";
export async function sendInviteMock(
  email: string
): Promise<ApiResponse<InviteRes>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Invite sent",
        data: {
          id: "b2e472f7-5358-4522-8c30-4d5e4bbfb304",
          email,
          status: "ACTIVE",
          roleName: "DEVELOPER",
          invitation:
            "hgutruydfuguyuiykuguyfytsrtewreteutuy6iuykjgvutdytegryutuyh",
        },
      });
    }, 300);
  });
}
export async function RegisterMock(): Promise<ApiResponse<null>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Registration successful",
        data: null,
      });
    }, 300);
  });
}
