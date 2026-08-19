import { Container } from "./Container";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { cn } from "@core/utils/cn";

export interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
}

export function PageBanner({
  title,
  subtitle,
  breadcrumbItems,
  className,
}: PageBannerProps) {
  return (
    <div className={cn("bg-muted/50 border-b py-12 md:py-16", className)}>
      <Container className="space-y-4">
        {breadcrumbItems && <Breadcrumb items={breadcrumbItems} />}
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm max-w-2xl">{subtitle}</p>
        )}
      </Container>
    </div>
  );
}
