import styles from "./Home.module.css";
import Reveal from "@/components/Reveal/Reveal";
import Hero from "@/site/sections/hero/Hero";
import PrefetchController from "@/components/PrefetchController/PrefetchController";

import dynamic from "next/dynamic";

const EngineeringSection = dynamic(() => import("@/site/sections/engineering/EngineeringSection"));
const CustomersSection = dynamic(() => import("@/site/sections/customers/CustomersSection"));
const Projects = dynamic(() => import("@/site/sections/projects/Projects/Projects"));
const Capabilities = dynamic(() => import("@/site/sections/capabilities/Capabilities"));
const IndustriesSection = dynamic(() => import("@/site/sections/industries/IndustriesSection"));
const TestimonialsSection = dynamic(() => import("@/site/sections/testimonials/TestimonialsSection"));
const CTASection = dynamic(() => import("@/site/sections/cta/CTASection"));

export default function Home() {
  return (
    <main className={styles.container}>

      <PrefetchController />

      <Hero />

      <Reveal>
        <EngineeringSection />
      </Reveal>

      <Reveal>
        <Projects />
      </Reveal>

      <Reveal>
        <CustomersSection />
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