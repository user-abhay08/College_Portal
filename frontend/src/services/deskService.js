import api from './api';

export const deskService = {
    getDesk: async () => {
        const response = await api.get('/desk');
        return response.data;
    },

    updateDesk: async (deskData) => {
        const response = await api.put('/desk', deskData);
        return response.data;
    }
};
