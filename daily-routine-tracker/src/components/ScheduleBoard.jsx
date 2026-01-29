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
                "relative flex gap-4 p-3 border-b border-[var(--border-color)] transition-colors min-h-[80px]",
                isOver && "bg-[var(--bg-input)] ring-1 ring-inset ring-[var(--accent-primary)]"
            )}
        >
            {isCurrentHour && (
                <div
                    className="absolute left-[4rem] right-0 border-t-2 border-red-500 z-20 pointer-events-none flex items-center"
                    style={{ top: topPosition }}
                >
                    <div className="w-2 h-2 rounded-full bg-red-500 -ml-1"></div>
                </div>
            )}
            <div className="w-16 text-right text-sm text-[var(--text-muted)] font-medium pt-1">
                {time}
            </div>
            <div className="flex-1 space-y-2">
                {tasks.map(task => (
                    <div key={task.id} className="p-2 bg-[var(--bg-card)] rounded-lg text-sm border border-[var(--border-color)] shadow-sm flex items-center gap-2 relative z-10">
                        <Clock size={14} className="text-[var(--accent-primary)]" />
                        <span className={task.completed ? "line-through opacity-50" : ""}>{task.text}</span>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <div className="h-full w-full border-2 border-dashed border-transparent hover:border-[var(--border-color)] rounded-lg transition-colors" />
                )}
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
    for (let i = 6; i <= 23; i++) {
        const hour = i > 12 ? `${i - 12} PM` : i === 12 ? '12 PM' : `${i} AM`;
        hours.push({ id: `slot-${i}`, label: hour, hour24: i });
    }

    const currentHour = new Date().getHours();

    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-thin rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] relative">
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
