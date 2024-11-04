import { apiClient } from "./ApiClient";

export const retrieveUsers = (token: string) =>
    apiClient.get('/users', { headers: { 'Authorization': token , "www-authenticate": token}});