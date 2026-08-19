"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@core/config/site";

interface FloatingWhatsAppProps {
  whatsappNumber?: string;
}

export function FloatingWhatsApp({ whatsappNumber: propNumber }: FloatingWhatsAppProps) {
  const rawNumber = propNumber || siteConfig.contact.whatsapp;
  if (!rawNumber) return null;

  const sanitizedNumber = rawNumber.replace(/[^0-9]/g, "");
  if (!sanitizedNumber) return null;

  return (
    <a
      href={`https://wa.me/${sanitizedNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center size-12 rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="size-6 fill-current" />
    </a>
  );
}
