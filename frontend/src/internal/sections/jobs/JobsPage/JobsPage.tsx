"use client";

import { useEffect, useState } from "react";
import styles from "./JobsPage.module.css";

import JobForm from "../JobForm/JobForm";
import JobsTable from "../JobsTable/JobsTable";

import {
  fetchJobs,
  deleteJob,
  updateJob,
} from "@/services/jobService";

export type Job = {
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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [refresh, setRefresh] = useState(0);

  const triggerRefresh = () => setRefresh((r) => r + 1);

  // 🔥 Fetch Jobs (clean service-based)
  useEffect(() => {
    const loadJobs = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs(
          filterStatus ? `?status=${filterStatus}` : ""
        );
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [filterStatus, refresh]);

  const handleEdit = (job: Job) => {
    setEditJob(job);
    setView("form");
  };

  const handleNew = () => {
    setEditJob(null);
    setView("form");
  };

  const handleSaved = () => {
    setView("list");
    setEditJob(null);
    triggerRefresh();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this job posting?")) return;

    try {
      await deleteJob(id);
      triggerRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === "active" ? "closed" : "active";

    try {
      await updateJob(job.id, { status: newStatus });
      triggerRefresh();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Job Postings</h1>
          <p className={styles.subtitle}>
            Create and manage open positions
          </p>
        </div>

        {view === "list" && (
          <button className={styles.newBtn} onClick={handleNew}>
            + New Job
          </button>
        )}

        {view === "form" && (
          <button
            className={styles.backBtn}
            onClick={() => {
              setView("list");
              setEditJob(null);
            }}
          >
            ← Back to list
          </button>
        )}
      </div>

      {view === "list" && (
        <>
          <div className={styles.filters}>
            {["", "draft", "active", "closed"].map((s) => (
              <button
                key={s}
                className={`${styles.filterBtn} ${
                  filterStatus === s ? styles.activeFilter : ""
                }`}
                onClick={() => setFilterStatus(s)}
              >
                {s === "" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          <JobsTable
            jobs={jobs}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </>
      )}

      {view === "form" && (
        <JobForm editJob={editJob} onSaved={handleSaved} />
      )}
    </div>
  );
}