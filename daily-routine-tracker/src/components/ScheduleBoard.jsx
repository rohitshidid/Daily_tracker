import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Clock } from 'lucide-react';
import clsx from 'clsx';

// A single time slot component
const TimeSlot = ({ id, time, tasks, isOver, isCurrentHour }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    // Calculate position for current time line if this is the current hour
    const [minutes, setMinutes] = React.useState(new Date().getMinutes());

    React.useEffect(() => {
        if (!isCurrentHour) return;
        const interval = setInterval(() => setMinutes(new Date().getMinutes()), 60000);
        return () => clearInterval(interval);
    }, [isCurrentHour]);

    const topPosition = isCurrentHour ? `${(minutes / 60) * 100}%` : '0%';

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                "relative flex gap-2 px-3 py-1 border-b border-[var(--border-color)] transition-colors flex-1 min-h-[0] items-center",
                isOver && "bg-[var(--bg-input)] ring-1 ring-inset ring-[var(--accent-primary)]"
            )}
        >
            {isCurrentHour && (
                <div
                    className="absolute left-[3.5rem] right-0 border-t-2 border-red-500 z-20 pointer-events-none flex items-center"
                    style={{ top: topPosition }}
                >
                    <div className="w-2 h-2 rounded-full bg-red-500 -ml-1"></div>
                </div>
            )}
            <div className="w-14 text-right text-xs text-[var(--text-muted)] font-medium shrink-0">
                {time}
            </div>
            <div className="flex-1 flex gap-1 overflow-x-auto scrollbar-none h-full items-center">
                {tasks.map(task => (
                    <div key={task.id} className="px-2 py-0.5 bg-[var(--bg-card)] rounded text-xs border border-[var(--border-color)] shadow-sm flex items-center gap-1 whitespace-nowrap shrink-0">
                        <span className={task.completed ? "line-through opacity-50" : ""}>{task.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ScheduleBoard = ({ schedule, tasks, activeId }) => {
    // Force re-render every minute to update time line and current hour
    const [_, setTick] = React.useState(0);
    React.useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), 60000);
        return () => clearInterval(timer);
    }, []);

    const hours = [];
    for (let i = 0; i <= 23; i++) {
        const hour = i === 0 ? '12 AM' : i > 12 ? `${i - 12} PM` : i === 12 ? '12 PM' : `${i} AM`;
        hours.push({ id: `slot-${i}`, label: hour, hour24: i });
    }

    const currentHour = new Date().getHours();

    return (
        <div className="flex flex-col h-full rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] relative overflow-hidden">
            {hours.map((h) => {
                // Find tasks scheduled for this slot
                const slotTasks = tasks.filter(t => t.scheduledSlot === h.id);
                const isCurrent = h.hour24 === currentHour;

                return (
                    <TimeSlot
                        key={h.id}
                        id={h.id}
                        time={h.label}
                        tasks={slotTasks}
                        isOver={activeId === h.id}
                        isCurrentHour={isCurrent}
                    />
                );
            })}
        </div>
    );
};

export default ScheduleBoard;
