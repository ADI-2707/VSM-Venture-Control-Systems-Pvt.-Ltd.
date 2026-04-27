"use client";

import { useEffect, useState } from "react";
import styles from "./JobsPage.module.css";
import { useAuth } from "@/context/AuthContext";
import JobForm from "../JobForm/JobForm";
import JobsTable from "../JobsTable/JobsTable";

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
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "form">("list");
  const [editJob, setEditJob] = useState<Job | null>(null);
  const [filterStatus, setFilterStatus] = useState("");

  const fetchJobs = () => {
    const url = filterStatus
      ? `http://localhost:8000/admin/jobs?status=${filterStatus}`
      : "http://localhost:8000/admin/jobs";

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, [filterStatus]);

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
    setLoading(true);
    fetchJobs();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this job posting?")) return;
    await fetch(`http://localhost:8000/admin/jobs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchJobs();
  };

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === "active" ? "closed" : "active";
    await fetch(`http://localhost:8000/admin/jobs/${job.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchJobs();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Job Postings</h1>
          <p className={styles.subtitle}>
            Create and manage open positions for the public careers page
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
                className={`${styles.filterBtn} ${filterStatus === s ? styles.activeFilter : ""}`}
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
        <JobForm
          token={token!}
          editJob={editJob}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}