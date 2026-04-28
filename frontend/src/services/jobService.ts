import { apiGet, apiPost, apiPatch, apiDelete } from "@/utils/axios";

export const fetchJobs = (query: string = "") => {
  return apiGet(`/admin/jobs${query}`);
};

export const createJob = (data: any) => {
  return apiPost("/admin/jobs", data);
};

export const updateJob = (id: number, data: any) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid job id for update");
  }

  return apiPatch(`/admin/jobs/${id}`, data);
};

export const deleteJob = (id: number) => {
  if (!id || isNaN(id)) {
    throw new Error("Invalid job id for delete");
  }

  return apiDelete(`/admin/jobs/${id}`);
};

export const fetchApplications = (jobId: number) => {
  if (!jobId || isNaN(jobId)) {
    throw new Error("Invalid jobId for fetching applications");
  }

  return apiGet(`/admin/jobs/${jobId}/applications`);
};