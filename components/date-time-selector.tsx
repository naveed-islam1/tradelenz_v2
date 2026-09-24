"use client";

import { useMemo, useState } from "react";
import { format, parseISO, setHours, setMinutes } from "date-fns";
import { DayPicker, type NavProps } from "react-day-picker";

import "react-day-picker/style.css";

type DateTimeSelectorProps = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const CalendarNavigation = ({ nextMonth, onNextClick, onPreviousClick, previousMonth }: NavProps) => (
  <nav aria-label="Calendar navigation" className="absolute inset-x-4 top-4 flex h-11 items-center justify-between">
    <button
      className="h-11 rounded-lg bg-[#172033] px-3 text-xs font-medium text-[#94a3b8] transition hover:bg-[#263650] hover:text-[#e2ecf6] disabled:cursor-not-allowed disabled:opacity-40"
      disabled={!previousMonth}
      onClick={onPreviousClick}
      type="button"
    >
      Previous
    </button>
    <button
      className="h-11 rounded-lg bg-[#172033] px-3 text-xs font-medium text-[#94a3b8] transition hover:bg-[#263650] hover:text-[#e2ecf6] disabled:cursor-not-allowed disabled:opacity-40"
      disabled={!nextMonth}
      onClick={onNextClick}
      type="button"
    >
      Next
    </button>
  </nav>
);

const DateTimeSelector = ({ label, required, value, onChange }: DateTimeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = useMemo(() => (value ? parseISO(value) : undefined), [value]);

  const saveDate = (date: Date, time = selectedDate ? format(selectedDate, "HH:mm") : "09:30") => {
    const [hours, minutes] = time.split(":").map(Number);
    const nextDate = setMinutes(setHours(date, hours), minutes);
    onChange(format(nextDate, "yyyy-MM-dd'T'HH:mm"));
  };

  return (
    <div className="relative">
      <p className="mb-[7px] text-xs font-medium leading-4 text-[#94a3b8]">
        {label}{required && <span className="ml-1 text-[#22c55e]">*</span>}
      </p>

      <button
        aria-expanded={isOpen}
        className="flex h-11 w-full items-center justify-between rounded-lg border border-[#333f52] bg-[#202d44] px-3 text-left text-sm text-[#e2ecf6] outline-none transition hover:bg-[#263650] focus:border-[#22c55e]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className={selectedDate ? "text-[#e2ecf6]" : "text-[#94a3b8]"}>
          {selectedDate ? format(selectedDate, "EEE, MMM d, yyyy · hh:mm a") : "Select date and time"}
        </span>
        <span className="text-xs font-medium text-[#38bdf8]">Calendar</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 z-40 mt-2 w-[min(640px,calc(100vw-3rem))] rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.34)]">
          <div className="mb-4 flex h-11 gap-3">
            <div className="flex min-w-0 flex-1 items-center justify-between rounded-lg border border-[#333f52] bg-[#202d44] px-3 text-sm text-[#e2ecf6]">
              <span>{selectedDate ? format(selectedDate, "EEE, MMM d, yyyy") : "Select a date"}</span>
              <span className="text-xs font-medium text-[#38bdf8]">Calendar</span>
            </div>
            <label className="flex w-[210px] items-center justify-between rounded-lg border border-[#333f52] bg-[#202d44] px-3 text-sm text-[#e2ecf6]">
              <input
                aria-label="Time"
                className="w-[110px] bg-transparent text-sm text-[#e2ecf6] outline-none [color-scheme:dark]"
                onChange={(event) => saveDate(selectedDate ?? new Date(), event.target.value)}
                type="time"
                value={selectedDate ? format(selectedDate, "HH:mm") : "09:30"}
              />
              <span className="text-xs font-medium text-[#38bdf8]">Time</span>
            </label>
          </div>

          <div className="rounded-[10px] border border-[#333f52] bg-[#202d44] p-4">
            <DayPicker
              classNames={{
                root: "relative w-full",
                months: "w-full",
                month: "w-full",
                month_caption: "flex h-11 items-center justify-center",
                caption_label: "text-xl font-semibold leading-7 text-[#e2ecf6]",
                month_grid: "mt-3 w-full border-collapse",
                weekdays: "h-9",
                weekday: "text-center text-xs font-medium text-[#94a3b8]",
                week: "h-9",
                day: "h-9 text-center",
                day_button: "grid size-9 place-items-center rounded-full text-sm text-[#e2ecf6] transition hover:bg-[#263650]",
                selected: "[&>button]:bg-[#22c55e] [&>button]:font-medium [&>button]:text-[#0d1627] hover:[&>button]:bg-[#22c55e]",
                outside: "opacity-45",
                today: "[&>button]:text-[#38bdf8]",
              }}
              components={{ Nav: CalendarNavigation }}
              fixedWeeks
              mode="single"
              onSelect={(date) => {
                if (!date) return;
                saveDate(date);
                setIsOpen(false);
              }}
              selected={selectedDate}
              showOutsideDays
            />
          </div>

          <div className="mt-4 flex justify-end border-t border-[#29374d] pt-4">
            <button
              className="h-9 rounded-lg border border-[#3a4a64] bg-[#202d44] px-4 text-sm font-medium text-[#cbd5e1] transition hover:border-[#52657f] hover:bg-[#263650] hover:text-white"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              Close calendar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
