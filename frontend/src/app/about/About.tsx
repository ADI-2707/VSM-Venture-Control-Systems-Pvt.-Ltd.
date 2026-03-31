import styles from "./About.module.css";
import Reveal from "@/components/Reveal/Reveal";
import dynamic from "next/dynamic";

const AboutIntro = dynamic(() => import("@/sections/about/intro/AboutIntro"));
const Leadership = dynamic(() => import("@/sections/about/leadership/Leadership"));

export default function About() {
  return (
    <main className={styles.container}>
      <Reveal>
        <AboutIntro />
      </Reveal>
      <Reveal>
        <Leadership />
      </Reveal>
    </main>
  );
}