import { defineConfig } from "@/lib/config";

// Custom branding for PromptForge
const useCloneBranding = true;

export default defineConfig({
  // Branding - PromptForge: Кузница Промптов
  branding: {
    name: "PromptForge",
    logo: "/logo.svg",
    logoDark: "/logo-dark.svg",
    favicon: "/favicon.svg",
    description: "Кузница AI-промптов — создавай, находи и совершенствуй промпты для любого AI",
  },

  // Theme - warm forge-inspired design
  theme: {
    radius: "md",
    variant: "default",
    density: "default",
    colors: {
      primary: "#f59e0b", // Amber/gold - forge fire color
    },
  },

  // Authentication - simple credentials for self-hosted
  auth: {
    providers: ["credentials"],
    allowRegistration: true,
  },

  // Internationalization
  i18n: {
    locales: ["ru", "en", "es", "zh", "ja", "ar", "pt", "fr", "it", "de", "nl", "ko", "tr", "he", "el", "az", "fa"],
    defaultLocale: "ru",
  },

  // Features
  features: {
    privatePrompts: true,
    changeRequests: true,
    categories: true,
    tags: true,
    aiSearch: false,
    aiGeneration: false,
    mcp: false,
    comments: true,
  },

  // Homepage customization - use clone branding
  homepage: {
    useCloneBranding,
    achievements: {
      enabled: false,
    },
    sponsors: {
      enabled: false,
      items: [],
    },
  },
});
