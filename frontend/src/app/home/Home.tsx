import styles from "./Home.module.css";
import Hero from "@/sections/hero/Hero";
import Projects from "@/sections/projects/Projects/Projects";
import CustomersSection from "@/sections/customers/CustomersSection";

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero />
      <Projects />
      <CustomersSection />

      <section className={styles.textSection}>
        <h1>VSM Venture Control Systems Pvt. Ltd.</h1>
      </section>
    </main>
  );
}