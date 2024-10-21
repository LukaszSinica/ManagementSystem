import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/AuthContext";
import { addTimerForUsername } from "@/api/timerApi";
import { toast } from "@/hooks/use-toast";

export default function Timer() {
    const auth = useAuth();
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
  
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
                    toast({
                        title: "Time was added successfully",
                        description: (
                          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(time)}</code>
                          </pre>
                        ),
                      })
                ).catch(() => 
                    toast({
                        title: "Time was not added",
                        description: (
                          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(time)}</code>
                          </pre>
                        ),
                }))
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
  
    // Function to format time into hh:mm:ss
    const formatTime = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        const format = (unit: number) => String(unit).padStart(2, '0');
        return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
    };

    return (
        <main className="flex flex-col w-2/5 items-center mx-auto">
            <div>
                <Button onClick={handleClick} className="mx-4">{isRunning ? "Stop working" : "Start working"}</Button>
            </div>
            {formatTime(time)}
        </main>
    )
}
