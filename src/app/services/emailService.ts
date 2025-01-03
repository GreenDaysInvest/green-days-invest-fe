import axios from 'axios';

// In production, this should be your backend API URL (e.g., https://api.green-days-invest.com)
const API_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'production'
    ? 'https://api.green-days-invest.com'  // Replace with your production API URL
    : 'http://localhost:3000'
);

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const EmailService = {
  sendPaymentConfirmation: async (email: string, paymentMethod: 'stripe' | 'paypal', amount: number) => {
    try {
      console.log('Sending payment confirmation email:', {
        email,
        paymentMethod,
        amount,
        apiUrl: API_URL,
        environment: process.env.NODE_ENV
      });

      const payload: EmailPayload = {
        to: email,
        subject: 'Payment Confirmation - Green Days Invest',
        text: `Thank you for your payment of ${amount} via ${paymentMethod}. Your transaction was successful.`,
        html: `
          <h1>Payment Confirmation</h1>
          <p>Thank you for your payment!</p>
          <p>Amount: ${amount}</p>
          <p>Payment Method: ${paymentMethod}</p>
          <p>Status: Successful</p>
          <br/>
          <p>Thank you for choosing Green Days Invest!</p>
        `
      };

      console.log('Making API request to:', `${API_URL}/email/send-payment-confirmation`);
      
      const response = await axios.post(`${API_URL}/email/send-payment-confirmation`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
        withCredentials: true // Important for CORS with credentials
      });

      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending payment confirmation email:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      throw error;
    }
  }
};

export default EmailService;
