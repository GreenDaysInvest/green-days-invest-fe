"use client";

import { useDropzone } from "react-dropzone";
import VerificationService from "@/app/services/verificationService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import axios from "axios";
import React, { useState } from "react";
import Button from "../Button/Button";
import { useApp } from "@/app/context/AppContext";
import { useAuth } from "@/app/context/AuthContext";
import { useTranslations } from "next-intl";

const VerificationForm = () => {

  const t = useTranslations("Validation");
  const { setActiveTab } = useApp();
  const { user } = useAuth(); 
  const [document, setDocument] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setDocument(acceptedFiles[0]);
      setMessage("");
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
      setActiveTab('profile')
      return;
    }
    if (!document) {
      showErrorToast(t('pleaseSelectOrDragDrop'));
      return;
    }

    try {
      await VerificationService.uploadDocument(document);
      showInfoToast(t('uploadedSucessfulWaitForReview'));
      setDocument(null);
      setActiveTab('checkout');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        showErrorToast(errorMessage);
      }
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
        <Button type="submit" label="Upload" />
      </form>
      {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default VerificationForm;
