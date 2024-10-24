import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/AuthContext";
import { addTimerForUsername, deleteTimerByIdForUsername, retrieveALlTimersForUsername, TimerResponseDataType } from "@/api/TimerApi";
import { TimerSuccessfulToast, TimerUnsuccessfulToast } from "./TimerToasts";
import { formatTime } from "./TimerUtils";
import { DataTable } from "./TimerDataTable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export default function Timer() {
    const auth = useAuth();
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [timerData, setTimerData] = useState<TimerResponseDataType[]>([]);
    const [editableRows, setEditableRows] = useState({});

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
            if(isEditable) {
                return <Input type="time" value={row.original.from_time.toString()}/>
            }
            return row.original.from_time;
          }
        },
        {
          accessorKey: "to_time",
          header: "To time",
          cell: ({ row }) => {
            const isEditable = row.original.id in editableRows;
            if(isEditable) {
                return <Input type="time" value={row.original.to_time.toString()}/>
            }
            return row.original.to_time;
          }
        },
        {
          accessorKey: "action",
          header: "Action",
          cell: ({ row }) => {

            const timer = row.original
 
              function editRow(id: number): void {
                setEditableRows(prevState => ({
                    ...prevState,
                    [id]: true,
                }));
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
                  <DropdownMenuItem
                    onClick={() => editRow(timer.id)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
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
