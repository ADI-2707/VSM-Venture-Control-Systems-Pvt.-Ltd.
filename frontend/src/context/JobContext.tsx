"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/utils/axios";
import { useAuth } from "./AuthContext";

interface Job {
  id: number;
  title: string;
  unread_applications_count: number;
}

interface JobContextType {
  jobs: Job[];
  totalUnread: number;
  hasNewApplications: boolean;
  refreshJobs: () => Promise<void>;
  markJobAsRead: (jobId: number) => Promise<void>;
  clearSectionNotification: () => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [hasNewApplications, setHasNewApplications] = useState(false);

  const fetchJobs = useCallback(async () => {
    if (!user || (user.role !== "manager" && user.role !== "hr")) return;
    try {
      const res = await api.get("/admin/jobs");
      const fetchedJobs = res.data;
      setJobs(fetchedJobs);
      
      const total = fetchedJobs.reduce((acc: number, job: Job) => acc + job.unread_applications_count, 0);
      
      if (total > 0) {
        setHasNewApplications(true);
      } else {
        setHasNewApplications(false);
      }
    } catch (error) {
      console.error("Failed to fetch jobs in context:", error);
    }
  }, [user]);

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, [fetchJobs]);

  const markJobAsRead = async (jobId: number) => {
    try {
      await api.patch(`/admin/jobs/${jobId}/read`);
      await fetchJobs();
    } catch (error) {
      console.error("Failed to mark job as read:", error);
    }
  };

  const clearSectionNotification = () => {
    setHasNewApplications(false);
  };

  const totalUnread = jobs.reduce((acc, job) => acc + job.unread_applications_count, 0);

  return (
    <JobContext.Provider
      value={{
        jobs,
        totalUnread,
        hasNewApplications,
        refreshJobs: fetchJobs,
        markJobAsRead,
        clearSectionNotification,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobProvider");
  }
  return context;
}