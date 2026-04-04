import styles from "./SolutionServices.module.css";
import Reveal from "@/components/Reveal/Reveal";

import SolutionServicesIntro from "@/site/sections/solutionServices/SolutionServicesIntro/SolutionServicesIntro";
import ServicesGrid from "@/site/sections/solutionServices/ServicesGrid/ServicesGrid";
import WhyChooseUs from "@/site/sections/solutionServices/WhyChooseUs/WhyChooseUs";
import Technologies from "@/site/sections/solutionServices/Technologies/Technologies";
import CTA from "@/site/sections/solutionServices/CTA/CTA";

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