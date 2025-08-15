import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { ReactNode } from "react";
import { routing } from "@/i18n/routing";

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
    "Full-Stack Software Engineer with 3+ years of experience in React.js, .NET Core, and cloud platforms. Specializing in scalable web applications, clean code, and performance optimization.",
  keywords: [
    "software engineer",
    "frontend developer",
    "backend developer",
    "portfolio",
    "full stack",
    "web development",
    "React",
    "Next.js",
    "TypeScript",
    ".NET Core",
    "CI/CD",
    "testing",
    "SQL Server",
    "NoSQL",
    "SQL",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }], // Add URL
  creator: siteConfig.name,
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} | Full Stack Developer`,
    description:
      "Full-Stack Software Engineer with 3+ years of experience in React.js, .NET Core, and cloud platforms. Specializing in scalable web applications, clean code, and performance optimization.",
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Portfolio Preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Full Stack Developer`,
    description:
      "Full-Stack Software Engineer with 3+ years of experience in React.js, .NET Core, and cloud platforms. Building scalable, secure web applications.",
    creator: `@${siteConfig.urls.twitter}`,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteConfig.url),
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
              <div className="flex-1">{children}</div>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
