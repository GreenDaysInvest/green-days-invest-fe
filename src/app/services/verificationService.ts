import axiosInstance from "./api";

const VerificationService = {
  uploadDocument: async (documentUrl: File): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    const formData = new FormData();
    formData.append("documentUrl", documentUrl);

    const response = await axiosInstance.post("/verification/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
  getVerificationStatus: async (userId: string): Promise<string> => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data.verificationStatus;
  }
}

export default VerificationService;
