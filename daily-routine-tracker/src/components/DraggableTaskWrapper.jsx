import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';
import clsx from 'clsx';

export const DraggableTaskItem = ({ task, children }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: task.id,
        data: { task }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={clsx(
                "cursor-grab active:cursor-grabbing touch-none", // touch-none for mobile dnd
                isDragging && "opacity-50"
            )}
        >
            {children}
        </div>
    );
};
