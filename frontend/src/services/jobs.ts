import apiClient from './api';

export interface JobCriteria {
  id: number;
  recruiter_id: number;
  title: string;
  description: string;
  created_at: string;
  criteria_skills?: Array<{ id: number; skill_id: number; weight: number }>;
}

export const jobsApi = {
  // Get all job criteria
  getJobs: (skip = 0, limit = 100) =>
    apiClient.get<JobCriteria[]>('/api/criteria', { params: { skip, limit } }),

  // Get a specific job criteria
  getJob: (id: number) =>
    apiClient.get<JobCriteria>(`/api/criteria/${id}`),

  // Create a job criteria
  createJob: (data: { title: string; description: string; criteria_skills?: Array<{ skill_id: number; weight: number }> }) =>
    apiClient.post<JobCriteria>('/api/criteria', data),

  // Update a job criteria
  updateJob: (id: number, data: Partial<JobCriteria>) =>
    apiClient.put<JobCriteria>(`/api/criteria/${id}`, data),

  // Delete a job criteria
  deleteJob: (id: number) =>
    apiClient.delete(`/api/criteria/${id}`),
};
