import styles from "./Home.module.css";
import Reveal from "@/components/Reveal/Reveal";
import Hero from "@/sections/hero/Hero";
import Projects from "@/sections/projects/Projects/Projects";
import CustomersSection from "@/sections/customers/CustomersSection";
import Capabilities from "@/sections/capabilities/Capabilities";
import IndustriesSection from "@/sections/industries/IndustriesSection";
import EngineeringSection from "@/sections/engineering/EngineeringSection";
import CTASection from "@/sections/cta/CTASection";

export default function Home() {
  return (
    <main className={styles.container}>
      
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
        <CTASection />
      </Reveal>

    </main>
  );
}