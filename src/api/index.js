import axios from 'axios';

//axios.defaults.baseURL = `https://salt-task-backend.herokuapp.com`;
axios.defaults.baseURL = `http://localhost:5000`;
const api = axios;

export default api;
