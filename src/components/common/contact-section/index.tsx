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

const ContactSection = () => {
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
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setIsSuccess(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={errors.name ? "border-destructive" : ""}
          disabled={isSubmitting || isSuccess}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          className={errors.email ? "border-destructive" : ""}
          disabled={isSubmitting || isSuccess}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
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
        {isSubmitting ? (
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
            Sending...
          </span>
        ) : isSuccess ? (
          <span className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4" />
            Sent!
          </span>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
};

export default ContactSection;
