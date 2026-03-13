import styles from "./Home.module.css";
import Reveal from "@/components/Reveal/Reveal";
import Hero from "@/sections/hero/Hero";
import Projects from "@/sections/projects/Projects/Projects";
import CustomersSection from "@/sections/customers/CustomersSection";
import Capabilities from "@/sections/capabilities/Capabilities";

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero />

      <Reveal>
        <Capabilities />
      </Reveal>

      <Reveal>
        <Projects />
      </Reveal>

      <Reveal>
        <CustomersSection />
      </Reveal>
      
    </main>
  );
}