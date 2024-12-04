"use client";

import { useDropzone } from "react-dropzone";
import VerificationService from "@/app/services/verificationService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import Button from "../Button/Button";
import { useApp } from "@/app/context/AppContext";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";

const VerificationForm = () => {
  const t = useTranslations("Validation");
  const { setActiveTab } = useApp();
  const { user, updateUser } = useAuth();
  const [document, setDocument] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const checkVerificationStatus = useCallback(async () => {
    try {
      const { isVerified } = await VerificationService.getVerificationStatus();
      if (isVerified) {
        await updateUser();
        showInfoToast(t('verificationSuccessful'));
        setIsVerifying(false);
        setActiveTab('checkout');
      }
    } catch (error) {
      console.error('Error checking verification status:', error);
    }
  }, [updateUser, setActiveTab, t]);

  useEffect(() => {
    let intervalId: number;
    
    if (isVerifying) {
      intervalId = window.setInterval(checkVerificationStatus, 5000);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isVerifying, checkVerificationStatus]);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setDocument(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.birthdate) {
      showErrorToast(t('addBirthdateBeforeVerify'));
      setActiveTab('profile');
      return;
    }
    if (!document) {
      showErrorToast(t('pleaseSelectOrDragDrop'));
      return;
    }

    try {
      setIsUploading(true);
      const response = await VerificationService.uploadDocument(document);
      
      // Open Stripe verification URL in a new tab
      if (response.verificationUrl) {
        window.open(response.verificationUrl, '_blank');
        setIsVerifying(true);
      }
      
      showInfoToast(t('documentUploadedPleaseWait'));
      setDocument(null);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        showErrorToast(errorMessage);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-secondary mb-10">
        Upload Verification Document
      </h2>
      <form onSubmit={handleSubmit}>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-6 mb-4 ${
            isDragActive ? "border-green-500 bg-green-50" : "border-gray-300 bg-gray-100"
          } cursor-pointer text-center`}
        >
          <input {...getInputProps()} />
          {document ? (
            <p className="text-secondary">Selected file: {document.name}</p>
          ) : isDragActive ? (
            <p className="text-secondary">Drop the file here...</p>
          ) : (
            <p className="text-secondary">Drag and drop a file here, or click to select one.</p>
          )}
        </div>
        <Button 
          type="submit" 
          label={isUploading ? "Uploading..." : "Upload"} 
          disabled={isUploading || !document}
        />
      </form>
      {isVerifying && (
        <div className="mt-4 text-center">
          <p className="text-secondary mb-2">Please complete the verification process in the new tab. Once completed, you will be automatically redirected.</p>
        </div>
      )}
    </div>
  );
};

export default VerificationForm;
