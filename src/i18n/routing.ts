import { siteConfig } from "@/config/site";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: siteConfig.locales.map((x, i) => x.code),
  defaultLocale: siteConfig.defaultLocale,
  localePrefix: "as-needed",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
