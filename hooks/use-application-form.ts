"use client";

import { useState, useEffect } from "react";

interface FormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;

  // Academic Information
  school: string;
  gpa: string;
  graduationYear: string;
  satScore: string;

  // Documents
  transcript: File | null;
  recommendations: File | null;
  additionalDocs: File | null;

  // Essays
  personalStatement: string;
  whyCollege: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  school: "",
  gpa: "",
  graduationYear: "",
  satScore: "",
  transcript: null,
  recommendations: null,
  additionalDocs: null,
  personalStatement: "",
  whyCollege: "",
};

export function useApplicationForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("applicationDraft");
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData({ ...initialFormData, ...parsedDraft });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("applicationDraft", JSON.stringify(formData));
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const completenessSections = {
    personal: !!(
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone
    ),
    academic: !!(formData.school && formData.gpa && formData.graduationYear),
    documents: !!(formData.transcript && formData.recommendations),
    essays: !!(formData.personalStatement && formData.whyCollege),
  };

  const completedSections =
    Object.values(completenessSections).filter(Boolean).length;

  const completeness = {
    ...completenessSections,
    overall:
      (completedSections / Object.keys(completenessSections).length) * 100,
  };

  return {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    completeness,
  };
}
