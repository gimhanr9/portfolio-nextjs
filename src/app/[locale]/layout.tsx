import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ReactNode } from "react";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { inter } from "../fonts";
import { notFound } from "next/navigation";

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
