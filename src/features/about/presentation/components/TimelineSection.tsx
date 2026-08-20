"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Container } from "@shared/components/layouts/Container";
import { SectionHeading } from "@shared/components/ui/SectionHeading";
import { TimelineEventEntity } from "../../domain/entities/timeline-event.entity";
import { Calendar } from "lucide-react";

interface TimelineSectionProps {
  timeline: TimelineEventEntity[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  const t = useTranslations("About");

  if (!timeline || timeline.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-muted/20 border-b border-border">
      <Container className="space-y-16">
        <SectionHeading
          eyebrow={t("timelineEyebrow")}
          title={t("timelineHeading")}
          description={t("timelineSubheading")}
          align="center"
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Central Vertical Timeline Line */}
          <div className="absolute top-0 bottom-0 start-4 md:start-1/2 -translate-x-1/2 w-0.5 bg-border" />

          <div className="space-y-12">
            {timeline.map((event, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={event.id}
                  className="relative flex flex-col md:flex-row items-start md:items-center gap-8 group"
                >
                  {/* Left Side (Even on Desktop) */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isEven ? "md:pe-12 md:text-end" : "md:order-2 md:ps-12 md:text-start"
                    } ps-12 md:ps-0`}
                  >
                    <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xs hover:border-primary/40 hover:shadow-md transition-all space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-mono font-bold">
                        <Calendar className="size-3" />
                        <span>{event.year}</span>
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      {event.description && (
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="absolute start-4 md:start-1/2 -translate-x-1/2 size-8 rounded-full bg-card border-4 border-amber-500 shadow-md flex items-center justify-center z-10 group-hover:scale-125 transition-transform" />

                  {/* Empty Spacer on other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
