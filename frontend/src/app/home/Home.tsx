import styles from "./Home.module.css";
import Reveal from "@/components/Reveal/Reveal";
import Hero from "@/sections/hero/Hero";
import Projects from "@/sections/projects/Projects/Projects";
import CustomersSection from "@/sections/customers/CustomersSection";

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero />

      <Reveal>
        <Projects />
      </Reveal>

      <Reveal>
        <CustomersSection />
      </Reveal>

      <section className={styles.textSection}>
        <h1>VSM Venture Control Systems Pvt. Ltd.</h1>
      </section>
    </main>
  );
}