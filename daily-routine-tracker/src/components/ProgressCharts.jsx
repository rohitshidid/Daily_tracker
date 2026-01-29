import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie, LineChart, Line, CartesianGrid, Legend
} from 'recharts';
import { format, subDays, startOfDay } from 'date-fns';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

const ProgressCharts = ({ allTasks }) => {
    // --- Data Preparation ---
    const today = new Date();

    // 1. Weekly Progress (Bar)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const dateKey = format(date, 'yyyy-MM-dd');
        const tasks = allTasks[dateKey] || [];
        const completed = tasks.filter(t => t.completed).length;
        const total = tasks.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        weeklyData.push({
            date: format(date, 'EEE'),
            fullDate: format(date, 'MMM d'),
            completed,
            total,
            percentage
        });
    }

    // 2. Today's Status (Pie)
    const todayKey = format(today, 'yyyy-MM-dd');
    const todayTasks = allTasks[todayKey] || [];
    const completedCount = todayTasks.filter(t => t.completed).length;
    const activeCount = todayTasks.length - completedCount;

    const pieData = [
        { name: 'Completed', value: completedCount },
        { name: 'Remaining', value: activeCount }
    ].filter(d => d.value > 0);

    // 3. Activity Trend (Line) - Last 14 days
    const trendData = [];
    for (let i = 13; i >= 0; i--) {
        const date = subDays(today, i);
        const dateKey = format(date, 'yyyy-MM-dd');
        const tasks = allTasks[dateKey] || [];
        trendData.push({
            date: format(date, 'd'),
            tasks: tasks.length,
            completed: tasks.filter(t => t.completed).length
        });
    }

    return (
        <div className="flex flex-col gap-8 h-full">
            {/* Top Row: Weekly Bar & Today's Pie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[200px]">
                {/* Weekly Bar */}
                <div className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)]">
                    <h3 className="text-sm font-medium mb-2 text-[var(--text-secondary)]">Weekly Completion %</h3>
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={weeklyData}>
                            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }}
                            />
                            <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                                {weeklyData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.percentage === 100 ? '#10b981' : '#6366f1'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Today's Pie */}
                <div className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)] flex flex-col items-center justify-center relative">
                    <h3 className="text-sm font-medium mb-2 text-[var(--text-secondary)] w-full text-left">Today's Split</h3>
                    {todayTasks.length === 0 ? (
                        <p className="text-xs text-[var(--text-muted)]">No tasks today</p>
                    ) : (
                        <ResponsiveContainer width="100%" height="90%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#10b981" /> {/* Completed */}
                                    <Cell fill="#334155" /> {/* Remaining */}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                    {/* Center text for Pie */}
                    {todayTasks.length > 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pt-6 pointer-events-none">
                            <span className="text-lg font-bold">{Math.round((completedCount / todayTasks.length) * 100)}%</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Row: Line Chart Trend */}
            <div className="bg-[var(--bg-secondary)] rounded-lg p-3 border border-[var(--border-color)] h-[200px]">
                <h3 className="text-sm font-medium mb-2 text-[var(--text-secondary)]">14-Day Activity Trend</h3>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={trendData}>
                        <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }}
                        />
                        <Line type="monotone" dataKey="tasks" stroke="#6366f1" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ProgressCharts;
