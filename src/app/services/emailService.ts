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

interface ContactFormData {
  name: string;
  email: string;
  message: string;
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
        subject: 'Payment Confirmation - CannabisRezepte24',
        text: `Thank you for your payment of ${amount} via ${paymentMethod}. Your transaction was successful.`,
        html: `
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
                >
                  <!-- Logo Section -->
                  <tr>
                    <td align="center" style="background-color: #f3f3f3; padding: 20px;">
                      <img
                        src="https://www.cannabisrezepte24.de/logo.svg"
                        alt="Green Days Invest Logo"
                        style="max-height: 50px;"
                      />
                    </td>
                  </tr>
                  <!-- Content Section -->
                  <tr>
                    <td style="padding: 20px; font-family: Arial, sans-serif;">
                      <h1 style="color: #333333; font-size: 24px; margin-bottom: 20px;">
                        Zahlungsbestätigung
                      </h1>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        Vielen Dank für Ihre Zahlung!
                      </p>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        Betrag: ${amount}
                      </p>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        Zahlungsmethode: ${paymentMethod}
                      </p>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        Status: Erfolgreich
                      </p>
                      <br />
                      <p style="color: #555555; line-height: 1.6;">
                        Vielen Dank, dass Sie sich für CannabisRezepte24 entschieden haben!
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
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
      throw error;
    }
  },
  sendContactForm: async (data: ContactFormData) => {
    try {
      const payload: EmailPayload = {
        to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'bennedictphiliphanel@gmail.com',
        subject: `Contact Form Submission from ${data.name}`,
        text: `
          Name: ${data.name}
          Email: ${data.email}
          Message: ${data.message}
        `,
        html: `
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; padding: 20px 0;">
            <tr>
              <td align="center">
                <table
                  width="600"
                  cellpadding="0"
                  cellspacing="0"
                  style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);"
                >
                  <!-- Logo Section -->
                  <tr>
                    <td align="center" style="background-color: #f3f3f3; padding: 20px;">
                      <img
                        src="https://www.cannabisrezepte24.de/logo.svg"
                        alt="Green Days Invest Logo"
                        style="max-height: 50px;"
                      />
                    </td>
                  </tr>
                  <!-- Content Section -->
                  <tr>
                    <td style="padding: 20px; font-family: Arial, sans-serif;">
                      <h2 style="color: #333333; font-size: 24px; margin-bottom: 20px;">
                        Neue Kontaktformular-Einreichung
                      </h2>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        <strong>Name:</strong> ${data.name}
                      </p>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        <strong>Email:</strong> ${data.email}
                      </p>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        <strong>Nachricht:</strong>
                      </p>
                      <p style="color: #555555; line-height: 1.6; margin-bottom: 15px;">
                        ${data.message}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        `
      };

      const response = await axios.post(`${API_URL}/email/contact`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
        withCredentials: true
      });

      return response.data;
    } catch (error) {
      console.error('Error sending contact form:', error);
      throw error;
    }
  }
};

export default EmailService;
