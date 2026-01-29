import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TaskInput = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text.trim());
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative mb-6 group">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a new task..."
                className="input-field pr-12 text-lg py-3 shadow-inner bg-[var(--bg-secondary)] border-[var(--border-color)] focus:border-[var(--accent-primary)] focus:bg-[var(--bg-card)] transition-all"
                autoFocus
            />
            <button
                type="submit"
                disabled={!text.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[var(--accent-primary)] text-white rounded-md hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <Plus size={20} />
            </button>

            {/* Glow effect on focus */}
            <div className="absolute inset-0 rounded-lg bg-[var(--accent-primary)] opacity-0 group-focus-within:opacity-10 pointer-events-none -z-10 blur-md transition-opacity duration-300"></div>
        </form>
    );
};

export default TaskInput;
