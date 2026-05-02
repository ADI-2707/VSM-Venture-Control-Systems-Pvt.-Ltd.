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
        <h1 className={styles.title}>CTA Management</h1>
        <p className={styles.subtitle}>Track button clicks and user enquiries</p>
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
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Click Analytics</h2>
          <div className={styles.statsGrid}>
            {stats && stats.length > 0 ? (
              stats.map((stat, i) => (
                <div key={i} className={styles.statCard}>
                  <div className={styles.statLabel}>{stat.button_label}</div>
                  <div className={styles.statValue}>{stat.click_count}</div>
                  <div className={styles.statSub}>{stat.page_path}</div>
                </div>
              ))
            ) : (
              <p className={styles.noData}>No click data yet.</p>
            )}
          </div>
        </section>

        <section className={styles.enquiriesSection}>
          <h2 className={styles.sectionTitle}>Recent Enquiries</h2>
          {loading ? (
            <p>Loading...</p>
          ) : enquiries.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Email</th>
                    {activeTab === "general" ? (
                      <>
                        <th>Name</th>
                        <th>Query</th>
                      </>
                    ) : (
                      <>
                        <th>Org Name</th>
                        <th>Service</th>
                        <th>Material/Line</th>
                      </>
                    )}
                    <th>Source</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq.id}>
                      <td className={styles.date}>
                        {new Date(enq.created_at).toLocaleDateString()}
                      </td>
                      <td>{enq.email}</td>
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
                      <td className={styles.source}>{enq.source_page}</td>
                      <td>
                        <button className={styles.replyBtn} disabled>Reply (Soon)</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.noData}>No enquiries found in this category.</p>
          )}
        </section>
      </div>
    </div>
  );
}
