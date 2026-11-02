import { useState, useMemo } from 'react';

export function JsonFormatter() {
  const [input, setInput] = useState('');
  const [space, setSpace] = useState(2);

  const formatted = useMemo(() => {
    if (!input.trim()) return '';
    try {
      const parsed = JSON.parse(input);
      return JSON.stringify(parsed, null, space);
    } catch (e: any) {
      return `Error: ${e.message}`;
    }
  }, [input, space]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-center">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Raw JSON</label>
        </div>
        <textarea
          className="flex-1 w-full p-4 rounded-xl glass font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='{"hello": "world"}'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 h-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <label className="font-semibold text-zinc-700 dark:text-zinc-300">Formatted Output</label>
            <select 
              value={space}
              onChange={(e) => setSpace(Number(e.target.value))}
              className="text-sm bg-transparent border border-zinc-200 dark:border-white/10 rounded-lg px-2 py-1 outline-none"
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
              <option value={0}>Minified</option>
            </select>
          </div>
          <button 
            onClick={copyToClipboard}
            disabled={!formatted || formatted.startsWith('Error')}
            className="px-3 py-1 rounded-lg text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Copy
          </button>
        </div>
        <div className={`flex-1 w-full p-4 rounded-xl glass font-mono text-sm overflow-auto ${
          formatted.startsWith('Error') ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'
        }`}>
          <pre>{formatted || 'Waiting for input...'}</pre>
        </div>
      </div>
    </div>
  );
}
