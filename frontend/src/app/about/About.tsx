import styles from "./About.module.css";
import Reveal from "@/components/Reveal/Reveal";
import dynamic from "next/dynamic";

const AboutIntro = dynamic(() => import("@/site/sections/about/intro/AboutIntro"));
const Leadership = dynamic(() => import("@/site/sections/about/leadership/Leadership"));
const Partners = dynamic(() => import("@/site/sections/about/partners/Partners"));

export default function About() {
  return (
    <main className={styles.container}>

      <section className={styles.section}>
        <Reveal>
          <AboutIntro />
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal>
          <Leadership />
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal>
          <Partners />
        </Reveal>
      </section>

    </main>
  );
}