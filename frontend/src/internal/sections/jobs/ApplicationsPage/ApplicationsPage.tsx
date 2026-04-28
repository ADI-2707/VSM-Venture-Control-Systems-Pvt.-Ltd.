"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ApplicationsTable from "../ApplicationsTable/ApplicationsTable";
import styles from "./ApplicationsPage.module.css";

import { fetchApplications } from "@/services/jobService";

export default function ApplicationsPage({ jobId }: { jobId: number }) {
  const router = useRouter();

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadApplications = async () => {
      try {
        const data = await fetchApplications(jobId);
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, [jobId]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Applications</h1>
          <p className={styles.subtitle}>
            Applicants for job #{jobId}
          </p>
        </div>

        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Back to Jobs
        </button>
      </div>

      {loading && <p className={styles.state}>Loading applications...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && applications.length === 0 && (
        <p className={styles.state}>No applications yet.</p>
      )}

      {!loading && !error && applications.length > 0 && (
        <ApplicationsTable data={applications} />
      )}
    </div>
  );
}