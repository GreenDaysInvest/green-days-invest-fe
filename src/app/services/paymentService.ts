import axiosInstance from "./api";

const PaymentService = {
  createPaymentIntent: async (userId: string, amount: number): Promise<string> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    const response = await axiosInstance.post(
      "/payments/create-intent",
      {
        userId,
        amount: amount * 100, // Convert amount to cents
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.clientSecret;
  },

  generatePayPalToken: async (): Promise<string> => {
    const response = await axiosInstance.post("/payments/generate-token");
    return response.data.accessToken;
  },
  
  // createPayPalOrder: async (userId: string, amount: number): Promise<string> => {
  //   const token = localStorage.getItem('token');
  //   if (!token) throw new Error("Token not found");
  //   const response = await axiosInstance.post(
  //     "/payments/paypal/create-order",
  //     { userId, amount },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   return response.data.orderId; // Return PayPal order ID
  // },

  // capturePayPalOrder: async (orderId: string): Promise<void> => {
  //   const token = localStorage.getItem('token');
  //   if (!token) throw new Error("Token not found");
  //   await axiosInstance.post(
  //     `/payments/paypal/capture-order/${orderId}`,
  //     {},
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  // },
};

export default PaymentService;
