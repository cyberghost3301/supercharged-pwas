import { useState } from 'react';

export function GlassStudio() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(15);
  const [color, setColor] = useState('#ffffff');
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [borderRadius, setBorderRadius] = useState(16);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };

  const rgb = hexToRgb(color);
  
  const css = `
background: rgba(${rgb}, ${opacity / 100});
border-radius: ${borderRadius}px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(${rgb}, ${borderOpacity / 100});
`.trim();

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
        <h2 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Glass Properties
        </h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Color</label>
              <span className="text-sm font-mono text-zinc-500">{color}</span>
            </div>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer bg-transparent border-none outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Blur ({blur}px)</label>
            </div>
            <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-purple-500" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Opacity ({opacity}%)</label>
            </div>
            <input type="range" min="0" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-purple-500" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Border Opacity ({borderOpacity}%)</label>
            </div>
            <input type="range" min="0" max="100" value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} className="w-full accent-purple-500" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Border Radius ({borderRadius}px)</label>
            </div>
            <input type="range" min="0" max="100" value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-purple-500" />
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Generated CSS</span>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 text-sm bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium rounded hover:bg-purple-500/20 transition-colors"
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
      <div className="relative flex items-center justify-center h-[500px] md:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {/* Background Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Glass Box */}
        <div
          className="relative z-10 w-2/3 h-2/3 flex items-center justify-center p-8 transition-all duration-300"
          style={{
            background: `rgba(${rgb}, ${opacity / 100})`,
            borderRadius: `${borderRadius}px`,
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: `1px solid rgba(${rgb}, ${borderOpacity / 100})`,
          }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">Glassmorphism</h3>
            <p className="text-white/80 font-medium drop-shadow-md">Beautiful UI elements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
