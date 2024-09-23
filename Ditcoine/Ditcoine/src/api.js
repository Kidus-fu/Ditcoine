import { ACCESS_TOKEN, REFRESH_TOKEN } from "./config";
import axios from "axios"
const endpoint = "http://localhost:8000"
const api = axios.create({
    baseURL: endpoint
})

api.interceptors.request.use(
    (config) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI3MDQ5MDExLCJpYXQiOjE3MjcwNDcyMTEsImp0aSI6Ijg5MmI3MzNhM2U3ODRjY2ZiMGY4YmZlYzU0N2E5ZjM0IiwidXNlcl9pZCI6MX0.96d-NOLdJ0lW_Kc-IbMZqkaD-zU0QPbpAdSUhad5UK0"
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)
export default api