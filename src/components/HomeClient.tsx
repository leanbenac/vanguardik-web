"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { TacticalRouteMap } from "@/components/sections/TacticalRouteMap";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { WorkflowComparison } from "@/components/sections/WorkflowComparison";
import { CaseStudyShowcase } from "@/components/sections/CaseStudyShowcase";
import { StatementBanner } from "@/components/sections/StatementBanner";
import { ProofMetrics } from "@/components/sections/ProofMetrics";
import { RoiSimulator } from "@/components/sections/RoiSimulator";
import { SecurityArchitecture } from "@/components/sections/SecurityArchitecture";
import { FaqAndCta } from "@/components/sections/FaqAndCta";
import { InquiryDrawer } from "@/components/sections/InquiryDrawer";
import { Footer } from "@/components/layout/Footer";

export const HomeClient: React.FC = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    } else {
      setSelectedService("");
    }
    setInquiryOpen(true);
  };

  const handleCloseInquiry = () => {
    setInquiryOpen(false);
  };

  return (
    <>
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />
      <main id="main-content">
        <HeroSection onOpenInquiry={(title) => handleOpenInquiry(title)} />
        <TechMarquee />
        <TacticalRouteMap />
        <ServicesBento onSelectService={(title) => handleOpenInquiry(title)} />
        <WorkflowComparison />
        <CaseStudyShowcase onSelectCase={(title) => handleOpenInquiry(title)} />
        <StatementBanner />
        <ProofMetrics />
        <RoiSimulator onTriggerInquiry={(details) => handleOpenInquiry(details)} />
        <SecurityArchitecture />
        <FaqAndCta onOpenInquiry={() => handleOpenInquiry()} />
      </main>
      <Footer />

      <InquiryDrawer
        key={selectedService || "default"}
        isOpen={inquiryOpen}
        onClose={handleCloseInquiry}
        initialService={selectedService}
      />
    </>
  );
};
