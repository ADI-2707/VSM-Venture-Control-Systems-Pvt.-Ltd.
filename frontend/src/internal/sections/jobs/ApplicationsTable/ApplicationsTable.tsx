"use client";

import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/axios";
import styles from "./ApplicationsTable.module.css";

export default function ApplicationsTable({ data }: { data: any[] }) {
  const { token } = useAuth();

  const downloadCV = async (id: number) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/admin/applications/${id}/cv`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) {
        console.error("Failed to download CV:", res.status);
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Cover Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((app) => (
            <tr key={app.id}>
              <td className={styles.nameCell}>{app.full_name}</td>
              <td>{app.email}</td>
              <td className={styles.muted}>{app.phone || "—"}</td>
              <td className={styles.coverNote}>{app.cover_note || "—"}</td>
              <td>
                <button
                  className={styles.downloadBtn}
                  onClick={() => downloadCV(app.id)}
                >
                  Download CV
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
