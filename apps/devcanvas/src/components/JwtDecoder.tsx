import { useState, useMemo, useEffect } from 'react';

function decodeBase64Url(str: string) {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function JwtDecoder() {
  const [token, setToken] = useState('');
  const [now, setNow] = useState(Math.floor(Date.now() / 1000));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const decoded = useMemo(() => {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const header = decodeBase64Url(parts[0]);
    const payload = decodeBase64Url(parts[1]);

    return { header, payload, signature: parts[2] };
  }, [token]);

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      {/* Input Pane */}
      <div className="flex flex-col gap-2 h-full">
        <label className="font-semibold text-zinc-700 dark:text-zinc-300">Encoded Token</label>
        <textarea 
          className="flex-1 w-full p-4 rounded-xl glass font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Paste JWT here..."
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      {/* Output Pane */}
      <div className="flex flex-col gap-4 overflow-y-auto h-full">
        {decoded ? (
          <>
            <div className="glass rounded-xl p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-red-500">Header</h3>
              <pre className="font-mono text-sm overflow-x-auto">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
            
            <div className="glass rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-purple-500">Payload</h3>
                {decoded.payload?.exp && (
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    decoded.payload.exp < now ? 'bg-red-500/20 text-red-600 dark:text-red-400' :
                    decoded.payload.exp - now < 3600 ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
                    'bg-green-500/20 text-green-600 dark:text-green-400'
                  }`}>
                    {decoded.payload.exp < now ? 'Expired' : `Expires in ${decoded.payload.exp - now}s`}
                  </span>
                )}
              </div>
              <pre className="font-mono text-sm overflow-x-auto">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>

            <div className="glass rounded-xl p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-blue-500">Signature</h3>
              <pre className="font-mono text-sm overflow-x-auto break-all">
                {decoded.signature}
              </pre>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center glass rounded-xl text-zinc-400 text-sm">
            {token ? 'Invalid JWT format' : 'Waiting for token...'}
          </div>
        )}
      </div>
    </div>
  );
}
