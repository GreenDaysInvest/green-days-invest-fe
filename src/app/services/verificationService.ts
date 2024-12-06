import axiosInstance from "./api";

const VerificationService = {
  // Create a new verification session with Stripe
  createVerificationSession: async (): Promise<{ clientSecret: string; url: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");

    const response = await axiosInstance.post("/verification/create-session", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  // Method to get the user's verification status
  getVerificationStatus: async (): Promise<{ isVerified: boolean; error?: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");

    const response = await axiosInstance.get('/verification/status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

export default VerificationService;
