import { useState } from 'react';

export function Base64Converter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const process = (val: string, action: 'encode' | 'decode') => {
    setInput(val);
    setError('');
    if (!val) {
      setOutput('');
      return;
    }
    try {
      if (action === 'encode') {
        // Encode text to base64
        // Use TextEncoder to handle unicode characters properly
        const bytes = new TextEncoder().encode(val);
        const binString = String.fromCodePoint(...bytes);
        setOutput(btoa(binString));
      } else {
        // Decode base64 to text
        const binString = atob(val);
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
        setOutput(new TextDecoder().decode(bytes));
      }
    } catch (e: any) {
      setOutput('');
      setError(e.message || 'Invalid format');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex gap-4">
        <button
          onClick={() => { setMode('encode'); process(input, 'encode'); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'encode' ? 'bg-blue-500 text-white' : 'glass text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          Encode to Base64
        </button>
        <button
          onClick={() => { setMode('decode'); process(input, 'decode'); }}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            mode === 'decode' ? 'bg-blue-500 text-white' : 'glass text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
          }`}
        >
          Decode from Base64
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1 h-full min-h-[300px]">
        <div className="flex flex-col gap-2 h-full">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">
            {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          </label>
          <textarea
            className="flex-1 w-full p-4 rounded-xl glass font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
            value={input}
            onChange={(e) => process(e.target.value, mode)}
          />
        </div>

        <div className="flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-zinc-700 dark:text-zinc-300">
              {mode === 'encode' ? 'Base64 String' : 'Plain Text'}
            </label>
            <button 
              onClick={copyToClipboard}
              disabled={!output}
              className="px-3 py-1 rounded-lg text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium hover:bg-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Copy
            </button>
          </div>
          <div className={`flex-1 w-full p-4 rounded-xl glass font-mono text-sm overflow-auto whitespace-pre-wrap ${
            error ? 'text-red-500' : 'text-zinc-800 dark:text-zinc-200'
          }`}>
            {error ? error : output || 'Output will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}
