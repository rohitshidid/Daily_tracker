import React, { useState } from 'react';
import { format } from 'date-fns';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import Layout from './components/Layout';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import CalendarStrip from './components/CalendarStrip';
import ScheduleBoard from './components/ScheduleBoard';
import ProgressCharts from './components/ProgressCharts';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Trash2, Archive } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import FeedbackModal from './components/FeedbackModal';
import { MessageSquarePlus } from 'lucide-react';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allTasks, setAllTasks] = useLocalStorage('daily-tracker-tasks', {});
  const [activeDragItem, setActiveDragItem] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const todaysTasks = allTasks[dateKey] || [];

  const addTask = (text) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      scheduledSlot: null,
      createdAt: Date.now(),
    };

    setAllTasks(prev => ({
      ...prev,
      [dateKey]: [newTask, ...(prev[dateKey] || [])]
    }));
  };

  const toggleTask = (taskId) => {
    setAllTasks(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    }));
  };

  const deleteTask = (taskId) => {
    setAllTasks(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(t => t.id !== taskId)
    }));
  };

  const deleteDaysTasks = () => {
    if (confirm("Clear all tasks for this day?")) {
      setAllTasks(prev => {
        const newTasks = { ...prev };
        delete newTasks[dateKey];
        return newTasks;
      });
    }
  };

  const deleteAllTasks = () => {
    if (confirm("WARNING: This will delete ALL history. Continue?")) {
      setAllTasks({});
    }
  };

  const handleDragStart = (event) => {
    setActiveDragItem(event.active.data.current?.task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (over && over.id && String(over.id).startsWith('slot-')) {
      setAllTasks(prev => ({
        ...prev,
        [dateKey]: prev[dateKey].map(t =>
          t.id === active.id ? { ...t, scheduledSlot: over.id } : t
        )
      }));
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Layout>
        {/* Minimal Header */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--accent-primary)] rounded-lg">
              {/* Icon placeholder if needed, or just text */}
              <div className="w-6 h-6 bg-white rounded-sm opacity-20"></div>
            </div>
            <h1 className="text-xl font-bold tracking-tight">DailyFlow</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-input)] rounded-lg transition-colors flex items-center gap-2"
              title="Request Feature"
            >
              <MessageSquarePlus size={18} />
              <span className="text-sm font-medium hidden md:inline">Feedback</span>
            </button>
            <div className="w-px h-6 bg-[var(--border-color)] mx-1"></div>
            <span className="text-sm text-[var(--text-muted)] hidden md:inline">{format(new Date(), 'EEEE, MMMM do')}</span>
            <ThemeToggle />
          </div>
        </div>

        <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

        {/* Compact Grid Layout: Max height fixed to viewport subset */}
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-80px)]">

          {/* Left Column: Calendar & Tasks (4/12) */}
          <div className="col-span-4 flex flex-col gap-4 h-full">
            <CalendarStrip
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />

            {/* Tasks Container - Flex grow to fill remaining space */}
            <div id="tasks" className="glass-panel p-4 flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tasks</h2>
                <div className="flex gap-2">
                  <button
                    onClick={deleteDaysTasks}
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--bg-input)] rounded-md transition-colors"
                    title="Clear Day"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={deleteAllTasks}
                    className="p-1.5 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--bg-input)] rounded-md transition-colors"
                    title="Reset All"
                  >
                    <Archive size={16} />
                  </button>
                </div>
              </div>

              <TaskInput onAdd={addTask} />

              <div className="overflow-y-auto flex-1 pr-2 scrollbar-thin">
                <TaskList
                  tasks={todaysTasks}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                />
              </div>
            </div>
          </div>

          {/* Middle Column: Schedule (4/12) */}
          <div className="col-span-4 h-full">
            <div id="schedule" className="glass-panel p-4 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4">Schedule</h2>
              <div className="flex-1 overflow-hidden">
                <ScheduleBoard tasks={todaysTasks} />
              </div>
            </div>
          </div>

          {/* Right Column: Analytics (4/12) */}
          <div className="col-span-4 h-full">
            <div id="analytics" className="glass-panel p-4 h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4">Analytics</h2>
              <div className="flex-1 min-h-0">
                <ProgressCharts allTasks={allTasks} />
              </div>
            </div>
          </div>

        </div>
      </Layout>
    </DndContext>
  );
}

export default App;
