import { useState, useMemo } from 'react';
import parser from 'cron-parser';
import cronstrue from 'cronstrue';

export function CronSimulator() {
  const [expression, setExpression] = useState('*/15 * * * *');

  const { description, nextDates, error } = useMemo(() => {
    let desc = '';
    let dates: Date[] = [];
    let err = null;

    if (!expression.trim()) return { description: '', nextDates: [], error: null };

    try {
      desc = cronstrue.toString(expression, { throwExceptionOnParseError: true });
      const interval = parser.parseExpression(expression);
      for (let i = 0; i < 5; i++) {
        dates.push(interval.next().toDate());
      }
    } catch (e: any) {
      err = e.message || 'Invalid cron expression';
    }

    return { description: desc, nextDates: dates, error: err };
  }, [expression]);

  const presetCrons = [
    { label: 'Every 15 mins', expr: '*/15 * * * *' },
    { label: 'Every hour', expr: '0 * * * *' },
    { label: 'Every day at 00:00', expr: '0 0 * * *' },
    { label: 'Every Monday', expr: '0 0 * * 1' },
    { label: 'Weekday mornings', expr: '0 9 * * 1-5' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-zinc-700 dark:text-zinc-300">Cron Expression</label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            className={`flex-1 glass rounded-xl px-4 py-3 outline-none font-mono text-lg focus:ring-2 ${
              error ? 'focus:ring-red-500 text-red-500' : 'focus:ring-blue-500'
            }`}
            placeholder="* * * * *"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
          />
        </div>
        {error ? (
          <p className="text-red-500 text-sm">{error}</p>
        ) : description ? (
          <p className="text-green-600 dark:text-green-400 font-medium">{description}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {presetCrons.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setExpression(preset.expr)}
            className="px-3 py-1 rounded-lg text-sm bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors font-mono"
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 flex-1 mt-4">
        <label className="font-semibold text-zinc-700 dark:text-zinc-300">Next Scheduled Executions</label>
        <div className="glass rounded-xl p-4 flex flex-col gap-2 h-full overflow-y-auto">
          {error ? (
            <div className="text-zinc-400 text-sm">Fix expression to see next dates</div>
          ) : nextDates.length > 0 ? (
            nextDates.map((date, i) => (
              <div key={i} className="flex items-center gap-4 py-3 px-4 bg-white/50 dark:bg-black/20 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                  {i + 1}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{date.toLocaleString()}</span>
                  <span className="text-xs text-zinc-500 font-mono">{date.toISOString()}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-zinc-400 text-sm">Enter an expression to see upcoming schedules</div>
          )}
        </div>
      </div>
    </div>
  );
}
