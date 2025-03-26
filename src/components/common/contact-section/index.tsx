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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        throw new Error(data?.error || t("form.errors.sendFailed"));
      }

      // Success
      setIsSuccess(true);
      toast({
        title: t("form.success.title"),
        description: t("form.success.description"),
        variant: "default",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Contact form submission error:", error);

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
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
          <CheckIcon className="h-4 w-4" />
          {t("form.buttons.sent")}
        </span>
      );
    } else {
      return t("form.buttons.send");
    }
  };

  return (
    <div className="container px-4 md:px-6">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          {t("title")}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {t("description")}
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                {t("form.labels.name")}
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.placeholders.name")}
                className={errors.name ? "border-destructive" : ""}
                disabled={isSubmitting || isSuccess}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t("form.labels.email")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.placeholders.email")}
                className={errors.email ? "border-destructive" : ""}
                disabled={isSubmitting || isSuccess}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                {t("form.labels.message")}
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("form.placeholders.message")}
                className={`min-h-[150px] ${
                  errors.message ? "border-destructive" : ""
                }`}
                disabled={isSubmitting || isSuccess}
              />
              {errors.message && (
                <p className="text-sm text-destructive">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12"
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
