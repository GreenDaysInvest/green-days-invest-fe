"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useBasket } from "@/app/context/BasketContext";
import PaymentService from "@/app/services/paymentService";
import EmailService from "@/app/services/emailService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import axios from "axios";
import Button from "../Button/Button";
import { useTranslations } from "next-intl";
import { useAuth } from "@/app/context/AuthContext";
import { useApp } from "@/app/context/AppContext";

const capturePayPalOrder = async (orderId: string) => {
  try {
    // Fetch the token from the backend
    const accessToken = await PaymentService.generatePayPalToken();

    // First, check the order status
    const checkResponse = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const orderData = await checkResponse.json();
    console.log("PayPal Order Status:", orderData.status);

    // If order is already captured, return the order data
    if (orderData.status === 'COMPLETED') {
      return orderData;
    }

    // If not captured, proceed with capture
    const response = await fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error capturing PayPal order:", errorData);
      
      // If the order was already captured, this is not an error
      if (errorData.details?.[0]?.issue === 'ORDER_ALREADY_CAPTURED') {
        console.log("Order was already captured, proceeding with success flow");
        return orderData;
      }
      
      throw new Error("Failed to capture PayPal order");
    }

    const data = await response.json();
    console.log("PayPal Order Capture Response:", data);
    return data;
  } catch (error) {
    console.error("Error during PayPal order capture:", error);
    throw error;
  }
};


const Checkout = () => {

  const t = useTranslations("Checkout");
  const stripe = useStripe();
  const elements = useElements();
  const { setActiveTab } = useApp();
  const { user } = useAuth();
  const { pricePerService, setBasket, clearBasket } = useBasket();
  const [isLoading, setIsLoading] = useState(false);

  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      showErrorToast(t("stripeIsNotLoaded"));
      return;
    }

    setIsLoading(true);

    try {
      const amount = parseFloat(pricePerService);
      const clientSecret = await PaymentService.createPaymentIntent(String(user?.id), amount);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        showErrorToast(result.error.message || "Payment failed.");
      } else if (result.paymentIntent?.status === "succeeded") {
        await EmailService.sendPaymentConfirmation(user?.email || '', 'stripe', amount);
        showInfoToast(t("paymentSuccessful"));
        clearBasket()
        setActiveTab('basket')
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred.";
        showErrorToast(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayPalSuccess = async (orderId: string) => {
    try {
      await capturePayPalOrder(orderId);
      const amount = parseFloat(pricePerService);
      await EmailService.sendPaymentConfirmation(user?.email || '', 'paypal', amount);
      showInfoToast(t("paymentSuccessful"));
      clearBasket()
      setActiveTab('basket')
    } catch (error) {
      showErrorToast(t("paypalCaptureFailed"));
    }
  };

  const handlePayPalError = () => {
    showErrorToast(t("paypalPaymentFailed"));
  };
  
  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">
        {t("title")}
      </h2>

      {/* Stripe Payment Form */}
      <form onSubmit={handleStripePayment}>
        <div className="mb-6">
          <CardElement
            className="p-4 border border-gray-300 rounded-md shadow-sm"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <div className="text-right mb-4">
          <p className="text-lg font-medium text-gray-700">
            {t("total")}: <span className="font-bold">{pricePerService}€</span>
          </p>
        </div>
        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className={`w-full py-3 px-6 text-white font-semibold rounded-md transition duration-300 ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          label={isLoading ? t("processing") : t("payWithStripe")}
        />
      </form>

      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!, currency: "EUR" }}
      >
        <div className="mt-6">

          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={async (data, actions) => {
              const amount = parseFloat(pricePerService);
              console.log("PayPal createOrder triggered with amount:", amount);

              return await actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "EUR",
                      value: amount.toString(),
                    },
                  },
                ],
                intent: "CAPTURE"
              });
            }}
            onApprove={async (data, actions) => {
              console.log("PayPal onApprove triggered:", data);
              try {
                // Let PayPal SDK handle the capture
                const details = await actions?.order?.capture();
                console.log("PayPal Order Captured Details:", details);
                
                // Process our backend success flow without additional capture
                await handlePayPalSuccess(data.orderID!);
                
                showInfoToast(t("paymentSuccessful"));
              } catch (error) {
                console.error("Error in PayPal approval flow:", error);
                handlePayPalError();
              }
            }}
            onError={(err) => {
              console.error("PayPal onError:", err);
              handlePayPalError();
            }}
            onInit={() => console.log("PayPal Buttons Initialized")}
            onClick={() => console.log("PayPal Button Clicked")}
          />
        </div>
      </PayPalScriptProvider>
    </div>
  );
};

export default Checkout;
