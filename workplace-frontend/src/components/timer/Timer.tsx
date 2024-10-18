import { useRef, useState } from "react";
import { Button } from "../ui/button";

export default function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
  
    const handleClick = () => {
        handleReset();
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
        }
    };
  
    const handleReset = () => {
        console.log(time);
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
        <main className="flex flex-col w-1/5 items-center mx-auto">
            <Button onClick={handleClick}>{isRunning ? "Stop working" : "Start working"}</Button>
            {formatTime(time)}
        </main>
    )
}
