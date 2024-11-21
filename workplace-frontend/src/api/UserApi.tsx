import { apiClient } from "./ApiClient";

export type RetrieveUsersResponse = [
    username: string,
    authority: string,
    enabled: boolean,
    email: string,
    phone: Number,
]

export const retrieveUsers = (token: string) =>
    apiClient.get<RetrieveUsersResponse[]>('/users', { headers: { 'Authorization': token , "www-authenticate": token}});

export const resetPasswordForUser = (username: string) => 
    apiClient.put('/users/password-reset/'+ username);

export const changePasswordForUser = (username: string, password: string) => 
    apiClient.put('/users/password-change/'+ username, {username, password});