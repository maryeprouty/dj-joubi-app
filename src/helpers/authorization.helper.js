import axios from './axios.helper.js';

export async function getToken() {
    try {
        const result = await axios.get('/api/access_token', { withCredentials: true });
        const token = result?.data?.access_token;
        return token;
    } catch (error) {
        console.error('Error fetching tokens:', error);
        throw error;
    }
}