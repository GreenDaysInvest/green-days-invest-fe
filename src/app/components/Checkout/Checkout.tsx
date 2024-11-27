"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useBasket } from "@/app/context/BasketContext";
import PaymentService from "@/app/services/paymentService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import axios from "axios";
import Button from "../Button/Button";

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { basket } = useBasket();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    return basket
      .reduce((total, item) => {
        const itemPrice = parseFloat(item.flower.price.replace(/[^\d,]/g, "").replace(",", "."));
        return total + itemPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      showErrorToast("Stripe is not loaded yet.");
      return;
    }

    setIsLoading(true);

    try {
      const amount = parseFloat(calculateTotal());
      const clientSecret = await PaymentService.createPaymentIntent(amount);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        showErrorToast(result.error.message || "Payment failed.");
        setMessage(result.error.message || "Payment failed.");
      } else if (result.paymentIntent?.status === "succeeded") {
        showInfoToast("Payment successful!");
        setMessage("Payment successful!");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        showErrorToast(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-secondary mb-6">Checkout</h2>
      <form onSubmit={handlePayment}>
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
            Total: <span className="font-bold">{calculateTotal()}€</span>
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
          label={isLoading ? "Processing..." : "Pay Now"}
        />
      </form>
      {message && (
        <p
          className={`mt-6 text-center text-sm ${
            message.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Checkout;
