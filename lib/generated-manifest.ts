// Auto-generated. Snapshot of the design brief, theme tokens and
// page plan that produced this site. Useful for follow-up generation
// passes and for diffing edits between regenerations.
export const generatedManifest = {
  "brief": {
    "projectName": "sycord+",
    "tagline": "Next-generation hosting for Discord bots and apps.",
    "description": "High-performance, always-on hosting tailored for Discord developers. Deploy Node.js, Python, and Rust bots in seconds with zero server configuration.",
    "audience": "Discord bot developers, community managers, and indie hackers.",
    "voice": "Technical, fast-paced, reliable, and developer-centric.",
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
    "contact": {
      "email": "support@sycord.plus"
    },
    "logoUrl": "https://img.pikbest.com/png-images/20241022/stealth-masked-hacker-gaming-logo-for-gamers_10991543.png!w700wp",
    "logoInitials": "S",
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
      "title": "sycord+ | Discord Bot Hosting Made Simple",
      "metaTitle": "sycord+ | High-Performance Discord Bot Hosting",
      "metaDescription": "Deploy your Discord bot in seconds. Zero downtime, infinite scalability, and native support for Node.js, Python, and Go.",
      "sections": [
        {
          "kind": "hero",
          "variant": "saas-dashboard",
          "description": "Push your code to GitHub and we handle the rest. Get your Discord bot online 24/7 with auto-scaling, built-in DDoS protection, and zero configuration.",
          "primaryCta": {
            "label": "Start for Free",
            "href": "/pricing"
          },
          "secondaryCta": {
            "label": "Explore Features",
            "href": "/features"
          }
        },
        {
          "kind": "logos",
          "variant": "row",
          "description": "Everything you need to run modern applications.",
          "items": [
            {
              "label": "Node.js",
              "highlighted": false
            },
            {
              "label": "Python",
              "highlighted": false
            },
            {
              "label": "Rust",
              "highlighted": false
            },
            {
              "label": "Go",
              "highlighted": false
            },
            {
              "label": "Docker",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "feature-grid",
          "variant": "bento",
          "description": "We stripped away the complexity of traditional VPS hosting so you can focus on writing commands, not configuring firewalls.",
          "items": [
            {
              "title": "1-Click GitHub Deploys",
              "description": "Connect your repository and we'll automatically build and deploy your bot every time you push to main.",
              "highlighted": false
            },
            {
              "title": "Always-On Reliability",
              "description": "99.99% uptime guarantee with automatic process restarts if your bot crashes.",
              "highlighted": false
            },
            {
              "title": "Enterprise DDoS Protection",
              "description": "Keep your community online. Our edge network absorbs malicious traffic before it reaches your app.",
              "highlighted": false
            },
            {
              "title": "Real-time Log Streaming",
              "description": "Debug issues instantly with a live, searchable stream of your application's console output.",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "process",
          "variant": "steps",
          "description": "No SSH keys, no Linux tutorials. Just pure deployment speed.",
          "items": [
            {
              "title": "Connect GitHub",
              "description": "Authorize sycord+ to access your bot's repository with read-only permissions.",
              "eyebrow": "Step 01",
              "highlighted": false
            },
            {
              "title": "Set Environment Variables",
              "description": "Securely paste your Discord token and API keys into our encrypted vault.",
              "eyebrow": "Step 02",
              "highlighted": false
            },
            {
              "title": "Deploy & Scale",
              "description": "Click deploy. We provision the container, install dependencies, and start your bot.",
              "eyebrow": "Step 03",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "testimonials",
          "variant": "grid-cards",
          "description": "Join thousands of developers hosting their communities on sycord+.",
          "items": [
            {
              "quote": "Switching to sycord+ saved me 10 hours a week in server maintenance. The auto-deploy feature is absolute magic for my workflow.",
              "author": "Alex Chen",
              "role": "Creator of ModerationBot",
              "initials": "AC",
              "highlighted": false
            },
            {
              "quote": "We serve over 2M users across 50,000 servers. sycord+ handles our traffic spikes effortlessly without breaking a sweat.",
              "author": "Sarah Jenkins",
              "role": "Lead Dev, RPG-Cord",
              "initials": "SJ",
              "highlighted": false
            },
            {
              "quote": "The best hosting platform for Discord bots, period. The real-time logs and environment variable management are top tier.",
              "author": "Marcus Thorne",
              "role": "Indie Hacker",
              "initials": "MT",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "pricing",
          "variant": "three-tier",
          "description": "Start for free, upgrade when your community demands it.",
          "items": [
            {
              "title": "Hobby",
              "price": "$0",
              "period": "/month",
              "features": [
                "512MB RAM",
                "Shared CPU",
                "Community Support",
                "Sleeps after 24h inactivity"
              ],
              "cta": {
                "label": "Deploy Free",
                "href": "/pricing"
              },
              "highlighted": false
            },
            {
              "title": "Pro",
              "price": "$5",
              "period": "/month",
              "features": [
                "1GB Dedicated RAM",
                "1 vCPU Core",
                "Always On (No Sleeping)",
                "Priority Email Support",
                "Automated Backups"
              ],
              "cta": {
                "label": "Get Pro",
                "href": "/pricing"
              },
              "highlighted": true
            },
            {
              "title": "Scale",
              "price": "$15",
              "period": "/month",
              "features": [
                "4GB Dedicated RAM",
                "2 vCPU Cores",
                "Custom Domains for APIs",
                "Advanced Analytics",
                "24/7 Discord Support"
              ],
              "cta": {
                "label": "Start Scaling",
                "href": "/pricing"
              },
              "highlighted": false
            }
          ]
        },
        {
          "kind": "faq",
          "variant": "two-column",
          "description": "Everything you need to know about hosting on sycord+.",
          "items": [
            {
              "title": "Do I need to know Docker to use sycord+?",
              "description": "Not at all. We automatically detect your language (Node.js, Python, etc.) and build the container for you. If you prefer, you can provide your own Dockerfile.",
              "highlighted": false
            },
            {
              "title": "Is my bot token secure?",
              "description": "Yes. Environment variables are encrypted at rest using AES-256 and are only decrypted at runtime inside your isolated container.",
              "highlighted": false
            },
            {
              "title": "Can I host a database here?",
              "description": "sycord+ is optimized for stateless application hosting. We recommend using managed database providers like MongoDB Atlas or Supabase alongside our platform.",
              "highlighted": false
            },
            {
              "title": "What happens if I exceed my RAM limit?",
              "description": "Your bot will automatically restart to prevent system instability. We'll send you an alert so you can optimize your code or upgrade your plan.",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "cta",
          "variant": "split",
          "description": "Join 10,000+ developers building the future of Discord communities.",
          "primaryCta": {
            "label": "Create Account",
            "href": "/pricing"
          },
          "secondaryCta": {
            "label": "Read Documentation",
            "href": "/features"
          }
        }
      ]
    },
    {
      "path": "/features",
      "title": "Features | sycord+",
      "metaTitle": "Platform Features | sycord+",
      "metaDescription": "Explore the powerful features that make sycord+ the best place to host your Discord bots and community applications.",
      "sections": [
        {
          "kind": "hero",
          "variant": "centered",
          "description": "We handle the infrastructure so you can focus on building the best experience for your users.",
          "primaryCta": {
            "label": "Start Building",
            "href": "/pricing"
          }
        },
        {
          "kind": "feature-grid",
          "variant": "icon-grid",
          "description": "A comprehensive suite of tools designed specifically for modern bot developers.",
          "items": [
            {
              "title": "Global Edge Network",
              "description": "Your bot's API responds in milliseconds with our globally distributed edge routing.",
              "highlighted": false
            },
            {
              "title": "Persistent Storage",
              "description": "Attach high-speed NVMe volumes to your containers for local SQLite databases or file storage.",
              "highlighted": false
            },
            {
              "title": "Cron Jobs",
              "description": "Schedule recurring tasks natively through our dashboard without writing complex interval logic.",
              "highlighted": false
            },
            {
              "title": "Team Collaboration",
              "description": "Invite co-developers to your project with granular role-based access controls.",
              "highlighted": false
            },
            {
              "title": "Custom Domains",
              "description": "Map your own domain to your bot's web dashboard or API endpoints with automatic SSL.",
              "highlighted": false
            },
            {
              "title": "Uptime Monitoring",
              "description": "Built-in ping checks and webhook alerts notify you the second your bot goes offline.",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "comparison",
          "variant": "table",
          "description": "See how we stack up against traditional hosting methods.",
          "items": [
            {
              "title": "Setup Time",
              "description": "sycord+: < 1 minute | VPS: Hours | Heroku: 10 minutes",
              "highlighted": false
            },
            {
              "title": "Discord Native",
              "description": "sycord+: Yes | VPS: No | Heroku: No",
              "highlighted": false
            },
            {
              "title": "Maintenance",
              "description": "sycord+: Zero | VPS: High | Heroku: Low",
              "highlighted": false
            },
            {
              "title": "Cost Predictability",
              "description": "sycord+: Fixed Flat Rate | VPS: Fixed | Heroku: Usage Based",
              "highlighted": false
            }
          ]
        },
        {
          "kind": "cta",
          "variant": "banner",
          "description": "Deploy your first bot today for free.",
          "primaryCta": {
            "label": "Deploy Now",
            "href": "/pricing"
          }
        }
      ]
    },
    {
      "path": "/pricing",
      "title": "Pricing | sycord+",
      "metaTitle": "Simple, Transparent Pricing | sycord+",
      "metaDescription": "Choose the perfect plan for your Discord bot. From free hobby tiers to powerful dedicated resources for verified bots.",
      "sections": [
        {
          "kind": "hero",
          "variant": "split",
          "description": "Whether you're testing a new idea or running a verified bot in 100,000 servers, we have a plan that fits your needs.",
          "primaryCta": {
            "label": "View Plans",
            "href": "#plans"
          }
        },
        {
          "kind": "pricing",
          "variant": "two-tier-toggle",
          "description": "Upgrade instantly as your bot grows.",
          "items": [
            {
              "title": "Pro",
              "price": "$5",
              "period": "/month",
              "features": [
                "1GB Dedicated RAM",
                "1 vCPU Core",
                "Always On",
                "Automated Backups",
                "Community Support"
              ],
              "cta": {
                "label": "Get Pro",
                "href": "/contact"
              },
              "highlighted": false
            },
            {
              "title": "Scale",
              "price": "$15",
              "period": "/month",
              "features": [
                "4GB Dedicated RAM",
                "2 vCPU Cores",
                "Custom Domains",
                "Advanced Analytics",
                "Priority 24/7 Support"
              ],
              "cta": {
                "label": "Start Scaling",
                "href": "/contact"
              },
              "highlighted": true
            }
          ]
        },
        {
          "kind": "faq",
          "variant": "accordion",
          "description": "Common questions about billing and limits.",
          "items": [
            {
              "title": "Can I upgrade or downgrade at any time?",
              "description": "Yes, your billing is prorated. If you upgrade halfway through the month, you only pay the difference for the remaining days.",
              "highlighted": false
            },
            {
              "title": "Are there any hidden bandwidth fees?",
              "description": "No. All plans include unmetered bandwidth for standard Discord bot operations. If you are hosting a high-traffic API, fair use policies apply.",
              "highlighted": false
            },
            {
              "title": "Do you offer refunds?",
              "description": "We offer a 7-day money-back guarantee on all paid plans. If you're not satisfied, just let us know.",
              "highlighted": false
            }
          ]
        }
      ]
    },
    {
      "path": "/contact",
      "title": "Contact Us | sycord+",
      "metaTitle": "Contact Support & Sales | sycord+",
      "metaDescription": "Get in touch with the sycord+ team for technical support, enterprise inquiries, or general questions.",
      "sections": [
        {
          "kind": "hero",
          "variant": "centered",
          "description": "Need technical support or have a question about our enterprise plans? Drop us a message.",
          "primaryCta": {
            "label": "Fill out Form",
            "href": "#contact-form"
          }
        },
        {
          "kind": "contact",
          "variant": "split-form",
          "description": "Fill out the form below and our team will get back to you within 24 hours."
        },
        {
          "kind": "stats",
          "variant": "row",
          "description": "We take reliability and support seriously.",
          "items": [
            {
              "label": "Uptime Guarantee",
              "value": "99.99",
              "suffix": "%",
              "highlighted": false
            },
            {
              "label": "Hour Response Time",
              "value": "24",
              "suffix": "h",
              "highlighted": false
            },
            {
              "label": "Active Bots Hosted",
              "value": "10",
              "suffix": "k+",
              "highlighted": false
            }
          ]
        }
      ]
    }
  ],
  "needsDatabase": false,
  "databaseProvider": "none",
  "integrations": [],
  "requiredEnvVars": [],
  "unconnectedIntegrations": []
} as const

export type GeneratedManifest = typeof generatedManifest
