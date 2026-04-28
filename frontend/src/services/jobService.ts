import { apiGet, apiPost, apiPatch, apiDelete } from "@/utils/axios";

export const fetchJobs = (query: string = "") =>
  apiGet(`/admin/jobs${query}`);

export const createJob = (data: any) =>
  apiPost("/admin/jobs", data);

export const updateJob = (id: number, data: any) =>
  apiPatch(`/admin/jobs/${id}`, data);

export const deleteJob = (id: number) =>
  apiDelete(`/admin/jobs/${id}`);

export const fetchApplications = (jobId: number) =>
  apiGet(`/admin/jobs/${jobId}/applications`);