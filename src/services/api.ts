import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://mega-flow-api.onrender.com",
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.interceptors.request.use(

    (config)=>{
        const authStore = useAuthStore();
        const token = authStore.token;

        if (token != null){
            config.headers.Authorization =  token ? `Bearer ${token}` : '';
        }
        
        return config;
    }
)

export default axiosInstance