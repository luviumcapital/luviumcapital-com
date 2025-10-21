import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "~/components/home/HeroSection";
import { KeyHighlights } from "~/components/home/KeyHighlights";
import { CallToAction } from "~/components/home/CallToAction";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <KeyHighlights />
      <CallToAction />
    </div>
  );
}
