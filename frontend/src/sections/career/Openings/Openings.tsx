import styles from "./Openings.module.css";
import OpeningCard from "../OpeningCard/OpeningCard";

const jobs = [
  {
    title: "PLC Engineer",
    location: "Noida",
    type: "Full Time",
  },
  {
    title: "Automation Engineer",
    location: "Noida",
    type: "Full Time",
  },
  {
    title: "Electrical Design Engineer",
    location: "Noida",
    type: "Full Time",
  },
];

export default function Openings() {
  return (
    <div className={styles.wrapper}>
      <h2>Open Positions</h2>

      <div className={styles.grid}>
        {jobs.map((job) => (
          <OpeningCard key={job.title} {...job} />
        ))}
      </div>
    </div>
  );
}