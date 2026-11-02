import { useState } from 'react';

export function GradientStudio() {
  const [color1, setColor1] = useState('#4f46e5');
  const [color2, setColor2] = useState('#ec4899');
  const [color3, setColor3] = useState('#eab308');
  const [angle, setAngle] = useState(45);
  const [type, setType] = useState<'linear' | 'radial' | 'conic'>('linear');

  let css = '';
  if (type === 'linear') {
    css = `background: linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3});`;
  } else if (type === 'radial') {
    css = `background: radial-gradient(circle, ${color1}, ${color2}, ${color3});`;
  } else {
    css = `background: conic-gradient(from ${angle}deg, ${color1}, ${color2}, ${color3}, ${color1});`;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(css);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full max-w-6xl mx-auto w-full">
      {/* Controls */}
      <div className="flex flex-col gap-6 h-full p-6 glass rounded-2xl">
        <h2 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
          Gradient Properties
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Type</label>
            <div className="flex gap-2 p-1 rounded-xl glass">
              {['linear', 'radial', 'conic'].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as any)}
                  className={`flex-1 capitalize py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    type === t ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Color 1</label>
              <span className="text-sm font-mono text-zinc-500">{color1}</span>
            </div>
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent border-none outline-none" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Color 2</label>
              <span className="text-sm font-mono text-zinc-500">{color2}</span>
            </div>
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent border-none outline-none" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Color 3</label>
              <span className="text-sm font-mono text-zinc-500">{color3}</span>
            </div>
            <input type="color" value={color3} onChange={(e) => setColor3(e.target.value)} className="w-full h-10 rounded-lg cursor-pointer bg-transparent border-none outline-none" />
          </div>

          {type !== 'radial' && (
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Angle ({angle}deg)</label>
              </div>
              <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Generated CSS</span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium rounded hover:bg-emerald-500/20 transition-colors"
            >
              Copy CSS
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-sm overflow-x-auto">
            {css}
          </pre>
        </div>
      </div>

      {/* Preview */}
      <div 
        className="flex items-center justify-center h-[500px] md:h-full rounded-2xl overflow-hidden transition-all duration-300 shadow-xl"
        style={{ cssText: css } as any}
      >
        <div className="glass px-8 py-4 rounded-2xl text-center backdrop-blur-md">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white drop-shadow-sm">Beautiful Gradients</h3>
        </div>
      </div>
    </div>
  );
}
