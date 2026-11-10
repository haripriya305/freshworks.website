/* ===========================================================
   FreshWorks — Central Content/Data Store
   Edit this single file to update copy across the whole site.
=========================================================== */
const SITE_DATA = {
  brand: {
    name: "FreshWorks",
    tagline: "Customer support software that feels effortless",
    email: "hello@freshworks-demo.com",
    phone: "+91 98765 43210",
    address: "Tiruvallur, Tamil Nadu, India",
    social: {
      twitter: "https://twitter.com/freshworks",
      linkedin: "https://linkedin.com/company/freshworks",
      github: "https://github.com/freshworks"
    }
  },

  nav: [
    { label: "Home", href: "index.html" },
    { label: "Features", href: "features.html" },
    { label: "Pricing", href: "pricing.html" },
    { label: "Blog", href: "blog.html" },
    { label: "About", href: "about.html" },
    { label: "Contact", href: "contact.html" }
  ],

  hero: {
    badge: "Now with AI ticket triage",
    heading: "Support your customers like it's a two-person team, even when it's twenty.",
    lead: "FreshWorks unifies tickets, chat, and knowledge base into one calm inbox — so your team replies faster and burns out slower.",
    stats: [
      { value: "14,200+", label: "teams onboarded" },
      { value: "98.4%", label: "uptime, last 12 months" },
      { value: "32%", label: "avg. faster first response" }
    ]
  },

  features: [
    {
      icon: "📥",
      title: "Unified inbox",
      desc: "Email, chat, and social messages land in one queue with smart routing rules.",
      detail: "Set routing by topic, language, or customer tier so the right agent sees the right ticket first — every time, automatically."
    },
    {
      icon: "🤖",
      title: "AI ticket triage",
      desc: "Auto-tag, summarize, and suggest replies before an agent opens the ticket.",
      detail: "Our triage model reads incoming tickets, drafts a first response, and flags urgency — agents edit instead of starting from a blank page."
    },
    {
      icon: "📊",
      title: "Analytics dashboard",
      desc: "Live charts on response time, CSAT, and ticket volume by channel.",
      detail: "Filter by team, date range, or tag to spot bottlenecks before they show up in customer reviews."
    },
    {
      icon: "📚",
      title: "Knowledge base & docs",
      desc: "Publish help articles your AI assistant and customers both can search.",
      detail: "Every article doubles as training data for automated replies, so your docs actively reduce ticket volume."
    },
    {
      icon: "🔐",
      title: "Role-based admin panel",
      desc: "Granular permissions for agents, team leads, and admins.",
      detail: "Control who can see billing, who can delete tickets, and who can only reply — all from one settings screen."
    },
    {
      icon: "🔔",
      title: "Smart notifications",
      desc: "Email and in-app alerts for SLA breaches, assignments, and mentions.",
      detail: "Configurable digest emails mean managers get a daily summary instead of a hundred pings."
    }
  ],

  pricing: {
    monthlyNote: "Billed monthly",
    yearlyNote: "Billed yearly (save 20%)",
    plans: [
      {
        name: "Starter",
        tagline: "For small teams getting organized",
        monthly: 19,
        yearly: 15,
        featured: false,
        features: ["Up to 3 agents", "Unified inbox", "Basic analytics", "Email support", "1 knowledge base"]
      },
      {
        name: "Growth",
        tagline: "For teams scaling support",
        monthly: 49,
        yearly: 39,
        featured: true,
        badge: "Most popular",
        features: ["Up to 15 agents", "AI ticket triage", "Full analytics dashboard", "Priority support", "5 knowledge bases", "Role-based admin panel"]
      },
      {
        name: "Scale",
        tagline: "For larger, multi-team orgs",
        monthly: 99,
        yearly: 79,
        featured: false,
        features: ["Unlimited agents", "Advanced AI automations", "Custom reports & exports", "Dedicated success manager", "Unlimited knowledge bases", "SSO & audit logs"]
      }
    ]
  },

  testimonials: [
    { name: "Ananya Rao", role: "Head of Support, Loopline", quote: "We cut first-response time by a third in six weeks without hiring." },
    { name: "Marcus Webb", role: "Founder, Driftcart", quote: "The admin panel alone saved us from three separate spreadsheets." },
    { name: "Priya Nair", role: "CX Lead, Northstar", quote: "Our agents finally trust the AI drafts enough to actually use them." }
  ],

  blog: [
    {
      slug: "first-response-time",
      title: "Why first response time matters more than resolution time",
      date: "2026-05-12",
      author: "FreshWorks Team",
      tag: "Strategy",
      excerpt: "Customers forgive a slow fix far more easily than a slow first reply. Here's how to optimize for the metric that actually drives retention."
    },
    {
      slug: "ai-triage-explained",
      title: "How AI ticket triage actually works (and where it fails)",
      date: "2026-04-28",
      author: "FreshWorks Team",
      tag: "Product",
      excerpt: "A practical look at what AI can and can't do in your support queue, plus three failure modes to watch for before you trust it fully."
    },
    {
      slug: "scaling-support-team",
      title: "Scaling a support team from 2 to 20 without losing your voice",
      date: "2026-04-09",
      author: "FreshWorks Team",
      tag: "Growth",
      excerpt: "Tone of voice degrades fast as teams grow. Here's the documentation pattern that kept ours consistent past agent number ten."
    }
  ],

  about: {
    story: "FreshWorks started as an internal tool built by a three-person support team that hated switching between five different apps just to answer one customer email. We rebuilt it for everyone facing the same problem.",
    mission: "Make excellent customer support possible for teams that don't have an excellent support budget.",
    values: [
      { title: "Calm over chaotic", desc: "Software should lower your heart rate, not raise it." },
      { title: "Default to transparency", desc: "Customers can see ticket status; teams can see real metrics." },
      { title: "Automate the boring parts", desc: "AI should remove busywork, not replace judgment." }
    ],
    team: [
      { name: "Haripriya B.", role: "Product & Engineering" },
      { name: "Dev Sharma", role: "Customer Success" },
      { name: "Lena Ortiz", role: "Design" }
    ]
  },

  faq: [
    { q: "Can I switch plans later?", a: "Yes, upgrade or downgrade anytime from the billing tab in your dashboard — changes are prorated automatically." },
    { q: "Is there a free trial?", a: "Every plan includes a 14-day free trial, no card required to start." },
    { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee on all annual plans." },
    { q: "Can I import tickets from another tool?", a: "Yes, CSV import is supported on all plans, with guided migration on Growth and Scale." }
  ]
};

// Expose for both browser <script> usage and CommonJS (if ever bundled)
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_DATA;
}
