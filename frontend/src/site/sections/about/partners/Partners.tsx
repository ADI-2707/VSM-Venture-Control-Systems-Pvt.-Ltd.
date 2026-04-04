import styles from "./Partners.module.css";
import PartnerCard from "@/components/PartnerCard/PartnerCard";
import { partners } from "@/constants/partners";

export default function Partners() {
  return (
    <section className={`container ${styles.section}`}>

      <h2 className={styles.title}>Technology Partnerships</h2>

      <p className={styles.description}>
        We collaborate with global technology leaders to deliver reliable,
        high-performance industrial automation solutions.
      </p>

      <div className={styles.grid}>
        {partners.map((partner) => (
          <PartnerCard
            key={partner.name}
            name={partner.name}
            logo={partner.logo}
            description={partner.description}
            variant={partner.variant}
          />
        ))}
      </div>

    </section>
  );
}