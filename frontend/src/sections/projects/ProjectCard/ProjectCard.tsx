import Image from "next/image";
import styles from "./ProjectCard.module.css";

interface Props {
  image: string;
  application: string;
  customer: string;
  location: string;
}

export default function ProjectCard({
  image,
  application,
  customer,
  location,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={application}
            fill
            sizes="(max-width:1200px) 50vw, 25vw"
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.row}>
            <span className={styles.label}>Application</span>
            <span className={styles.value}>{application}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Customer Name</span>
            <span className={styles.value}>{customer}</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>Location</span>
            <span className={styles.value}>{location}</span>
          </div>

          <div className={styles.arrow}>
            <span className={styles.arrowIcon}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}