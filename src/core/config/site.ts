export const siteConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || "Rukn Al Assi",
  description:
    "Turnkey industrial contracting, precision engineering, and specialized equipment solutions.",
  url: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001",
  ogImage: "/og.jpg",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    address: process.env.NEXT_PUBLIC_ADDRESS || "",
  },
  socials: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },
};
