import axios from 'axios';
const api = axios.create({ 
  baseURL : 'https://wecare.pranavkv.online/'
})

export default api;