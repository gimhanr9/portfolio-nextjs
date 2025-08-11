"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFoundPage() {
  const t = useTranslations("notFound");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md mx-auto">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-black text-muted-foreground/10 blur-sm">
            404
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-muted/30 backdrop-blur-sm border border-border/50 rounded-full p-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-muted/70 border border-border/50 rounded-lg text-foreground font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("goBack")}
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Home className="w-4 h-4" />
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
