import { useState } from 'react';
import { AppLayout } from '@supercharged/ui';
import { JwtDecoder } from './components/JwtDecoder';
import { JsonFormatter } from './components/JsonFormatter';
import { RegexTester } from './components/RegexTester';
import { Base64Converter } from './components/Base64Converter';
import { CronSimulator } from './components/CronSimulator';

const TOOLS = [
  { id: 'jwt', name: 'JWT Decoder' },
  { id: 'json', name: 'JSON Formatter' },
  { id: 'regex', name: 'Regex Tester' },
  { id: 'base64', name: 'Base64 Converter' },
  { id: 'cron', name: 'Cron Simulator' },
];

function App() {
  const [activeTool, setActiveTool] = useState('jwt');

  return (
    <AppLayout title="DevCanvas" showSidebar>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent w-fit">
          Web Toolbox
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your offline-first multitool for JWT, JSON, Regex, and more.
        </p>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTool === tool.id
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'glass text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            {tool.name}
          </button>
        ))}
      </div>
      
      <div className="mt-6 h-[calc(100vh-20rem)]">
        {activeTool === 'jwt' && <JwtDecoder />}
        {activeTool === 'json' && <JsonFormatter />}
        {activeTool === 'regex' && <RegexTester />}
        {activeTool === 'base64' && <Base64Converter />}
        {activeTool === 'cron' && <CronSimulator />}
      </div>
    </AppLayout>
  )
}

export default App
