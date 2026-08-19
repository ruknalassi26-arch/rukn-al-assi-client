import React from "react";
import { cn } from "@core/utils/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "space-y-3 max-w-3xl",
        isCenter ? "mx-auto text-center" : "text-start",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20",
            isCenter && "mx-auto"
          )}
        >
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
