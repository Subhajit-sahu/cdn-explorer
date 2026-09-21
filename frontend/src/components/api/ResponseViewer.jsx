import React, { useState } from 'react';

export default function ResponseViewer({ responseData, error }) {
  const [copied, setCopied] = useState(false);

  const formattedJson = responseData != null
    ? JSON.stringify(responseData, null, 2)
    : error
    ? JSON.stringify({ error }, null, 2)
    : '// No response yet. Send a request to view JSON payload.';

  const handleCopy = async () => {
    if (!responseData && !error) return;
    try {
      await navigator.clipboard.writeText(formattedJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div className="card-title">
          <span>Response Body (JSON)</span>
        </div>
      </div>

      <div className="code-viewer-container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="code-viewer-bar">
          <span className="bar-title">application/json</span>
          <button
            type="button"
            className={`btn-copy ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            disabled={!responseData && !error}
          >
            {copied ? '✓ Copied' : 'Copy JSON'}
          </button>
        </div>

        <pre className="code-pre" style={{ flex: 1 }}>
          <code>{formattedJson}</code>
        </pre>
      </div>
    </div>
  );
}
