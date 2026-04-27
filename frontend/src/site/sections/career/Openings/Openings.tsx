"use client";

import { useEffect, useState } from "react";
import styles from "./Openings.module.css";
import OpeningCard from "../OpeningCard/OpeningCard";

type Job = {
  id: number;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  description: string;
  requirements: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export default function Openings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/jobs?status=active")
      .then((r) => r.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load openings.");
        setLoading(false);
      });
  }, []);

  const visibleJobs = showAll ? jobs : jobs.slice(0, 3);

  return (
    <div className={styles.wrapper}>
      <h2>Open Positions</h2>

      {loading && <p className={styles.state}>Loading openings...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && jobs.length === 0 && (
        <p className={styles.state}>No open positions at the moment. Check back soon.</p>
      )}

      {!loading && !error && jobs.length > 0 && (
        <>
          <div className={styles.grid}>
            {visibleJobs.map((job) => (
              <OpeningCard key={job.id} job={job} />
            ))}
          </div>

          {jobs.length > 3 && (
            <div className={styles.toggle}>
              <button
                className={styles.toggleBtn}
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll
                  ? "Show Less"
                  : `View All ${jobs.length} Positions`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}