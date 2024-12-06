"use client";

import React, { useState, useEffect, useCallback } from "react";
import Button from "../Button/Button";
import { useApp } from "@/app/context/AppContext";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import VerificationService from "@/app/services/verificationService";
import { loadStripe } from "@stripe/stripe-js";
import { Loader } from "../Loader/Loader";

const VerificationForm = () => {
  const t = useTranslations("Validation");
  const { setActiveTab } = useApp();
  const { user, updateUser } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkVerificationStatus = useCallback(async () => {
    try {
      const { isVerified, error } = await VerificationService.getVerificationStatus();
      
      if (error && error !== 'Verification is still processing') {
        showErrorToast(error);
        setVerificationError(error);
        setIsVerifying(false);
        setIsCheckingStatus(false);
        setIsLoading(false);
        return;
      }
      
      if (isVerified) {
        await updateUser();
        showInfoToast(t('verificationSuccessful'));
        setIsVerifying(false);
        setIsCheckingStatus(false);
        setIsLoading(false);
        setActiveTab('checkout');
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
      showErrorToast(t('verificationError'));
      setIsVerifying(false);
      setIsCheckingStatus(false);
      setIsLoading(false);
    }
  }, [updateUser, setActiveTab, t]);

  useEffect(() => {
    let intervalId: number;
    
    if (isCheckingStatus) {
      // Start checking after a delay to allow the verification process to begin
      setTimeout(() => {
        intervalId = window.setInterval(checkVerificationStatus, 5000);
      }, 5000);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isCheckingStatus, checkVerificationStatus]);

  const startVerification = async () => {
    try {
      setIsVerifying(true);
      setVerificationError(null);
      setIsLoading(true);
      
      const { clientSecret, url } = await VerificationService.createVerificationSession();
      
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      setIsLoading(false);
      const { error } = await stripe.verifyIdentity(clientSecret);
      
      if (error) {
        if (error.type === 'validation_error') {
          showErrorToast(t('verificationCanceled'));
        } else {
          showErrorToast(error.message || t('verificationError'));
        }
        setIsVerifying(false);
      } else {
        // Only start checking status after the verification modal is shown
        setIsCheckingStatus(true);
      }
    } catch (error) {
      console.error('Error starting verification:', error);
      showErrorToast(t('verificationError'));
      setIsVerifying(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg">
      <h2 className="text-2xl text-secondary font-bold mb-6">{t('verifyIdentity')}</h2>
      
      <div className="text-center mb-6">
        <p className="text-gray-600 mb-4">{t('verificationDescription')}</p>
        {verificationError && (
          <p className="text-red-500 mb-4">{verificationError}</p>
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <Button
          onClick={startVerification}
          disabled={isVerifying}
          className="w-full max-w-md"
          label={isVerifying ? t('verifying') : t('startVerification')}
        />
      )}
    </div>
  );
};

export default VerificationForm;
