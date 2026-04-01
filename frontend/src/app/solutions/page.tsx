import styles from "./SolutionServices.module.css";
import Reveal from "@/components/Reveal/Reveal";

import SolutionServicesIntro from "@/sections/solutionServices/SolutionServicesIntro/SolutionServicesIntro";
import ServicesGrid from "@/sections/solutionServices/ServicesGrid/ServicesGrid";

export default function SolutionServicesPage() {
  return (
    <div className={styles.page}>
      
      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <SolutionServicesIntro />
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <ServicesGrid />
          </Reveal>
        </div>
      </section>

    </div>
  );
}