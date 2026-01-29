import React from 'react';
import { LayoutDashboard, Calendar, BarChart3, ListTodo } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--accent-primary)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--success)] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000"></div>

      <main className="container mx-auto px-4 z-10 relative h-screen py-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
