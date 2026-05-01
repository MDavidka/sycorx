import type { Metadata } from "next"

export const siteConfig = {
  "name": "sycord+",
  "tagline": "Next-generation hosting for Discord bots and apps.",
  "description": "High-performance, always-on hosting tailored for Discord developers. Deploy Node.js, Python, and Rust bots in seconds with zero server configuration.",
  "audience": "Discord bot developers, community managers, and indie hackers.",
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
      "label": "Contact",
      "href": "/contact"
    }
  ],
  "primaryCta": {
    "label": "Deploy Now",
    "href": "/pricing"
  },
  "secondaryCta": {
    "label": "View Docs",
    "href": "/features"
  },
  "footerCta": {
    "label": "Start Hosting Free",
    "href": "/pricing"
  },
  "socialLinks": [
    {
      "label": "Twitter",
      "href": "https://twitter.com"
    },
    {
      "label": "GitHub",
      "href": "https://github.com"
    },
    {
      "label": "Discord",
      "href": "https://discord.com"
    }
  ],
  "contact": {
    "email": "support@sycord.plus"
  },
  "themePreset": "saas",
  "integrations": [],
  "needsDatabase": false,
  "databaseProvider": "none"
} as const

export type SiteConfig = typeof siteConfig

export function pageMetadata(input: { title: string; description: string }): Metadata {
  return {
    title: `${input.title} — ${siteConfig.name}`,
    description: input.description,
  }
}
