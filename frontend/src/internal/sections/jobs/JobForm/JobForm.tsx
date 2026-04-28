"use client";

import { useState, useEffect } from "react";
import styles from "./JobForm.module.css";
import type { Job } from "../JobsPage/JobsPage";

import { createJob, updateJob } from "@/services/jobService";

type Props = {
  editJob: Job | null;
  onSaved: () => void;
};

const initialState = {
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
};

export default function JobForm({ editJob, onSaved }: Props) {
  const [form, setForm] = useState(initialState);
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
    } else {
      setForm(initialState);
    }
  }, [editJob]);

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    if (!form.title.trim()) return "Job title is required";
    if (form.title.length < 3) return "Title must be at least 3 characters";

    if (!form.department.trim()) return "Department is required";
    if (!form.location.trim()) return "Location is required";

    if (!form.description.trim()) return "Description is required";
    if (form.description.length < 20)
      return "Description must be at least 20 characters";

    if (!form.requirements.trim()) return "Requirements are required";

    if (
      form.salary_min &&
      form.salary_max &&
      Number(form.salary_min) > Number(form.salary_max)
    ) {
      return "Salary min cannot be greater than salary max";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);

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
          />
        </div>

        <div className={styles.field}>
          <label>Department *</label>
          <input
            value={form.department}
            onChange={(e) => set("department", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Location *</label>
          <input
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
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
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Salary Min</label>
          <input
            type="number"
            value={form.salary_min}
            onChange={(e) => set("salary_min", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Salary Max</label>
          <input
            type="number"
            value={form.salary_max}
            onChange={(e) => set("salary_max", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label>Requirements *</label>
        <textarea
          value={form.requirements}
          onChange={(e) => set("requirements", e.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.saveBtn}
          disabled={saving || !form.title}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}