import { addTimerForUsername, deleteTimerByIdForUsername, retrieveALlTimersForUsername, TimerResponseDataType, updateTimerForUsername } from "@/api/TimerApi";
import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { EditableRows } from "./Timer";
import { DefaultSuccessfulToast, DefaultUnsuccessfulToast, TimerSuccessfulToast, TimerUnsuccessfulToast } from "./TimerToasts";
import { toast } from "@/hooks/use-toast";
import { formatTime } from "./TimerUtils";


type TimerContextType = {
    isRunning: boolean;
    setIsRunning: (isRunning: boolean) => void;
    time: number;
    setTime: (time: number) => void;
    timerData: TimerResponseDataType[];
    setTimerData: (timerData: TimerResponseDataType[]) => void;
    editableRows: EditableRows;
    setEditableRows: (editableRows: EditableRows) => void;
    timerRef: React.MutableRefObject<NodeJS.Timeout | null>;
    handleDateEdit: (selectedDay: Date, rowId: number) => void;
    handleReset: () => void;
    editTimer: (e: React.ChangeEvent<HTMLInputElement>, rowId: number) => void;
    disableRowEditing: (rowId: number) => void;
    handleEditRow: (rowId: number) => void;
    handleClick: (username:string, token: string) => void;
    saveEdit: (id: number, username:string, token: string) => void;
    handleDeleteTimer: (rowId: number, username: string, token: string) => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [timerData, setTimerData] = useState<TimerResponseDataType[]>([]);
    const [editableRows, setEditableRows] = useState<EditableRows>({});
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleDateEdit = (selectedDay: Date, rowId: number) => {
        setTimerData(prevData => prevData.map(timer =>
            timer.id === rowId? {...timer, date: selectedDay } : timer
        ));
      }
  
    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const editTimer = (e: React.ChangeEvent<HTMLInputElement>, rowId: number) => {
        const { id, value } = e.currentTarget;
        setTimerData(prevData => prevData.map(timer =>
            timer.id === rowId ? { ...timer, [id]: value } : timer
        ));
    };

    function disableRowEditing(rowId: number): void {
        setEditableRows(prevState => {
          const updatedState = { ...prevState };
          delete updatedState[rowId];
          return updatedState;
        });
      }
    
    const handleEditRow = (rowId: number) => {
        setEditableRows(prevState => ({
          ...prevState,
          [rowId]: true,
        }));
    };

    const handleClick = (username:string, token:string) => {
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
            if(username && token) {
                addTimerForUsername(username, token, time).then(() => {
                    retrieveALlTimersForUsername(username, token).then((timers) => setTimerData(timers));
                    TimerSuccessfulToast(formatTime(time))
                }
                ).catch(() => 
                    TimerUnsuccessfulToast(formatTime(time))
                )
            }
            handleReset();
        }
    };

    const saveEdit = (id: number, username:string, token: string) => {
      const updatedTimer = timerData.find(timer => timer.id === id);

      if (!updatedTimer) return;

      if (updatedTimer.from_time > updatedTimer.to_time) {
        return toast({
          title: "Time was not added",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{time}</code>
            </pre>
          ),
        })
      }
    
      if (username && token) {
        const date = new Date(updatedTimer.date)
        const requestData = {
          id: updatedTimer.id,
          date: date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }),
          from_time: updatedTimer.from_time.toString(),
          to_time: updatedTimer.to_time.toString(),
        }
        updateTimerForUsername(username, token, requestData).then(() => {
          DefaultSuccessfulToast(updatedTimer, "Timer updated successfully");
              setEditableRows(prev => {
                  const updated = { ...prev };
                  delete updated[id];
                  return updated;
              });
              retrieveALlTimersForUsername(username, token).then((timers) => setTimerData(timers));
          }).catch(() => {
            DefaultUnsuccessfulToast(`${updatedTimer.from_time} : ${updatedTimer.to_time}`,"Failed to update timer");
          });
      }
  };

  const handleDeleteTimer = (rowId: number, username: string, token: string) => {
    deleteTimerByIdForUsername(username, token, rowId).then(() => {
      retrieveALlTimersForUsername(username, token).then((timers) => setTimerData(timers));
      TimerSuccessfulToast("Timer deleted successfully");
    }).catch(() => TimerUnsuccessfulToast("Failed to delete timer")
    );
  };
  
    const contextValue = {
        isRunning, 
        setIsRunning, 
        time, 
        setTime, 
        timerData, 
        setTimerData, 
        editableRows, 
        setEditableRows, 
        timerRef, 
        handleDateEdit, 
        handleReset, 
        editTimer, 
        disableRowEditing, 
        handleEditRow,
        handleClick,
        saveEdit,
        handleDeleteTimer
    }

    return (
        <TimerContext.Provider value={contextValue}>
            {children}
        </TimerContext.Provider>
    )
}

export const useTimerContext = (): TimerContextType => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};