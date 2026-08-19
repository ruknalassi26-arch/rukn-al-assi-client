import Link from "next/link";
import { Container } from "./Container";
import { Section } from "./Section";
import { Button } from "@shared/components/ui/button";

export interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function CTASection({
  title,
  description,
  buttonText,
  buttonHref,
}: CTASectionProps) {
  return (
    <Section className="bg-primary text-primary-foreground">
      <Container className="text-center space-y-6">
        <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
        <p className="max-w-2xl mx-auto text-primary-foreground/90 text-sm md:text-base">
          {description}
        </p>
        <div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="font-semibold shadow-lg"
          >
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
