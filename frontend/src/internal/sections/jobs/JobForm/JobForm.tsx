"use client";

import { useState, useEffect } from "react";
import styles from "./JobForm.module.css";
import type { Job } from "../JobsPage/JobsPage";

import { createJob, updateJob } from "@/services/jobService";

type Props = {
  editJob: Job | null;
  onSaved: () => void;
};

export default function JobForm({ editJob, onSaved }: Props) {
  const [form, setForm] = useState({
    title: "",
    department: "",
    location: "",
    job_type: "full-time",
    experience_level: "mid",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
    status: "draft",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editJob) {
      setForm({
        title: editJob.title ?? "",
        department: editJob.department ?? "",
        location: editJob.location ?? "",
        job_type: editJob.job_type ?? "full-time",
        experience_level: editJob.experience_level ?? "mid",
        salary_min: editJob.salary_min?.toString() ?? "",
        salary_max: editJob.salary_max?.toString() ?? "",
        description: editJob.description ?? "",
        requirements: editJob.requirements ?? "",
        status: editJob.status ?? "draft",
      });
    }
  }, [editJob]);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      salary_min: form.salary_min ? parseInt(form.salary_min) : null,
      salary_max: form.salary_max ? parseInt(form.salary_max) : null,
    };

    try {
      if (editJob) {
        await updateJob(editJob.id, payload);
      } else {
        await createJob(payload);
      }

      onSaved();
    } catch (err: any) {
      console.error("Save failed", err);
      setError(err?.response?.data?.detail || "Failed to save job");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {editJob ? "Edit Job Posting" : "Create New Job Posting"}
      </h2>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Job Title *</label>
          <input
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="e.g. Automation Engineer"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Department *</label>
          <input
            value={form.department}
            onChange={(e) => set("department", e.target.value)}
            placeholder="e.g. Engineering"
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Location *</label>
          <input
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Noida, UP"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Job Type *</label>
          <select
            value={form.job_type}
            onChange={(e) => set("job_type", e.target.value)}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Experience Level *</label>
          <select
            value={form.experience_level}
            onChange={(e) => set("experience_level", e.target.value)}
          >
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Status</label>
          <select
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="active">Active (Public)</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>
            Salary Min (₹/yr) <span className={styles.optional}>optional</span>
          </label>
          <input
            type="number"
            value={form.salary_min}
            onChange={(e) => set("salary_min", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>
            Salary Max (₹/yr) <span className={styles.optional}>optional</span>
          </label>
          <input
            type="number"
            value={form.salary_max}
            onChange={(e) => set("salary_max", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Job Description *</label>
        <textarea
          rows={5}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label>
          Requirements <span className={styles.optional}>one per line</span>
        </label>
        <textarea
          rows={5}
          value={form.requirements}
          onChange={(e) => set("requirements", e.target.value)}
          required
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.footer}>
        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving
            ? "Saving..."
            : editJob
            ? "Save Changes"
            : "Create Job"}
        </button>
      </div>
    </form>
  );
}