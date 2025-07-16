import { CtaSection } from "@/components/custom/landing/cta-section";
import { FeatureSection } from "@/components/custom/landing/feature-section";
import Footer from "@/components/custom/landing/footer";
import { Header } from "@/components/custom/landing/header";
import { HeroSection } from "@/components/custom/landing/hero-section";
import { Microservices } from "@/components/custom/landing/microservices-section";
import { StatsSection } from "@/components/custom/landing/starts-section";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />

        {/* Feature section */}
        <FeatureSection />

        {/* Microservices */}
        <Microservices />

        {/* cta - section */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
