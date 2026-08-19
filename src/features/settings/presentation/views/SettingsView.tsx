"use client";

import { useSettings } from "../hooks/useSettings";
import { Container } from "@shared/components/layouts/Container";
import { Section } from "@shared/components/layouts/Section";
import { LoadingScreen } from "@shared/components/layouts/LoadingScreen";

export function SettingsView() {
  const { settings, isLoading } = useSettings();

  if (isLoading || !settings) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Section>
        <Container>
          <div className="p-8 border rounded-2xl bg-card">
            <h2 className="text-xl font-bold">Site Configuration</h2>
            <p className="text-sm text-muted-foreground">Email: {settings.contactEmail}</p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
