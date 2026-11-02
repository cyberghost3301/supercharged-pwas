import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DEFAULT_MARKDOWN = `# Welcome to LocalMD

Your lightweight, offline-first markdown editor.

## Features
- **Offline First**: Works without internet.
- **GFM Support**: Tables, strikethrough, task lists.
- **Code Highlighting**: Syntax highlighting for blocks.
- **HTML Support**: Safely renders HTML tags.

### Example Code
\`\`\`javascript
function helloWorld() {
  console.log('Hello, world!');
}
\`\`\`

### Example Table
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |

Enjoy writing!
`;

export function Editor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const clearEditor = () => setMarkdown('');

  return (
    <div className="flex flex-col h-full gap-4 w-full mx-auto max-w-7xl">
      <div className="flex justify-between items-center bg-white/5 dark:bg-black/20 p-4 rounded-xl border border-zinc-200 dark:border-white/10 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-lg text-zinc-800 dark:text-zinc-200">LocalMD Editor</h2>
          <span className="text-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">Offline</span>
        </div>
        <div className="flex gap-2">
          <button onClick={clearEditor} className="px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors">Clear</button>
          <button onClick={copyToClipboard} className="px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 rounded-lg transition-colors">Copy Raw</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 flex-1 h-[calc(100vh-16rem)] min-h-[500px]">
        {/* Editor Pane */}
        <div className="flex flex-col h-full">
          <textarea
            className="flex-1 w-full p-6 rounded-2xl glass font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed text-zinc-800 dark:text-zinc-200"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </div>

        {/* Preview Pane */}
        <div className="flex flex-col h-full overflow-hidden rounded-2xl glass">
          <div className="flex-1 overflow-y-auto p-8 prose prose-zinc dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code(props) {
                  const {children, className, node, ...rest} = props
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...rest}
                      PreTag="div"
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      style={vscDarkPlus}
                      className="rounded-lg !my-4 text-sm"
                    />
                  ) : (
                    <code {...rest} className={className + " bg-zinc-100 dark:bg-white/10 rounded px-1.5 py-0.5 text-sm text-pink-500 dark:text-pink-400"}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
