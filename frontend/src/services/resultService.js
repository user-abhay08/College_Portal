import api from './api';

export const resultService = {
    getMyResults: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/results/my-results?${params}`);
        return response.data;
    },

    getStudentResults: async (studentId, filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/results/student/${studentId}?${params}`);
        return response.data;
    },

    declareResults: async (resultData) => {
        const response = await api.post('/results', resultData);
        return response.data;
    }
};
