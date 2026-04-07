import apiClient from './api';

export interface Candidate {
  id: number;
  filename: string;
  file_path: string;
  raw_text?: string;
  created_at: string;
}

export const candidatesApi = {
  // Get all candidates
  getCandidates: (skip = 0, limit = 100) =>
    apiClient.get<Candidate[]>('/candidates/', { params: { skip, limit } }),

  // Get a specific candidate
  getCandidate: (id: number) =>
    apiClient.get<Candidate>(`/candidates/${id}`),

  // Upload a CV file
  uploadCV: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/candidates/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  // Create a candidate
  createCandidate: (data: { filename: string; file_path: string; raw_text?: string }) =>
    apiClient.post<Candidate>('/candidates/', data),

  // Update a candidate
  updateCandidate: (id: number, data: Partial<Candidate>) =>
    apiClient.put<Candidate>(`/candidates/${id}`, data),

  // Delete a candidate
  deleteCandidate: (id: number) =>
    apiClient.delete(`/candidates/${id}`),
};
