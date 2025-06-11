import React from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { isBefore, startOfDay } from "date-fns";
import { FormControlType } from "@/lib/form";

interface ProtestDatePickerProps {
  control: FormControlType;
  label: string;
  type?: "start" | "end";
}

export default function ProtestDatePicker({
  control,
  label,
  type,
}: ProtestDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Helper function to format time for input
  const formatTimeForInput = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  // Helper function to update time while keeping the same date
  const updateDateTime = (
    currentDate: Date | undefined,
    timeString: string
  ) => {
    if (!currentDate) {
      // If no date is selected, use today's date
      currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
    }

    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    const newDate = new Date(currentDate);
    newDate.setHours(hours || 0, minutes || 0, seconds || 0, 0);
    return newDate;
  };

  // Helper function to update date while keeping the same time
  const updateDateKeepTime = (
    newDate: Date,
    currentDateTime: Date | undefined
  ) => {
    if (!currentDateTime) {
      // If no time is set, default to 10:30:00
      newDate.setHours(10, 30, 0, 0);
      return newDate;
    }

    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    const updatedDate = new Date(newDate);
    updatedDate.setHours(hours, minutes, seconds, 0);
    return updatedDate;
  };

  return (
    <FormField
      control={control}
      name={type === "start" ? "start_time" : "end_time"}
      render={({ field }) => (
        <FormItem className="basis-1/2">
          <FormLabel>
            {label}
            <span className="text-destructive">*</span>
          </FormLabel>
          <div className="flex gap-4">
            {/* Date Picker */}
            <div className="flex flex-col gap-1">
              <Label className="text-sm">날짜</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-32 justify-between font-normal"
                    type="button"
                  >
                    {field.value
                      ? field.value.toLocaleDateString()
                      : "날짜 선택"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      if (date) {
                        const updatedDateTime = updateDateKeepTime(
                          date,
                          field.value
                        );
                        field.onChange(updatedDateTime);
                      }
                      setOpen(false);
                    }}
                    disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* Time Picker */}
            <div className="flex flex-col gap-1">
              <Label className="px-1 text-sm">시각</Label>
              <FormControl>
                <Input
                  type="time"
                  step="1"
                  value={
                    field.value ? formatTimeForInput(field.value) : "10:30:00"
                  }
                  onChange={(e) => {
                    const updatedDateTime = updateDateTime(
                      field.value,
                      e.target.value
                    );
                    field.onChange(updatedDateTime);
                  }}
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
