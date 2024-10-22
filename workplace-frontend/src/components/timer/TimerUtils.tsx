import { TimerResponseDataType } from "@/api/TimerApi";
import { ColumnDef } from "@tanstack/react-table"

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
      header: "ID",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "time",
      header: "Worked time",
    },
  ]