import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";

import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { inter } from "../fonts";
import { notFound } from "next/navigation";
import "../globals.css"; // Import the global CSS here as well
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/config/site";

// Metadata for the entire site
export const metadata = {
  title: {
    default: `${siteConfig.name} | Full Stack Developer`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Portfolio of a Full Stack Developer specializing in modern web technologies, CI/CD, and testing.",
  keywords: [
    "developer",
    "portfolio",
    "full stack",
    "web development",
    "CI/CD",
    "testing",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Full Stack Developer`,
    description:
      "Portfolio of a Full Stack Developer specializing in modern web technologies, CI/CD, and testing.",
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Full Stack Developer`,
    description:
      "Portfolio of a Full Stack Developer specializing in modern web technologies, CI/CD, and testing.",
    creator: "@yourtwitterhandle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

type Props = {
  children: ReactNode;
  params: { locale: string };
};

const LocaleLayout = async ({ children, params: { locale } }: Props) => {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
