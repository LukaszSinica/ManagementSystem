import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

export default function DatePicker({formattedDate, rowId, handleDateEdit}: {formattedDate: string, rowId: number, handleDateEdit: (selectedDay: Date, rowId: number) => void}) {

  return (
    <Popover>
        <PopoverTrigger asChild>
        <Button
            variant={"outline"}
            className={cn(
            "w-[280px] justify-start text-left font-normal",
            !formattedDate && "text-muted-foreground"
            )}
        >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formattedDate || <span>Pick a date</span>}
        </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
        <Calendar
            mode="single"
            selected={new Date(formattedDate)}
            onSelect={(_, selectedDay) => handleDateEdit(selectedDay, rowId)}
            initialFocus
        />
        </PopoverContent>
    </Popover>
  )
}
