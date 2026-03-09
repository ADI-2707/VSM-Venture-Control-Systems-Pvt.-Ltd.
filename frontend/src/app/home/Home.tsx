import styles from "./Home.module.css";
import Hero from "@/sections/hero/Hero";

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero />

      <section className={styles.textSection}>
        <h1>VSM Venture Control Systems Pvt. Ltd.</h1>
      </section>
    </main>
  );
}