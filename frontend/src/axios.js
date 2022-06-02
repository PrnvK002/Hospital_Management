import axios from 'axios';
const api = axios.create({ 
  baseURL : 'http://wecare.pranavkv.online/'
})

export default api;