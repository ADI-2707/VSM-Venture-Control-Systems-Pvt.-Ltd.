import styles from "./About.module.css";
import Reveal from "@/components/Reveal/Reveal";
import dynamic from "next/dynamic";

const AboutIntro = dynamic(() => import("@/sections/about/intro/AboutIntro"));
const Leadership = dynamic(() => import("@/sections/about/leadership/Leadership"));
const Partners = dynamic(() => import("@/sections/about/partners/Partners"));

export default function About() {
  return (
    <main className={styles.container}>

      <section className="section-divider">
        <Reveal>
          <AboutIntro />
        </Reveal>
      </section>

      <section className="section-divider">
        <Reveal>
          <Leadership />
        </Reveal>
      </section>

      <section className="section-divider">
        <Reveal>
          <Partners />
        </Reveal>
      </section>

    </main>
  );
}