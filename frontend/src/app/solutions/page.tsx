import styles from "./SolutionServices.module.css";
import Reveal from "@/components/Reveal/Reveal";

import SolutionServicesIntro from "@/sections/solutionServices/SolutionServicesIntro/SolutionServicesIntro";
import ServicesGrid from "@/sections/solutionServices/ServicesGrid/ServicesGrid";
import WhyChooseUs from "@/sections/solutionServices/WhyChooseUs/WhyChooseUs";
import Technologies from "@/sections/solutionServices/Technologies/Technologies";
import CTA from "@/sections/solutionServices/CTA/CTA";

export default function SolutionServicesPage() {
  return (
    <div className={styles.page}>

      <section className={styles.section}>
        <div className="container">
          <Reveal><SolutionServicesIntro /></Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal><ServicesGrid /></Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal><WhyChooseUs /></Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal><Technologies /></Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <Reveal>
            <CTA />
          </Reveal>
        </div>
      </section>

    </div>
  );
}