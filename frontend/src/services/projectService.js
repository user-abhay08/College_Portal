import api from './api';

export const projectService = {
    getProjects: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/projects?${params}`);
        return response.data;
    },

    getProject: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },

    createProject: async (projectData) => {
        const response = await api.post('/projects', projectData);
        return response.data;
    },

    updateProject: async (id, projectData) => {
        const response = await api.put(`/projects/${id}`, projectData);
        return response.data;
    },

    addMember: async (id, userId) => {
        const response = await api.post(`/projects/${id}/members`, { userId });
        return response.data;
    },

    uploadProjectResource: async (id, formData) => {
        const response = await api.post(`/projects/${id}/resources`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};
