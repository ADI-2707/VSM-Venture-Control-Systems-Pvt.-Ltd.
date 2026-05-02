"use client";

import { useEffect, useState } from "react";
import api from "@/utils/axios";
import styles from "./CTAEnquiriesPage.module.css";

interface Enquiry {
  id: number;
  type: "general" | "service";
  email: string;
  source_page: string;
  status: string;
  full_name?: string;
  query?: string;
  organization_name?: string;
  material_type?: string;
  line?: string;
  location?: string;
  service_name?: string;
  created_at: string;
}

interface ClickStat {
  button_label: string;
  page_path: string;
  click_count: number;
}

interface Analytics {
  general_stats: ClickStat[];
  service_stats: ClickStat[];
}

export default function CTAEnquiriesPage() {
  const [activeTab, setActiveTab] = useState<"general" | "service">("general");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, anaRes] = await Promise.all([
        api.get(`/admin/cta/enquiries?type=${activeTab}`),
        api.get("/admin/cta/analytics")
      ]);
      setEnquiries(enqRes.data);
      setAnalytics(anaRes.data);
    } catch (error) {
      console.error("Failed to fetch CTA data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const stats = activeTab === "general" ? analytics?.general_stats : analytics?.service_stats;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>CTA Insights</h1>
          <p className={styles.subtitle}>Track button performance and manage customer enquiries</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === "general" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("general")}
        >
          General Queries
        </button>
        <button 
          className={`${styles.tab} ${activeTab === "service" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("service")}
        >
          Service Enquiries
        </button>
      </div>

      <div className={styles.content}>
        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Performance Analytics</h2>
          </div>
          <div className={styles.statsGrid}>
            {stats && stats.length > 0 ? (
              stats.map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statLabel}>{stat.button_label}</div>
                  <div className={styles.statValue}>{stat.click_count.toLocaleString()}</div>
                  <div className={styles.statSub}>{stat.page_path}</div>
                </div>
              ))
            ) : (
              <div className={styles.noData}>
                <p>No engagement data recorded for this category yet.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent submissions</h2>
          </div>
          {loading ? (
            <div className={styles.noData}>
              <p>Fetching latest enquiries...</p>
            </div>
          ) : enquiries.length > 0 ? (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Contact</th>
                    {activeTab === "general" ? (
                      <>
                        <th>Full Name</th>
                        <th>Message / Query</th>
                      </>
                    ) : (
                      <>
                        <th>Organization</th>
                        <th>Target Service</th>
                        <th>Details</th>
                      </>
                    )}
                    <th>Entry Point</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td className={styles.dateCell}>
                        {new Date(enq.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric"
                        })}
                      </td>
                      <td className={styles.emailCell}>{enq.email}</td>
                      {activeTab === "general" ? (
                        <>
                          <td>{enq.full_name}</td>
                          <td className={styles.queryCell}>{enq.query}</td>
                        </>
                      ) : (
                        <>
                          <td>{enq.organization_name}</td>
                          <td>{enq.service_name}</td>
                          <td>{enq.material_type} / {enq.line}</td>
                        </>
                      )}
                      <td>
                        <span className={styles.sourceBadge}>{enq.source_page}</span>
                      </td>
                      <td>
                        <button className={styles.replyBtn}>Connect</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noData}>
              <p>No enquiries received in this category.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
