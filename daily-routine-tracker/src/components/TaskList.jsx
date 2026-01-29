import React from 'react';
import { CheckCircle2, Circle, Trash2, GripVertical } from 'lucide-react';
import clsx from 'clsx';
import { DraggableTaskItem } from './DraggableTaskWrapper';

const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <DraggableTaskItem task={task}>
            <div
                className={clsx(
                    "group flex items-center gap-3 p-3 mb-2 rounded-xl transition-all duration-300 border border-transparent",
                    task.completed
                        ? "bg-[var(--bg-primary)] opacity-60"
                        : "bg-[var(--bg-card)] hover:border-[var(--border-color)] hover:shadow-lg hover:-translate-y-0.5"
                )}
            >
                <div className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-grab active:cursor-grabbing">
                    <GripVertical size={16} />
                </div>

                <button
                    onClick={() => onToggle(task.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors focus:outline-none"
                >
                    {task.completed ? (
                        <CheckCircle2 className="text-[var(--success)]" size={24} />
                    ) : (
                        <Circle size={24} />
                    )}
                </button>

                <span
                    className={clsx(
                        "flex-1 text-base transition-all",
                        task.completed ? "line-through text-[var(--text-muted)]" : "text-[var(--text-primary)]"
                    )}
                >
                    {task.text}
                </span>

                <button
                    onClick={() => onDelete(task.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-[var(--danger)] hover:bg-[rgba(239,68,68,0.1)] rounded-lg transition-all focus:opacity-100"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </DraggableTaskItem>
    );
};

const TaskList = ({ tasks, onToggle, onDelete }) => {
    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    // Sort: Active first (newest top), then completed
    const sortedTasks = [...activeTasks.reverse(), ...completedTasks];

    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 text-[var(--text-muted)]">
                <p>No tasks yet. Start your day!</p>
            </div>
        );
    }

    return (
        <div className="space-y-1">
            {sortedTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;
