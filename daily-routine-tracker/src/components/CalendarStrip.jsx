import React from 'react';
import { format, addDays, subDays, isToday, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import clsx from 'clsx';

const CalendarStrip = ({ selectedDate, onDateChange }) => {
    const dates = [];
    // Show 2 days before and 2 days after selected date
    for (let i = -2; i <= 2; i++) {
        dates.push(addDays(selectedDate, i));
    }

    return (
        <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold capitalize">
                        {isToday(selectedDate) ? 'Today' : format(selectedDate, 'EEEE')}
                    </h2>
                    <span className="text-[var(--text-secondary)] text-lg font-medium">
                        {format(selectedDate, 'MMM d, yyyy')}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onDateChange(subDays(selectedDate, 1))}
                        className="p-2 hover:bg-[var(--bg-input)] rounded-lg transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <button
                        onClick={() => onDateChange(new Date())}
                        className="px-3 py-1 text-sm font-medium bg-[var(--bg-input)] hover:bg-[var(--text-muted)] text-[var(--text-primary)] rounded-md transition-colors"
                    >
                        Today
                    </button>

                    <button
                        onClick={() => onDateChange(addDays(selectedDate, 1))}
                        className="p-2 hover:bg-[var(--bg-input)] rounded-lg transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Date Bubbles */}
            <div className="flex justify-between md:justify-start md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map((date) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isCurrentDay = isToday(date);

                    return (
                        <button
                            key={date.toString()}
                            onClick={() => onDateChange(date)}
                            className={clsx(
                                "flex flex-col items-center justify-center min-w-[60px] h-[70px] rounded-2xl transition-all duration-200 border-2",
                                isSelected
                                    ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white shadow-glow transform -translate-y-1"
                                    : "bg-[var(--bg-card)] border-transparent text-[var(--text-secondary)] hover:border-[var(--border-color)] hover:bg-[var(--bg-input)]"
                            )}
                        >
                            <span className="text-xs font-medium uppercase tracking-wider mb-1">
                                {format(date, 'EEE')}
                            </span>
                            <span className={clsx("text-xl font-bold", isCurrentDay && !isSelected && "text-[var(--accent-primary)]")}>
                                {format(date, 'd')}
                            </span>
                            {isCurrentDay && (
                                <div className={clsx("w-1 h-1 rounded-full mt-1", isSelected ? "bg-white" : "bg-[var(--accent-primary)]")} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarStrip;
