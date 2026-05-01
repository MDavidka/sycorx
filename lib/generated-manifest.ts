// Auto-generated. Snapshot of the design brief, theme tokens and
// page plan that produced this site. Useful for follow-up generation
// passes and for diffing edits between regenerations.
export const generatedManifest = {
  "brief": {
    "projectName": "sycord",
    "tagline": "Frictionless Hosting for Modern Apps",
    "description": "Sycord delivers instant deployments, global edge caching, and zero-config scaling for your web apps, APIs, and static sites. Deploy from Git in seconds with built-in previews and rollbacks.",
    "audience": "Developers, startups, and agencies building SaaS, e-commerce, and high-traffic apps",
    "voice": "Confident, technical, approachable",
    "themePreset": "saas",
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
    "contact": {
      "email": "hello@sycord.com"
    },
    "logoInitials": "S",
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
    ]
  },
  "theme": {
    "preset": "saas",
    "light": {
      "background": "0 0% 100%",
      "foreground": "240 10% 8%",
      "card": "0 0% 100%",
      "cardForeground": "240 10% 8%",
      "popover": "0 0% 100%",
      "popoverForeground": "240 10% 8%",
      "primary": "232 80% 56%",
      "primaryForeground": "0 0% 100%",
      "secondary": "240 5% 96%",
      "secondaryForeground": "240 6% 14%",
      "muted": "240 5% 96%",
      "mutedForeground": "240 4% 46%",
      "accent": "210 100% 96%",
      "accentForeground": "232 80% 30%",
      "destructive": "0 84% 60%",
      "destructiveForeground": "0 0% 98%",
      "border": "240 6% 90%",
      "input": "240 6% 90%",
      "ring": "232 80% 56%"
    },
    "dark": {
      "background": "240 10% 6%",
      "foreground": "0 0% 98%",
      "card": "240 8% 9%",
      "cardForeground": "0 0% 98%",
      "popover": "240 8% 9%",
      "popoverForeground": "0 0% 98%",
      "primary": "232 90% 70%",
      "primaryForeground": "240 10% 6%",
      "secondary": "240 5% 14%",
      "secondaryForeground": "0 0% 98%",
      "muted": "240 5% 14%",
      "mutedForeground": "240 5% 65%",
      "accent": "232 60% 16%",
      "accentForeground": "232 90% 90%",
      "destructive": "0 72% 51%",
      "destructiveForeground": "0 0% 98%",
      "border": "240 5% 18%",
      "input": "240 5% 18%",
      "ring": "232 90% 70%"
    },
    "radius": "0.75rem",
    "fontSans": "\"Inter\", \"Geist\", system-ui, sans-serif",
    "fontDisplay": "\"Inter\", \"Geist\", system-ui, sans-serif",
    "background": "grid"
  },
  "pages": [
    {
      "path": "/",
      "title": "Sycord - Instant Hosting for Modern Apps",
      "metaTitle": "Sycord - Deploy Web Apps in Seconds",
      "metaDescription": "Global edge hosting with instant Git deployments, previews, and zero-config scaling. Perfect for SaaS, APIs, and static sites.",
      "sections": [
        {
          "kind": "hero",
          "variant": "saas-dashboard",
          "primaryCta": {
            "label": "Deploy Now",
            "href": "/signup"
          },
          "secondaryCta": {
            "label": "See pricing",
            "href": "/pricing"
          },
          "items": [
            {
              "title": "Connect Git repo",
              "highlighted": false
            },
            {
              "title": "One-click deploy",
              "highlighted": false
            },
            {
              "title": "Global CDN ready",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "stats",
          "variant": "row",
          "items": [
            {
              "label": "ms avg deploy",
              "value": "247",
              "highlighted": false
            },
            {
              "label": "global regions",
              "value": "12",
              "highlighted": false
            },
            {
              "label": "apps hosted",
              "value": "50k",
              "highlighted": false
            },
            {
              "label": "uptime SLA",
              "value": "99.99",
              "suffix": "%",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "feature-grid",
          "variant": "bento",
          "items": [
            {
              "title": "Instant Git Deployments",
              "description": "Push to deploy. Automatic builds for Next.js, Nuxt, SvelteKit, Remix, and 50+ frameworks.",
              "icon": "git-pull-request",
              "highlighted": false
            },
            {
              "title": "Global Edge Network",
              "description": "12 regions, 200+ edge locations. Serve users from the closest PoP with sub-50ms latency.",
              "icon": "globe",
              "highlighted": false
            },
            {
              "title": "Preview Deployments",
              "description": "Every PR gets a unique preview URL. Test changes before they hit production.",
              "icon": "eye",
              "highlighted": false
            },
            {
              "title": "Zero-Config Scaling",
              "description": "Auto-scale to zero or millions. Handle traffic spikes without touching config.",
              "icon": "cpu",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "logos",
          "variant": "row",
          "items": [
            {
              "label": "Vercel",
              "highlighted": false
            },
            {
              "label": "Netlify",
              "highlighted": false
            },
            {
              "label": "Stripe",
              "highlighted": false
            },
            {
              "label": "Supabase",
              "highlighted": false
            },
            {
              "label": "Auth0",
              "highlighted": false
            },
            {
              "label": "PlanetScale",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "testimonials",
          "variant": "grid-cards",
          "items": [
            {
              "quote": "Sycord cut our deploy times from 8 minutes to 12 seconds. Game changer.",
              "author": "Sarah K.",
              "role": "CTO @ Fintech Startup",
              "initials": "SK",
              "highlighted": false
            },
            {
              "quote": "Global edge caching without the Vercel price tag. Perfect for our SaaS.",
              "author": "Mike R.",
              "role": "Founder @ Agency",
              "initials": "MR",
              "highlighted": false
            },
            {
              "quote": "Preview deployments alone are worth the switch. PRs now feel magical.",
              "author": "Alex T.",
              "role": "Fullstack Dev",
              "initials": "AT",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "pricing",
          "variant": "three-tier",
          "items": [
            {
              "title": "Hobby",
              "price": "0",
              "period": "mo",
              "features": [
                "100 GB bandwidth",
                "1 project",
                "Preview deploys",
                "Community support"
              ],
              "highlighted": false
            },
            {
              "title": "Pro",
              "price": "29",
              "period": "mo",
              "features": [
                "Unlimited projects",
                "500 GB bandwidth",
                "Priority support",
                "Custom domains",
                "Team collab"
              ],
              "highlighted": true
            },
            {
              "title": "Enterprise",
              "price": "199",
              "period": "mo",
              "features": [
                "Unlimited everything",
                "SLA guarantees",
                "Custom integrations",
                "Dedicated support",
                "SOC2 compliance"
              ],
              "highlighted": false
            }
          ]
        },
        {
          "kind": "cta",
          "variant": "split",
          "primaryCta": {
            "label": "Start Free",
            "href": "/signup"
          },
          "secondaryCta": {
            "label": "Contact Sales",
            "href": "/enterprise"
          }
        }
      ]
    },
    {
      "path": "/features",
      "title": "Features - Sycord Hosting",
      "metaTitle": "All Sycord Features",
      "metaDescription": "Explore instant deployments, global edge caching, preview URLs, and everything else Sycord offers.",
      "sections": [
        {
          "kind": "hero",
          "variant": "centered"
        },
        {
          "kind": "feature-grid",
          "variant": "alternating",
          "items": [
            {
              "title": "Git-Based CI/CD",
              "description": "Connect GitHub, GitLab, or Bitbucket. Deploy on push. Rollback with one click.",
              "highlighted": false
            },
            {
              "title": "Framework Auto-Detection",
              "description": "Next.js, Nuxt, SvelteKit, Astro, Remix. No build config needed.",
              "highlighted": false
            },
            {
              "title": "Preview Every PR",
              "description": "Unique URLs for every pull request. Share with team or clients.",
              "highlighted": false
            },
            {
              "title": "Global Edge Caching",
              "description": "Smart caching at 200+ edge locations. Invalidate on deploy.",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "process",
          "variant": "timeline",
          "items": [
            {
              "title": "Connect Git",
              "description": "Authorize your repo. Sycord detects framework and sets up build.",
              "eyebrow": "Step 01",
              "highlighted": false
            },
            {
              "title": "Deploy Preview",
              "description": "Push to any branch. Get instant preview URL in 12 seconds.",
              "eyebrow": "Step 02",
              "highlighted": false
            },
            {
              "title": "Promote to Production",
              "description": "Merge to main. Deploy goes live globally in under 2 seconds.",
              "eyebrow": "Step 03",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "feature-grid",
          "variant": "icon-grid",
          "items": [
            {
              "title": "CLI Deployments",
              "description": "sycord deploy from anywhere",
              "icon": "terminal",
              "highlighted": false
            },
            {
              "title": "Environment Variables",
              "description": "Encrypted at rest. Preview & prod environments",
              "icon": "lock",
              "highlighted": false
            },
            {
              "title": "Custom Domains",
              "description": "SSL included. DNS propagation in 60s",
              "icon": "globe2",
              "highlighted": false
            }
          ]
        }
      ]
    },
    {
      "path": "/pricing",
      "title": "Pricing - Sycord",
      "metaTitle": "Transparent Hosting Pricing",
      "metaDescription": "Hobby, Pro, Enterprise plans. Pay for bandwidth used. No surprises.",
      "sections": [
        {
          "kind": "hero",
          "variant": "gradient-card"
        },
        {
          "kind": "pricing",
          "variant": "three-tier",
          "items": [
            {
              "title": "Hobby",
              "price": "0",
              "period": "mo",
              "features": [
                "100 GB bandwidth/mo",
                "1 project",
                "Preview deployments",
                "Community Discord"
              ],
              "highlighted": false
            },
            {
              "title": "Pro",
              "price": "29",
              "period": "mo",
              "features": [
                "500 GB bandwidth",
                "Unlimited projects",
                "Team collaboration",
                "Priority email",
                "Custom domains"
              ],
              "highlighted": true
            },
            {
              "title": "Enterprise",
              "price": "Custom",
              "features": [
                "Unlimited bandwidth",
                "99.99% SLA",
                "SOC2 compliance",
                "VPC peering",
                "Dedicated IPS"
              ],
              "highlighted": false
            }
          ]
        },
        {
          "kind": "comparison",
          "variant": "table",
          "items": [
            {
              "highlighted": false
            },
            {
              "highlighted": false
            },
            {
              "highlighted": false
            },
            {
              "highlighted": false
            }
          ]
        },
        {
          "kind": "cta",
          "variant": "boxed-card",
          "primaryCta": {
            "label": "Get Pro",
            "href": "/signup"
          }
        }
      ]
    },
    {
      "path": "/docs",
      "title": "Documentation - Sycord",
      "metaTitle": "Sycord Docs - Get Started",
      "metaDescription": "Deploy your first app in 2 minutes. Full API reference and guides.",
      "sections": [
        {
          "kind": "hero",
          "variant": "split"
        },
        {
          "kind": "process",
          "variant": "steps",
          "items": [
            {
              "title": "Create Account",
              "description": "Sign up and connect your GitHub account.",
              "eyebrow": "Step 1",
              "highlighted": false
            },
            {
              "title": "Pick a Project",
              "description": "Select any repo. We'll auto-detect the framework.",
              "eyebrow": "Step 2",
              "highlighted": false
            },
            {
              "title": "Deploy Live",
              "description": "Push to main. Your site is live globally.",
              "eyebrow": "Step 3",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "feature-grid",
          "variant": "cards",
          "items": [
            {
              "title": "Next.js Deployment",
              "description": "Static, SSR, App Router, Middleware",
              "highlighted": false
            },
            {
              "title": "API Routes",
              "description": "Serverless functions with global edge",
              "highlighted": false
            },
            {
              "title": "Custom Domains",
              "description": "SSL + DNS setup in 60 seconds",
              "highlighted": false
            }
          ]
        }
      ]
    }
  ],
  "needsDatabase": true,
  "databaseProvider": "turso",
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
  "requiredEnvVars": [
    {
      "key": "TURSO_DATABASE_URL",
      "purpose": "Turso — Store user accounts, deployments, billing data, project configs, and usage metrics",
      "provider": "turso",
      "required": true,
      "integration": "Turso"
    },
    {
      "key": "TURSO_AUTH_TOKEN",
      "purpose": "Turso — Store user accounts, deployments, billing data, project configs, and usage metrics",
      "provider": "turso",
      "required": true,
      "integration": "Turso"
    }
  ],
  "unconnectedIntegrations": [
    "Auth"
  ]
} as const

export type GeneratedManifest = typeof generatedManifest
