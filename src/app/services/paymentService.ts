import axiosInstance from "./api";

const PaymentService = {
  createPaymentIntent: async (amount: number): Promise<string> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    const response = await axiosInstance.post(
      "/payments/create-intent",
      {
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

  createPayPalOrder: async (amount: number): Promise<string> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    const response = await axiosInstance.post(
      "/payments/paypal/create-order",
      { amount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.orderId; // Return PayPal order ID
  },

  capturePayPalOrder: async (orderId: string): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error("Token not found");
    await axiosInstance.post(
      `/payments/paypal/capture-order/${orderId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};

export default PaymentService;
