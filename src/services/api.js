import axios from 'axios';

const MOCKAPI_URL = 'https://691ba62a3aaeed735c8ddb14.mockapi.io/api/v1';

const api = axios.create({
    baseURL: MOCKAPI_URL,
});

export const productsAPI = {
    getAll: (config) => api.get('/products', config),
    create: (product) => api.post('/products', product),
    update: (id, updates) => api.put(`/products/${id}`, updates),
    delete: (id) => api.delete(`/products/${id}`),
};