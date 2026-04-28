"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/utils/axios";
import styles from "./JobDetail.module.css";

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
};

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/jobs/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Job not found or no longer available.");
        setLoading(false);
      });
  }, [id]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) {
      setSubmitError("Please attach your CV.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");

    try {
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("email", email);
      if (phone) formData.append("phone", phone);
      if (coverNote) formData.append("cover_note", coverNote);
      formData.append("cv", cv);

      const res = await fetch(`${API_BASE_URL}/jobs/${id}/apply`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Submission failed");
      }

      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <p className={styles.state}>Loading...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className={styles.container}>
        <p className={styles.errorMsg}>{error || "Job not found."}</p>
        <button className={styles.back} onClick={() => router.push("/career")}>
          ← Back to Careers
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={() => router.push("/career")}>
        ← Back to Careers
      </button>

      {/* Job Header */}
      <div className={styles.header}>
        <div className={styles.tags}>
          <span className={styles.tag}>{job.department}</span>
          <span className={styles.tag}>{job.experience_level}</span>
          <span className={styles.tag}>{job.job_type}</span>
        </div>

        <h1 className={styles.title}>{job.title}</h1>

        <div className={styles.meta}>
          <span>📍 {job.location}</span>
          {job.salary_min && job.salary_max && (
            <span>
              💰 ₹{job.salary_min.toLocaleString()} –{" "}
              ₹{job.salary_max.toLocaleString()} / year
            </span>
          )}
        </div>

        <button className={styles.applyBtn} onClick={scrollToForm}>
          Apply Now
        </button>
      </div>

      {/* Job Body */}
      <div className={styles.body}>
        <section className={styles.section}>
          <h2>About the Role</h2>
          <p className={styles.description}>{job.description}</p>
        </section>

        <section className={styles.section}>
          <h2>Requirements</h2>
          <ul className={styles.requirements}>
            {job.requirements.split("\n").filter(Boolean).map((req, i) => (
              <li key={i}>{req.replace(/^[-•]\s*/, "")}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Application Form */}
      <div ref={formRef} className={styles.formSection}>
        <h2>Apply for this Position</h2>
        <p className={styles.formSubtitle}>
          Fill in your details and attach your CV. We'll get back to you shortly.
        </p>

        {submitted ? (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <h3>Application Submitted!</h3>
            <p>
              Thank you for applying for <strong>{job.title}</strong>. We'll
              review your application and be in touch soon.
            </p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Phone</label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label>Cover Note</label>
              <textarea
                placeholder="Tell us why you're a great fit for this role..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                rows={4}
              />
            </div>

            <div className={styles.field}>
              <label>CV / Resume * <span className={styles.hint}>(PDF or Word, max 5MB)</span></label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCv(e.target.files?.[0] || null)}
                required
              />
            </div>

            {submitError && (
              <p className={styles.submitError}>{submitError}</p>
            )}

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
