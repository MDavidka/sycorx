import type { Metadata } from "next"

export const siteConfig = {
  "name": "sycord",
  "tagline": "Frictionless Hosting for Modern Apps",
  "description": "Sycord delivers instant deployments, global edge caching, and zero-config scaling for your web apps, APIs, and static sites. Deploy from Git in seconds with built-in previews and rollbacks.",
  "audience": "Developers, startups, and agencies building SaaS, e-commerce, and high-traffic apps",
  "category": null,
  "logoUrl": null,
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
      "label": "Docs",
      "href": "/docs"
    }
  ],
  "primaryCta": {
    "label": "Deploy Now",
    "href": "/signup"
  },
  "secondaryCta": {
    "label": "View Docs",
    "href": "/docs"
  },
  "footerCta": {
    "label": "Start Free Trial",
    "href": "/signup"
  },
  "socialLinks": [
    {
      "label": "GitHub",
      "href": "https://github.com/sycord"
    },
    {
      "label": "Twitter",
      "href": "https://twitter.com/sycord"
    },
    {
      "label": "Discord",
      "href": "https://discord.gg/sycord"
    }
  ],
  "contact": {
    "email": "hello@sycord.com"
  },
  "themePreset": "saas",
  "integrations": [
    {
      "kind": "database",
      "name": "Turso",
      "provider": "turso",
      "reason": "Store user accounts, deployments, billing data, project configs, and usage metrics",
      "envVars": [
        "TURSO_DATABASE_URL",
        "TURSO_AUTH_TOKEN"
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
