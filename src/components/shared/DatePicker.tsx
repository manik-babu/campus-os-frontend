"use client"

import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Dispatch, SetStateAction } from "react"
import { cn } from "@/lib/utils"

interface DatePickerSimpleProps {
  className?: string
  label: string
  date?: Date
  setDate: Dispatch<SetStateAction<Date | undefined>>
  setTimeToEndOfDay?: boolean
}

export function DatePickerSimple({ date, setDate, label = "Pick a date", className, setTimeToEndOfDay = false }: DatePickerSimpleProps) {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && setTimeToEndOfDay) {
      // Create a new date at 11:59 PM in local timezone (Bangladesh time)
      // Get the local date components
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const dateValue = selectedDate.getDate()

      // Create a new Date with 11:59:59 PM in local timezone
      const dateTime = new Date(year, month, dateValue, 23, 59, 59, 999)
      setDate(dateTime)
    }
    else if (selectedDate) {
      const year = selectedDate.getFullYear()
      const month = selectedDate.getMonth()
      const dateValue = selectedDate.getDate()
      const dateTime = new Date(year, month, dateValue)

      setDate(dateTime)
    }
  }

  return (
    <Field className={cn("mx-auto")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-simple"
            className={cn("justify-start font-normal w-fit!", className)}
          >
            {date ? format(date, "PPP") : <span>{label}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
