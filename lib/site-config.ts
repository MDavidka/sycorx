import type { Metadata } from "next"

export const siteConfig = {
  "name": "sycord+",
  "tagline": "Next-generation cloud hosting for modern developers.",
  "description": "Deploy, scale, and manage your applications globally with zero configuration. Experience lightning-fast edge infrastructure built for the future.",
  "audience": "Developers, startups, and enterprise engineering teams.",
  "category": null,
  "logoUrl": "https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!w700wp",
  "logoInitials": "S",
  "navLinks": [
    {
      "label": "Home",
      "href": "/"
    },
    {
      "label": "Features",
      "href": "/features"
    },
    {
      "label": "Pricing",
      "href": "/pricing"
    },
    {
      "label": "Dashboard",
      "href": "/dashboard"
    }
  ],
  "primaryCta": {
    "label": "Start Deploying",
    "href": "/login"
  },
  "secondaryCta": {
    "label": "View Documentation",
    "href": "/features"
  },
  "footerCta": {
    "label": "Deploy Now",
    "href": "/login"
  },
  "socialLinks": [
    {
      "label": "GitHub",
      "href": "#"
    },
    {
      "label": "Twitter",
      "href": "#"
    }
  ],
  "contact": {
    "email": "support@sycord.plus"
  },
  "themePreset": "saas",
  "integrations": [
    {
      "kind": "database",
      "name": "Turso",
      "provider": "turso",
      "reason": "Required by strict system rules for database persistence.",
      "envVars": [
        "TURSO_DATABASE_URL",
        "TURSO_AUTH_TOKEN"
      ]
    },
    {
      "kind": "database",
      "name": "MongoDB",
      "provider": "mongodb",
      "reason": "Existing environment variable context for primary application data.",
      "envVars": [
        "MONGODB_URI"
      ]
    }
  ],
  "needsDatabase": true,
  "databaseProvider": "turso"
} as const

export type SiteConfig = typeof siteConfig

export function pageMetadata(input: { title: string; description: string }): Metadata {
  return {
    title: `${input.title} — ${siteConfig.name}`,
    description: input.description,
  }
}
