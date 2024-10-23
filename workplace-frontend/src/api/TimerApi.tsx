import { formatTime } from "@/components/timer/TimerUtils";
import { apiClient } from "./ApiClient";

export type TimerResponseDataType = {
    id: number,
    username: string,
    date: Date,
    time: number,
    from_time: Date,
    to_time: Date,
}

export const retrieveALlTimersForUsername = (username: string, token: string) => 
    apiClient.get<TimerResponseDataType[]>(`/timer/${username}`, { headers: { 'Authorization': token}}).then(response => {
        return response.data.map(timer => ({
            ...timer,
            date: new Date(timer.date).toLocaleDateString(),
            time: formatTime(timer.time),
            from_time: new Date(timer.from_time).toLocaleTimeString(),
            to_time: new Date(timer.to_time).toLocaleTimeString(),

        }));
    });

export const addTimerForUsername = (username: string, token: string, time: Number) =>
    apiClient.post(`/timer/${username}`, {time}, { headers: { 'Authorization': token}})

