"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { ServiceFaqEntity } from "../../../domain/entities/service.entity";
import { ChevronDown, HelpCircle } from "lucide-react";

interface ServiceDetailFaqsProps {
  faqs?: ServiceFaqEntity[];
}

export function ServiceDetailFaqs({ faqs }: ServiceDetailFaqsProps) {
  const t = useTranslations("Services");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/20 border-b border-border">
      <Container className="space-y-12 max-w-4xl">
        <SectionHeading
          eyebrow={t("faqsEyebrow")}
          title={t("faqsTitle")}
          align="center"
        />

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-card border border-border overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-foreground hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="size-5 text-primary shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`size-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm sm:text-base text-muted-foreground leading-relaxed border-t border-border/50 mt-1">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
