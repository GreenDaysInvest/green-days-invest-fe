import axiosInstance from "./api";

const VerificationService = {
  // Method to upload the user's document (ID or Passport)
  uploadDocument: async (documentUrl: File): Promise<{ verificationUrl: string }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");

    const formData = new FormData();
    formData.append("file", documentUrl);

    const response = await axiosInstance.post("/verification/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    // Return the verification URL from Stripe
    return response.data;
  },

  // Method to get the user's verification status
  getVerificationStatus: async (): Promise<{ isVerified: boolean }> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");

    const response = await axiosInstance.get('/verification/status', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  // Poll for verification status
  waitForVerification: async (callback: (status: boolean) => void) => {
    const pollInterval = setInterval(async () => {
      try {
        const { isVerified } = await VerificationService.getVerificationStatus();
        callback(isVerified);
        
        if (isVerified) {
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Error polling verification status:', error);
        clearInterval(pollInterval);
      }
    }, 5000); // Poll every 5 seconds

    // Return the interval ID so it can be cleared if needed
    return pollInterval;
  }
};

export default VerificationService;
