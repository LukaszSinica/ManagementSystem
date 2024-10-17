import { apiClient } from "./ApiClient";

export const executeBasicAuthenticationService
    = (token: string) => apiClient.get(`/basicauth`
    ,{
        headers: {
            Authorization: token
        }
    }
    )

export const executeJwtAuthenticationService
    = (username: string, password: string) => 
        apiClient.post(`/authenticate`,{username,password})