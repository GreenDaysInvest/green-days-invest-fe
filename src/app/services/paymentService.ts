import axiosInstance from "./api";

const PaymentService = {
    createPaymentIntent: async (amount: number): Promise<string> => {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token not found");
        const response = await axiosInstance.post("/payments/create-intent", {
            amount: amount * 100, // Convert amount to cents
        }, {
            headers: {
              Authorization: `Bearer ${token}`
            },
        });
        return response.data.clientSecret;
    }
}

export default PaymentService;
