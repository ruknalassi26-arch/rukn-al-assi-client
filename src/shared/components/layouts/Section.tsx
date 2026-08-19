import { cn } from "@core/utils/cn";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export function Section({
  size = "md",
  className,
  children,
  ...props
}: SectionProps) {
  const sizeClasses = {
    sm: "py-8 md:py-12",
    md: "py-12 md:py-20",
    lg: "py-16 md:py-28",
  };

  return (
    <section className={cn(sizeClasses[size], className)} {...props}>
      {children}
    </section>
  );
}
