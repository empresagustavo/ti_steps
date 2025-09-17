import axios from "axios";



export function httpClient(headers: Record<string, string>) {
    
    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api", 
        headers,
    });

    return api
};
