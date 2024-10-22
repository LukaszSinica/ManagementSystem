import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/AuthContext";
import { addTimerForUsername, retrieveALlTimersForUsername, TimerResponseDataType } from "@/api/TimerApi";
import { TimerSuccessfulToast, TimerUnsuccessfulToast } from "./TimerToasts";
import { formatTime, timerDataTableColumns } from "./TimerUtils";
import { DataTable } from "./TimerDataTable";

export default function Timer() {
    const auth = useAuth();
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [timerData, setTimerData] = useState<TimerResponseDataType[]>([]);
    
    useEffect(() => {
        retrieveALlTimersForUsername(auth.username, auth.token).then((timers) => setTimerData(timers));
    }, [auth.username, auth.token])

    const handleClick = () => {
        if (!isRunning) {
            setIsRunning(true);
            timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            setIsRunning(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            if(auth.username && auth.token) {
                addTimerForUsername(auth.username, auth.token, time).then(() => 
                    TimerSuccessfulToast(formatTime(time))
                ).catch(() => 
                    TimerUnsuccessfulToast(formatTime(time))
                )
            }
            handleReset();
        }
    };
  
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    return (
        <main className="flex flex-col w-2/5 items-center mx-auto">
            <div>
                <Button onClick={handleClick} className="mx-4">{isRunning ? "Stop working" : "Start working"}</Button>
            </div>
            {formatTime(time)}
            <div>
                {timerData.length > 0 &&
                    <DataTable columns={timerDataTableColumns} data={timerData}/>
                }
            </div>
        </main>
    )
}
