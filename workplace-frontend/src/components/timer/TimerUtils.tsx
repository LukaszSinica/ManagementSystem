import { TimerResponseDataType } from "@/api/TimerApi";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const format = (unit: number) => String(unit).padStart(2, '0');
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};

export const timerDataTableColumns: ColumnDef<TimerResponseDataType>[] = [
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
    },
    {
      accessorKey: "to_time",
      header: "To time",
    }
  ]