"use client";

import VerificationService from "@/app/services/verificationService";
import { showErrorToast, showInfoToast } from "@/app/utils/toast";
import axios from "axios";
import React, { useState } from "react";

const VerificationForm = () => {
  const [document, setDocument] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocument(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!document) {
      setMessage("Please select a document to upload.");
      showErrorToast("Please select a document to upload.")
      return;
    }

    try {
      await VerificationService.uploadDocument(document);
      setMessage("Document uploaded successfully. Awaiting review.");
      showInfoToast("Document uploaded successfully. Awaiting review.")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error,"error")
          const errorMessage = error?.response?.data?.message || 'An unexpected error occurred.';
          showErrorToast(errorMessage)
      }
    }
  };

  return (
    <div>
      <h2>Upload Verification Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerificationForm;
