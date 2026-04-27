"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ApplicationsTable from "../ApplicationsTable/ApplicationsTable";
import styles from "./ApplicationsPage.module.css";

export default function ApplicationsPage({ jobId }: { jobId: string }) {
  const { token, authReady, logout } = useAuth();
  const router = useRouter();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authReady || !token) return;

    const fetchApplications = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/admin/jobs/${jobId}/applications`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.status === 401) { logout(); return; }

        if (!res.ok) {
          setError("Failed to fetch applications");
          return;
        }

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Failed to fetch applications", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId, token, authReady]);

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