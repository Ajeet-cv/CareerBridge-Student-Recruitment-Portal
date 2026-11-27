import axios from 'axios';

/**
 * Axios instance pre-configured for future Spring Boot backend integration.
 * Currently, UI state and persistence operate via LocalStorage in storage.js.
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const rawSession = localStorage.getItem('careerbridge_auth');
    if (rawSession) {
      try {
        const parsed = JSON.parse(rawSession);
        if (parsed?.token) {
          config.headers.Authorization = `Bearer ${parsed.token}`;
        }
      } catch {
        // Ignore malformed local session
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (payload) => api.post('/auth/login', payload),
  register: (payload) => api.post('/auth/register', payload),
};

export const studentAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  update: (id, payload) => api.put(`/students/${id}`, payload),
  remove: (id) => api.delete(`/students/${id}`),
  uploadResume: (id, formData) =>
    api.post(`/students/${id}/resume`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const companyAPI = {
  getAll: () => api.get('/companies'),
  create: (payload) => api.post('/companies', payload),
  update: (id, payload) => api.put(`/companies/${id}`, payload),
  remove: (id) => api.delete(`/companies/${id}`),
};

export const jobAPI = {
  getAll: () => api.get('/jobs'),
  create: (payload) => api.post('/jobs', payload),
  update: (id, payload) => api.put(`/jobs/${id}`, payload),
  remove: (id) => api.delete(`/jobs/${id}`),
};

export const applicationAPI = {
  getAll: () => api.get('/applications'),
  apply: (payload) => api.post('/applications', payload),
  updateStatus: (id, status) => api.patch(`/applications/${id}/status`, { status }),
};

export const interviewAPI = {
  getAll: () => api.get('/interviews'),
  schedule: (payload) => api.post('/interviews', payload),
  update: (id, payload) => api.put(`/interviews/${id}`, payload),
};

export const notificationAPI = {
  getByRole: (role) => api.get(`/notifications/${role}`),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  remove: (id) => api.delete(`/notifications/${id}`),
};

export default api;
