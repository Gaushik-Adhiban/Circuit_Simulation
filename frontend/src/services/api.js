import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Circuit API functions
export const getCircuits = async (params = {}) => {
  try {
    const response = await api.get('/api/v1/circuits/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching circuits:', error);
    throw error;
  }
};

export const getCircuit = async (circuitId) => {
  try {
    const response = await api.get(`/api/v1/circuits/${circuitId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching circuit:', error);
    throw error;
  }
};

export const createCircuit = async (circuitData) => {
  try {
    const response = await api.post('/api/v1/circuits/', circuitData);
    return response.data;
  } catch (error) {
    console.error('Error creating circuit:', error);
    throw error;
  }
};

export const updateCircuit = async (circuitId, circuitData) => {
  try {
    const response = await api.put(`/api/v1/circuits/${circuitId}`, circuitData);
    return response.data;
  } catch (error) {
    console.error('Error updating circuit:', error);
    throw error;
  }
};

export const deleteCircuit = async (circuitId) => {
  try {
    await api.delete(`/api/v1/circuits/${circuitId}`);
    return true;
  } catch (error) {
    console.error('Error deleting circuit:', error);
    throw error;
  }
};

export const duplicateCircuit = async (circuitId, name = null) => {
  try {
    const response = await api.post(`/api/v1/circuits/${circuitId}/duplicate`, { name });
    return response.data;
  } catch (error) {
    console.error('Error duplicating circuit:', error);
    throw error;
  }
};

export const exportCircuit = async (circuitId) => {
  try {
    const response = await api.get(`/api/v1/circuits/${circuitId}/export`);
    return response.data;
  } catch (error) {
    console.error('Error exporting circuit:', error);
    throw error;
  }
};

// Simulation API functions
export const runSimulation = async (simulationData) => {
  try {
    const response = await api.post('/api/v1/simulate/run', simulationData);
    return response.data;
  } catch (error) {
    console.error('Error running simulation:', error);
    throw error;
  }
};

export const validateCircuit = async (circuitData) => {
  try {
    const response = await api.post('/api/v1/simulate/validate', circuitData);
    return response.data;
  } catch (error) {
    console.error('Error validating circuit:', error);
    throw error;
  }
};

export const getSimulationStatus = async (simulationId) => {
  try {
    const response = await api.get(`/api/v1/simulate/status/${simulationId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting simulation status:', error);
    throw error;
  }
};

// Utility function for saving circuits (handles both create and update)
export const saveCircuit = async (circuitData) => {
  if (circuitData.id) {
    // Update existing circuit
    return await updateCircuit(circuitData.id, circuitData);
  } else {
    // Create new circuit
    return await createCircuit(circuitData);
  }
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export default api;
