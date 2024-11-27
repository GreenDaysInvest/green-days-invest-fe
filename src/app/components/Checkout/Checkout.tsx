"use client";

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useBasket } from "@/app/context/BasketContext";
import PaymentService from "@/app/services/paymentService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import axios from "axios";

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
        showErrorToast("Stripe is not loaded yet.")
        return;
    }

    setIsLoading(true);

    try {
      // Step 1: Get total amount and create a payment intent
      const amount = parseFloat(calculateTotal());
      const clientSecret = await PaymentService.createPaymentIntent(amount);

      // Step 2: Confirm payment using Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        showErrorToast(result.error.message || "Payment failed.")
        setMessage(result.error.message || "Payment failed.");
      } else if (result.paymentIntent?.status === "succeeded") {
        showInfoToast("Payment successful!")
        setMessage("Payment successful!");
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error?.response?.data?.message || 'An unexpected error occurred.';
            showErrorToast(errorMessage)
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>
      <form onSubmit={handlePayment}>
        <CardElement className="p-4 border rounded-md mb-4" />
        <div className="mt-4 text-right">
          <p className="text-lg font-semibold mb-4">Total: {calculateTotal()}€</p>
          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="bg-main text-white py-2 px-4 rounded-md"
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
      {message && <p className="mt-4 text-center text-secondary">{message}</p>}
    </div>
  );
};

export default Checkout;
