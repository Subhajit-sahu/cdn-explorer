import React from 'react';
import { formatTime, formatDuration, formatBytes } from '../../utils/formatters';

export default function RequestInspector({ lastRequest }) {
  if (!lastRequest) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>Request Inspector</span>
          </div>
        </div>
        <p className="empty-history" style={{ padding: '2.5rem 1rem' }}>
          No requests executed yet. Click &quot;Send Request&quot; on any API card to inspect live telemetry.
        </p>
      </div>
    );
  }

  const {
    url,
    method,
    status,
    statusText,
    duration,
    timestamp,
    size,
    ok,
  } = lastRequest;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>Request Inspector</span>
        </div>
        <span className={`status-badge ${ok ? 'ok' : 'err'}`}>
          ● {status ? `${status} ${statusText}` : 'Failed'}
        </span>
      </div>

      <div className="inspector-grid">
        <div className="inspector-item">
          <div className="inspector-label">Method & URL</div>
          <div className="inspector-value" style={{ fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>{method}</span> {url.replace(/^https?:\/\/[^/]+/, '')}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Client Duration</div>
          <div className="inspector-value" style={{ color: 'var(--accent-cyan)' }}>
            {formatDuration(duration)}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Timestamp</div>
          <div className="inspector-value">
            {formatTime(timestamp)}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Response Size</div>
          <div className="inspector-value">
            {formatBytes(size)}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Source</div>
          <div className="inspector-value" style={{ color: 'var(--accent-origin)' }}>
            Origin
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Full Host</div>
          <div className="inspector-value" style={{ fontSize: '0.74rem' }}>
            {url.replace(/^https?:\/\//, '').split('/')[0]}
          </div>
        </div>
      </div>

      <div className="inspector-callout">
        <span>ℹ️</span>
        <div>
          <div><strong>Cache Status:</strong> <span className="cf-notice">Not available — CloudFront not connected</span></div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Edge POP, HIT/MISS headers (X-Cache), and CloudFront request IDs will appear here once CDN distribution is active.
          </div>
        </div>
      </div>
    </div>
  );
}
