"use client";

import { useEffect } from "react";

export default function useSectionPrefetch() {
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const deltaY = Math.abs(window.scrollY - lastY);
      const deltaTime = now - lastTime;

      const velocity = deltaY / deltaTime;

      if (velocity > 0.8) {
        import("@/site/sections/home/engineering/EngineeringSection");
        import("@/site/sections/customers/CustomersSection");
        import("@/site/sections/projects/Projects/Projects");
        import("@/site/sections/capabilities/Capabilities");
        import("@/site/sections/industries/IndustriesSection");
        import("@/site/sections/testimonials/TestimonialsSection");
        import("@/site/sections/cta/CTASection");
      }

      lastY = window.scrollY;
      lastTime = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}