import { useState } from 'react';
import { AppLayout } from '@supercharged/ui';
import { GlassStudio } from './components/GlassStudio';
import { GradientStudio } from './components/GradientStudio';

const TOOLS = [
  { id: 'glass', name: 'Glassmorphism Studio' },
  { id: 'gradient', name: 'Gradient Studio' },
];

function App() {
  const [activeTool, setActiveTool] = useState('glass');

  return (
    <AppLayout title="CSS Master" showSidebar>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent w-fit">
          CSS Master
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Visual generator for modern Tailwind / CSS properties.
        </p>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTool === tool.id
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                : 'glass text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {tool.name}
          </button>
        ))}
      </div>
      
      <div className="mt-6 h-[calc(100vh-20rem)]">
        {activeTool === 'glass' && <GlassStudio />}
        {activeTool === 'gradient' && <GradientStudio />}
      </div>
    </AppLayout>
  )
}

export default App
