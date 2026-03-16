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
        import("@/sections/engineering/EngineeringSection");
        import("@/sections/customers/CustomersSection");
        import("@/sections/projects/Projects/Projects");
        import("@/sections/capabilities/Capabilities");
        import("@/sections/industries/IndustriesSection");
        import("@/sections/testimonials/TestimonialsSection");
        import("@/sections/cta/CTASection");
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