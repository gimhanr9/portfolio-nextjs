"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckIcon } from "@/lib/icons";
import { FormDataType, FormErrorsType } from "./contact-section.types";
import { useTranslations } from "next-intl";

const ContactSection = () => {
  const t = useTranslations("contact");
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrorsType = {};

    if (!formData.name.trim()) {
      newErrors.name = t("form.errors.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("form.errors.messageRequired");
    } else if (formData.message.trim()?.length < 10) {
      newErrors.message = t("form.errors.messageTooShort");
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormErrorsType]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    // Clear server error when user makes changes
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any previous server errors
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send the form data to our API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Always parse the response, even if it's an error
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        throw new Error("Failed to parse server response");
      }

      if (!response.ok) {
        // Create a detailed error with the message from the API
        const errorMessage = data?.error || t("form.errors.sendFailed");
        setServerError(errorMessage);
        throw new Error(errorMessage);
      }

      // Success
      setIsSuccess(true);
      setServerError(null);
      toast({
        title: t("form.success.title"),
        description: t("form.success.description"),
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Contact form submission error:", error);

      // Set the server error state
      if (!serverError) {
        setServerError(
          error instanceof Error ? error.message : t("form.errors.sendFailed")
        );
      }

      // Ensure the error is displayed to the user
      toast({
        title: t("form.errors.title"),
        description:
          error instanceof Error ? error.message : t("form.errors.sendFailed"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderButtonContent = () => {
    if (isSubmitting) {
      return (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-3 w-3 sm:h-4 sm:w-4"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {t("form.buttons.sending")}
        </span>
      );
    } else if (isSuccess) {
      return (
        <span className="flex items-center gap-2">
          <CheckIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          {t("form.buttons.sent")}
        </span>
      );
    } else {
      return t("form.buttons.send");
    }
  };

  return (
    <div className="container max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4 text-center">
        <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight">
          {t("title")}
        </h2>
        <p className="max-w-[90%] sm:max-w-[85%] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed sm:leading-normal text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="mx-auto mt-6 sm:mt-8 md:mt-10 lg:mt-12 max-w-xl sm:max-w-2xl">
        <div className="rounded-lg border bg-card p-4 sm:p-6 shadow-sm">
          {/* Display server error at the top of the form if present */}
          {serverError && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-md bg-destructive/15 text-destructive">
              <p className="text-xs sm:text-sm font-medium">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium">
                {t("form.labels.name")}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.placeholders.name")}
                className={`text-xs sm:text-sm h-8 sm:h-10 ${
                  errors.name ? "border-destructive" : ""
                }`}
                disabled={isSubmitting || isSuccess}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                {t("form.labels.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.placeholders.email")}
                className={`text-xs sm:text-sm h-8 sm:h-10 ${
                  errors.email ? "border-destructive" : ""
                }`}
                disabled={isSubmitting || isSuccess}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label
                htmlFor="message"
                className="text-xs sm:text-sm font-medium"
              >
                {t("form.labels.message")}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form.placeholders.message")}
                className={`min-h-[100px] sm:min-h-[150px] text-xs sm:text-sm ${
                  errors.message ? "border-destructive" : ""
                }`}
                disabled={isSubmitting || isSuccess}
              />
              {errors.message && (
                <p className="text-xs text-destructive">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-8 sm:h-10 text-xs sm:text-sm"
              disabled={isSubmitting || isSuccess}
            >
              {renderButtonContent()}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
