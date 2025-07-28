// describe("Auth API", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it("should complete registration successfully", async () => {
//     const mockData = {
//       token: "test-token",
//       password: "password123",
//       confirmPassword: "password123",
//       fullName: "Test User",
//     };
//     const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
//       ok: true,
//       json: async () => null,
//     } as Response);

//     const result = await authApi.completeRegistration(mockData);
//     expect(fetchMock).toHaveBeenCalledWith(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/complete-registration?token=${mockData.token}`,
//       expect.objectContaining({
//         method: "PATCH",
//         body: JSON.stringify(mockData),
//       })
//     );
//     expect(result).toBeNull();
//   });

//   it("should handle sign in successfully", async () => {
//     const email = "email@gmailm.com";
//       const password = "password123";
//     const mockResponse = {
//       status: true,
//       data: {
//         user: { id: "1", email },
//       },
//       errors: [],
//       };
//     const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue({
//       ok: true,
//       json: async () => mockResponse,
//     } as Response);
//     const signInMock = vi.spyOn(nextAuth, "signIn").mockResolvedValue({
//       ok: true,
//       error: null,
//     } as any);
