import styles from "./Home.module.css";
import Reveal from "@/site/components/Reveal/Reveal";
import Hero from "@/site/sections/home/hero/Hero";
import PrefetchController from "@/site/components/PrefetchController/PrefetchController";

import dynamic from "next/dynamic";

const EngineeringSection = dynamic(() =>
  import("@/site/sections/home/engineering/EngineeringSection")
);

const CustomersSection = dynamic(() =>
  import("@/site/sections/home/customers/CustomersSection")
);

const Projects = dynamic(() =>
  import("@/site/sections/home/projects/Projects/Projects")
);

const Capabilities = dynamic(() =>
  import("@/site/sections/home/capabilities/Capabilities")
);

const IndustriesSection = dynamic(() =>
  import("@/site/sections/home/industries/IndustriesSection")
);

const TestimonialsSection = dynamic(() =>
  import("@/site/sections/home/testimonials/TestimonialsSection")
);

const CTASection = dynamic(() =>
  import("@/site/sections/home/cta/CTASection")
);

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