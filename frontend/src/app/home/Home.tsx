import styles from "./Home.module.css";
import Reveal from "@/components/Reveal/Reveal";
import Hero from "@/sections/hero/Hero";
import PrefetchController from "@/components/PrefetchController/PrefetchController";

import dynamic from "next/dynamic";

const EngineeringSection = dynamic(() => import("@/sections/engineering/EngineeringSection"));
const CustomersSection = dynamic(() => import("@/sections/customers/CustomersSection"));
const Projects = dynamic(() => import("@/sections/projects/Projects/Projects"));
const Capabilities = dynamic(() => import("@/sections/capabilities/Capabilities"));
const IndustriesSection = dynamic(() => import("@/sections/industries/IndustriesSection"));
const TestimonialsSection = dynamic(() => import("@/sections/testimonials/TestimonialsSection"));
const CTASection = dynamic(() => import("@/sections/cta/CTASection"));

export default function Home() {
  return (
    <main className={styles.container}>

      <PrefetchController />

      <Hero />

      <Reveal>
        <EngineeringSection />
      </Reveal>

      <Reveal>
        <CustomersSection />
      </Reveal>

      <Reveal>
        <Projects />
      </Reveal>

      <Reveal>
        <Capabilities />
      </Reveal>

      <Reveal>
        <IndustriesSection />
      </Reveal>

      <Reveal>
        <TestimonialsSection />
      </Reveal>

      <Reveal>
        <CTASection />
      </Reveal>

    </main>
  );
}