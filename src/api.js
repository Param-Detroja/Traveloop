import axios from 'axios';

// 1. BASE CONFIGURATION
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. AUTOMATIC JWT TOKEN INJECTION
// This interceptor runs before every request to add the token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('traveloop_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. ERROR HANDLING WRAPPER
const handleResponse = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'A cinematic system error occurred. Please try again.';
    console.error('API Error:', message);
    throw new Error(message);
  }
};

// 4. API FUNCTIONS
export const apiService = {
  // --- AUTHENTICATION ---
  registerUser: (data) => handleResponse(api.post('/auth/register', data)),
  loginUser: async (email, password) => {
    const data = await handleResponse(api.post('/auth/login', { email, password }));
    if (data.token) localStorage.setItem('traveloop_token', data.token);
    return data;
  },
  logout: () => localStorage.removeItem('traveloop_token'),

  // --- TRIPS ---
  getTrips: () => handleResponse(api.get('/trips')),
  createTrip: (data) => handleResponse(api.post('/trips', data)),
  getTripById: (id) => handleResponse(api.get(`/trips/${id}`)),
  updateTrip: (id, data) => handleResponse(api.put(`/trips/${id}`, data)),
  deleteTrip: (id) => handleResponse(api.delete(`/trips/${id}`)),

  // --- STOPS & CITIES ---
  addStop: (tripId, data) => handleResponse(api.post(`/trips/${tripId}/stops`, data)),
  searchCities: (query) => handleResponse(api.get(`/cities?q=${query}`)),
  getActivities: (cityId) => handleResponse(api.get(`/cities/activities?city_id=${cityId}`)),

  // --- BUDGET & EXTRAS ---
  getBudget: (tripId) => handleResponse(api.get(`/trips/${tripId}/budget`)),
  getChecklist: (tripId) => handleResponse(api.get(`/trips/${tripId}/checklist`)),
  addChecklistItem: (tripId, item) => handleResponse(api.post(`/trips/${tripId}/checklist`, item)),
  deleteChecklistItem: (tripId, itemId) => handleResponse(api.delete(`/trips/${tripId}/checklist/${itemId}`)),
  
  getNotes: (tripId) => handleResponse(api.get(`/trips/${tripId}/notes`)),
  addNote: (tripId, note) => handleResponse(api.post(`/trips/${tripId}/notes`, note)),

  // --- PUBLIC SHARING ---
  getPublicItinerary: (token) => handleResponse(api.get(`/share/${token}`)),
};

export default apiService;
