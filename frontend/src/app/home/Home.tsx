import dynamic from "next/dynamic";
import styles from "./Home.module.css";
import Reveal from "@/components/Reveal/Reveal";
import Hero from "@/sections/hero/Hero";
import useSectionPrefetch from "@/hooks/useSectionPrefetch";

const EngineeringSection = dynamic(
  () => import("@/sections/engineering/EngineeringSection"),
  { loading: () => <div style={{ height: 420 }} /> }
);

const CustomersSection = dynamic(
  () => import("@/sections/customers/CustomersSection"),
  { loading: () => <div style={{ height: 260 }} /> }
);

const Projects = dynamic(
  () => import("@/sections/projects/Projects/Projects"),
  { loading: () => <div style={{ height: 500 }} /> }
);

const Capabilities = dynamic(
  () => import("@/sections/capabilities/Capabilities"),
  { loading: () => <div style={{ height: 400 }} /> }
);

const IndustriesSection = dynamic(
  () => import("@/sections/industries/IndustriesSection"),
  { loading: () => <div style={{ height: 420 }} /> }
);

const TestimonialsSection = dynamic(
  () => import("@/sections/testimonials/TestimonialsSection"),
  { loading: () => <div style={{ height: 350 }} /> }
);

const CTASection = dynamic(
  () => import("@/sections/cta/CTASection"),
  { loading: () => <div style={{ height: 250 }} /> }
);

export default function Home() {
  useSectionPrefetch();

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
        <TestimonialsSection />
      </Reveal>

      <Reveal>
        <CTASection />
      </Reveal>

    </main>
  );
}