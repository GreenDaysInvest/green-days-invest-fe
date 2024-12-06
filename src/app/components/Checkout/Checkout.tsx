"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useBasket } from "@/app/context/BasketContext";
import PaymentService from "@/app/services/paymentService";
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
      throw new Error("Failed to capture PayPal order");
    }

    const data = await response.json();
    console.log("PayPal Order Capture Response:", data);

    return data;
  } catch (error) {
    console.error("Error during PayPal order capture:", error);
    throw new Error("Failed to capture PayPal order");
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
      capturePayPalOrder(orderId);
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
            // createOrder={async (data, actions) => {
            //   const amount = parseFloat(pricePerService);
            //   console.log("PayPal createOrder triggered with amount:", amount);
            
            //   try {
            //     // Call your backend to create the PayPal order
            //     const orderId = await PaymentService.createPayPalOrder(String(user?.id), amount);
            
            //     if (!orderId) {
            //       throw new Error("Failed to create PayPal order");
            //     }
            
            //     return orderId; // Ensure it's a valid string
            //   } catch (error) {
            //     console.error("Error creating PayPal order:", error);
            //     throw new Error("Error creating PayPal order"); // Ensure an error is thrown if something goes wrong
            //   }
            // }}
            createOrder={async (data, actions) => {
              const amount = parseFloat(pricePerService);
              console.log("PayPal createOrder triggered with amount:", amount);

              // Use `actions` as a fallback for testing
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

              if (actions.order) {
                const details = await actions.order.capture();
                console.log("PayPal Order Captured Details:", details);
                handlePayPalSuccess(data.orderID!);
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
