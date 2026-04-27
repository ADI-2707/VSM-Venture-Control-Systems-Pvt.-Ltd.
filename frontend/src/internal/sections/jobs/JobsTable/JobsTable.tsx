import styles from "./JobsTable.module.css";
import type { Job } from "../JobsPage/JobsPage";

type Props = {
  jobs: Job[];
  loading: boolean;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (job: Job) => void;
};

const statusColor: Record<string, string> = {
  active: styles.active,
  draft: styles.draft,
  closed: styles.closed,
};

export default function JobsTable({
  jobs, loading, onEdit, onDelete, onToggleStatus,
}: Props) {
  if (loading) return <p className={styles.state}>Loading...</p>;
  if (jobs.length === 0) return (
    <p className={styles.state}>No job postings found. Click "+ New Job" to create one.</p>
  );

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Department</th>
            <th>Location</th>
            <th>Type</th>
            <th>Status</th>
            <th>Posted</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className={styles.titleCell}>{job.title}</td>
              <td>{job.department}</td>
              <td>{job.location}</td>
              <td className={styles.capitalize}>{job.job_type}</td>
              <td>
                <span className={`${styles.badge} ${statusColor[job.status]}`}>
                  {job.status}
                </span>
              </td>
              <td className={styles.date}>
                {new Date(job.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </td>
              <td>
                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => onEdit(job)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.toggleBtn}
                    onClick={() => onToggleStatus(job)}
                  >
                    {job.status === "active" ? "Close" : "Publish"}
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => onDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}