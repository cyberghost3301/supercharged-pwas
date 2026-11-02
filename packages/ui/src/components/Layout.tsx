import React, { ReactNode } from 'react';
import { Menu } from 'lucide-react';

interface LayoutProps {
  sidebar?: ReactNode;
  children: ReactNode;
  title?: string;
}

export function AppLayout({ sidebar, children, title = 'Supercharged App' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-(--color-surface) dark:bg-(--color-surface-dark) text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Navbar */}
      <header className="glass sticky top-0 z-50 flex items-center justify-between p-4 h-16">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Sidebar"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            {title}
          </h1>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Backdrop for mobile */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
              />
            )}
            
            <aside 
              className={`fixed md:relative z-40 h-[calc(100vh-4rem)] w-64 glass transform transition-transform duration-300 ease-in-out border-r border-(--color-glass-border-light) dark:border-(--color-glass-border-dark) ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
              <div className="p-4 h-full overflow-y-auto">
                {sidebar}
              </div>
            </aside>
          </>
        )}

        {/* Content Page */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
