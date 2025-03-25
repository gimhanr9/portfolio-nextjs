"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const LocalizedNotFound = () => {
  const router = useRouter();
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        {/* Animated 404 Text */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-8xl font-extrabold text-transparent">
            404
          </h1>
        </motion.div>

        {/* Animated Illustration */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative h-40 w-40">
            <div className="absolute inset-0 animate-morph rounded-full bg-gradient-to-r from-teal-500/20 to-purple-500/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="h-24 w-24 text-muted-foreground"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          className="mb-8 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("goBack")}
          </Button>
          <Button asChild className="gap-2">
            <Link href={`/${t("locale")}`}>
              <Home className="h-4 w-4" />
              {t("backToHome")}
            </Link>
          </Button>
        </motion.div>

        {/* Suggested Links */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            {t("suggestedLinks")}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Button variant="link" asChild size="sm">
              <Link href={`/${t("locale")}/#projects`}>{t("projects")}</Link>
            </Button>
            <Button variant="link" asChild size="sm">
              <Link href={`/${t("locale")}/#about`}>{t("about")}</Link>
            </Button>
            <Button variant="link" asChild size="sm">
              <Link href={`/${t("locale")}/#contact`}>{t("contact")}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LocalizedNotFound;
