import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const EmailService = {
  sendPaymentConfirmation: async (email: string, paymentMethod: 'stripe' | 'paypal', amount: number) => {
    try {
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

      const response = await axios.post(`${API_URL}/email/send-payment-confirmation`, payload);
      return response.data;
    } catch (error) {
      console.error('Error sending payment confirmation email:', error);
      throw error;
    }
  }
};

export default EmailService;
