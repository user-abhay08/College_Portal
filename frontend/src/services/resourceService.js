import api from './api';

export const resourceService = {
    getResources: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/resources?${params}`);
        return response.data;
    },

    getResource: async (id) => {
        const response = await api.get(`/resources/${id}`);
        return response.data;
    },

    uploadResource: async (formData) => {
        const response = await api.post('/resources', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    likeResource: async (id) => {
        const response = await api.put(`/resources/${id}/like`);
        return response.data;
    },

    dislikeResource: async (id) => {
        const response = await api.put(`/resources/${id}/dislike`);
        return response.data;
    },

    deleteResource: async (id) => {
        const response = await api.delete(`/resources/${id}`);
        return response.data;
    }
};
