import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/AuthContext";
import { addTimerForUsername, deleteTimerByIdForUsername, retrieveALlTimersForUsername, TimerResponseDataType, updateTimerForUsername } from "@/api/TimerApi";
import { DefaultSuccessfulToast, DefaultUnsuccessfulToast, TimerSuccessfulToast, TimerUnsuccessfulToast } from "./TimerToasts";
import { formatTime } from "./TimerUtils";
import { DataTable } from "./TimerDataTable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import React from "react";
import { toast } from "@/hooks/use-toast";

type EditableRows = {
  [key: string]: boolean;
};

export default function Timer() {
    const auth = useAuth();
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [timerData, setTimerData] = useState<TimerResponseDataType[]>([]);
    const [editableRows, setEditableRows] = useState<EditableRows>({});

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
                addTimerForUsername(auth.username, auth.token, time).then(() => {
                    retrieveALlTimersForUsername(auth.username, auth.token).then((timers) => setTimerData(timers));
                    TimerSuccessfulToast(formatTime(time))
                }
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

    const editTimer = (e: React.ChangeEvent<HTMLInputElement>, rowId: number) => {
      const { id, value } = e.currentTarget;
      setTimerData(prevData => prevData.map(timer =>
          timer.id === rowId ? { ...timer, [id]: new Date(value) } : timer
      ));
    };

    const saveEdit = (id: number) => {
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

      if (auth.username && auth.token) {
        updateTimerForUsername(auth.username, auth.token, updatedTimer).then(() => {
          DefaultSuccessfulToast(updatedTimer, "Timer updated successfully");
              setEditableRows(prev => {
                  const updated = { ...prev };
                  delete updated[id];
                  return updated;
              });
          }).catch(() => {
            DefaultUnsuccessfulToast(`${updatedTimer.from_time} : ${updatedTimer.to_time}`,"Failed to update timer");
          });
      }
  };

    const timerDataTableColumns: ColumnDef<TimerResponseDataType>[] = [
        {
          accessorKey: "id",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        },
        {
          accessorKey: "date",
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
        },
        {
          accessorKey: "time",
          header: "Worked time",
        },
        {
          accessorKey: "from_time",
          header: "From time",
          cell: ({ row }) => {
            const isEditable = row.original.id in editableRows;
    
            return isEditable ? <Input id="from_time" type="time" defaultValue={row.original.from_time.toString()} onChange={(e) => editTimer(e, row.original.id)}/>
              : row.original.from_time;
          }
        },
        {
          accessorKey: "to_time",
          header: "To time",
          cell: ({ row }) => {
            const isEditable = row.original.id in editableRows;

            return isEditable ? <Input id="to_time" type="time" defaultValue={row.original.to_time.toString()} onChange={(e) => editTimer(e, row.original.id)}/>
              : row.original.to_time;
          }
        },
        {
          accessorKey: "action",
          header: "Action",
          cell: ({ row }) => {

            const timer = row.original;            
            const isEditable = timer.id in editableRows;

            function disableRowEditing(): void {
              setEditableRows(prevState => {
                const updatedState = { ...prevState };
                delete updatedState[timer.id];
                return updatedState;
              });
            }

            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                        deleteTimerByIdForUsername(auth.username, auth.token, row.original.id).then(() => {
                            retrieveALlTimersForUsername(auth.username, auth.token).then((timers) => setTimerData(timers));
                            TimerSuccessfulToast("Timer deleted successfully")
                        }).catch(() => 
                        TimerUnsuccessfulToast("Failed to delete timer")
                    )
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                  {isEditable ? 
                    <>
                      <DropdownMenuItem onClick={() => saveEdit(row.original.id)}>Save</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => disableRowEditing()}>Stop editing</DropdownMenuItem>
                    </>
                    :
                    <DropdownMenuItem onClick={() => {
                        setEditableRows(prevState => ({
                          ...prevState,
                          [timer.id]: true,
                        }));
                      }}
                    > 
                      Edit
                    </DropdownMenuItem>
                  }
                </DropdownMenuContent>
              </DropdownMenu>
          )
        },
        },
      ]

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
