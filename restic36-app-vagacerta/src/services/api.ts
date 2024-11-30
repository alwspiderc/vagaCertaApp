import axios from 'axios';

export const AUTH_KEY = '@Auth';

const api = axios.create({
	baseURL: 'http://192.168.1.98:3000/api/'
});

export default api;
