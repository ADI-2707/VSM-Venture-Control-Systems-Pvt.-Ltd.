import Link from "next/link";
import styles from "./OpeningCard.module.css";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience_level: string;
};

export default function OpeningCard({ job }: { job: Job }) {
  return (
    <div className={styles.card}>
      <div className={styles.tags}>
        <span className={styles.tag}>{job.department}</span>
        <span className={styles.tag}>{job.experience_level}</span>
      </div>

      <h3 className={styles.title}>{job.title}</h3>

      <div className={styles.meta}>
        <span>{job.location}</span>
        <span className={styles.dot}>·</span>
        <span>{job.job_type}</span>
      </div>

      <Link href={`/career/${job.id}`} className={styles.btn}>
        View &amp; Apply
      </Link>
    </div>
  );
}