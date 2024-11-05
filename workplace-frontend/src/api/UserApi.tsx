import { apiClient } from "./ApiClient";

export type RetrieveUsersResponse = [
    username: string,
    authority: string,
    enabled: boolean,
]

export const retrieveUsers = (token: string) =>
    apiClient.get<RetrieveUsersResponse[]>('/users', { headers: { 'Authorization': token , "www-authenticate": token}});