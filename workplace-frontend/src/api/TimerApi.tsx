import { apiClient } from "./ApiClient";

export const retrieveALlTimersForUsername = (username: string, token: string) => 
    apiClient.get(`/timer/${username}`, { headers: { 'Authorization': token}})

export const addTimerForUsername = (username: string, token: string, time: Number) =>
    apiClient.post(`/timer/${username}`, {time}, { headers: { 'Authorization': token}})