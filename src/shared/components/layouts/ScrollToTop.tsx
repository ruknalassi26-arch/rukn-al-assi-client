"use client";

import { useScrollPosition } from "@core/hooks/useScrollPosition";
import { ArrowUp } from "lucide-react";
import { Button } from "@shared/components/ui/button";

export function ScrollToTop() {
  const scrollPosition = useScrollPosition();
  const isVisible = scrollPosition > 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 rounded-full shadow-md bg-background/80 backdrop-blur"
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4" />
    </Button>
  );
}
