import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/AuthContext";
import { retrieveALlTimersForUsername, TimerResponseDataType } from "@/api/TimerApi";
import { formatTime } from "./TimerUtils";
import { DataTable } from "../ui/DataTable";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { format } from "date-fns";
import DatePicker from "./components/DatePicker";
import TimerDropdownMenuContent from "./components/TimerDropdownMenuContent";
import { useTimerContext } from "./TimerContext";

export type EditableRows = {
  [key: string]: boolean;
};

export default function Timer() {
    const auth = useAuth();
    const { 
      isRunning, 
      time, 
      timerData, 
      setTimerData, 
      editableRows, 
      handleDateEdit, 
      editTimer, 
      disableRowEditing, 
      handleEditRow,
      handleClick,
      saveEdit,
      handleDeleteTimer
    } = useTimerContext();
  
    useEffect(() => {
        retrieveALlTimersForUsername(auth.username, auth.token).then((timers) => setTimerData(timers));
    }, [auth.username, auth.token])
    

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
      cell: ({ row }) => {
        const formattedDate = format(new Date(row.original.date), "PPP");
        const isEditable = row.original.id in editableRows;
        return isEditable ?  
        <DatePicker formattedDate={formattedDate} rowId={row.original.id} handleDateEdit={handleDateEdit}/>
          : formattedDate;
      }
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
      accessorKey: "time",
      header: "Worked time",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {

        const timer = row.original;            
        const isEditable = timer.id in editableRows;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <TimerDropdownMenuContent 
              isEditable={isEditable} 
              rowId={timer.id} 
              handleDeleteTimer={() => handleDeleteTimer(row.original.id, auth.username, auth.token)} 
              saveEdit={() => saveEdit(timer.id, auth.username, auth.token)} 
              disableRowEditing={disableRowEditing} 
              handleEditRow={handleEditRow}
            />
          </DropdownMenu>
      )
    },
    },
    
  ]

    return (
        <main className="flex flex-col w-2/5 items-center mx-auto">
            <div>
                <Button onClick={() => handleClick(auth.username, auth.token)} className="mx-4">{isRunning ? "Stop working" : "Start working"}</Button>
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
