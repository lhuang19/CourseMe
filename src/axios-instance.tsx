import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pl-courses-370ec-default-rtdb.firebaseio.com/',
});

export default axiosInstance;
