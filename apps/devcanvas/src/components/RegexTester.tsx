import { useState, useMemo } from 'react';

export function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');

  const result = useMemo(() => {
    if (!pattern) return null;
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...testString.matchAll(regex)];
      
      let highlighted = [];
      let lastIndex = 0;
      
      matches.forEach((match, i) => {
        if (match.index !== undefined) {
          // Push text before match
          highlighted.push(testString.substring(lastIndex, match.index));
          // Push matched text
          highlighted.push(
            <span key={i} className="bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded px-1">
              {match[0]}
            </span>
          );
          lastIndex = match.index + match[0].length;
        }
      });
      // Push remaining text
      highlighted.push(testString.substring(lastIndex));

      return {
        highlighted,
        matchCount: matches.length,
        error: null
      };
    } catch (e: any) {
      return { highlighted: null, matchCount: 0, error: e.message };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="grid md:grid-cols-[1fr_120px] gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Regular Expression</label>
          <div className="flex items-center glass rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">
            <span className="text-zinc-400 mr-1">/</span>
            <input
              type="text"
              className="flex-1 bg-transparent outline-none font-mono text-sm"
              placeholder="[A-Z0-9]+"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
            <span className="text-zinc-400 ml-1">/</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Flags</label>
          <input
            type="text"
            className="w-full glass rounded-xl px-4 py-3 outline-none font-mono text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="gmi"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1 h-full min-h-[300px]">
        <div className="flex flex-col gap-2 h-full">
          <label className="font-semibold text-zinc-700 dark:text-zinc-300">Test String</label>
          <textarea
            className="flex-1 w-full p-4 rounded-xl glass font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter text to test your regex against..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 h-full">
          <div className="flex justify-between items-center">
            <label className="font-semibold text-zinc-700 dark:text-zinc-300">Match Result</label>
            {result && !result.error && (
              <span className="text-xs font-medium px-2 py-1 rounded-lg bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-400">
                {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''}
              </span>
            )}
          </div>
          <div className="flex-1 w-full p-4 rounded-xl glass font-mono text-sm overflow-auto text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
            {result?.error ? (
              <span className="text-red-500">{result.error}</span>
            ) : result?.highlighted ? (
              result.highlighted
            ) : (
              <span className="text-zinc-400">Enter a pattern to see matches...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
