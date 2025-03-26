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
  github: {
    token: process.env.GITHUB_TOKEN,
    repoOwner: process.env.REPO_OWNER ?? "gimhanr9",
    repoName: process.env.REPO_NAME ?? "portfolio-nextjs",
  },

  // SonarQube configuration
  sonar: {
    token: process.env.SONAR_TOKEN,
    projectKey: process.env.SONAR_PROJECT_KEY ?? "gimhanr9_portfolio-nextjs",
  },

  // Resend email configuration
  email: {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.FROM_EMAIL ?? "gimhanrg@gmail.com",
    toEmail: process.env.TO_EMAIL ?? "gimhanr9@gmail.com",
  },

  urls: {
    github: "https://github.com",
    githubApi: "https://api.github.com",
    sonarCloud: "https://sonarcloud.io",
    sonarCloudApi: "https://sonarcloud.io/api",
    portfolio: process.env.PORTFOLIO_URL ?? "https://gimhanrodrigo.com",
  },

  // Environment
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

export type SiteConfig = typeof siteConfig;
