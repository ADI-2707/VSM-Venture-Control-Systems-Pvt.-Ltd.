import styles from "./SolutionServices.module.css";
import Reveal from "@/components/Reveal/Reveal";

import SolutionServicesIntro from "@/sections/solutionServices/SolutionServicesIntro/SolutionServicesIntro";
import ServicesGrid from "@/sections/solutionServices/ServicesGrid/ServicesGrid";

export default function SolutionServicesPage() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <Reveal>
          <SolutionServicesIntro />
        </Reveal>
      </section>

      <section className={styles.section}>
        <Reveal>
          <ServicesGrid />
        </Reveal>
      </section>
    </div>
  );
}