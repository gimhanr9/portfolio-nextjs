export const siteConfig = {
  name: "Gimhan Rodrigo",
  url: "https://gimhanrodrigo.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description: "My portfolio built using Next.js",
  locales: [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
  ],
  defaultLocale: "en",
  localePrefix: "as-needed",
  socialLinks: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/gimhanr9",
  },
};

export type SiteConfig = typeof siteConfig;
