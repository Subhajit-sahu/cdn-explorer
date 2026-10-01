import React from 'react';
import { formatDuration } from '../../utils/formatters';

export default function ApiTestCard({
  title,
  endpoint,
  method = 'GET',
  type,
  typeClass = 'cacheable',
  description,
  latestDuration,
  latestXCache,
  loading = false,
  onSend,
}) {
  const getXCacheBadge = (val) => {
    if (!val) return <span style={{ color: 'var(--text-muted)' }}>—</span>;
    if (val === 'HIT') return <span className="badge-xcache cache-hit">HIT</span>;
    if (val === 'MISS') return <span className="badge-xcache cache-miss">MISS</span>;
    return <span className="badge-xcache cache-unknown">{val}</span>;
  };

  return (
    <div className="api-card">
      <div className="api-card-top">
        <div className="endpoint-badge-row">
          <span className="method-tag">{method}</span>
          <span className={`type-pill ${typeClass}`}>{type}</span>
        </div>

        <div className="endpoint-path">{endpoint}</div>
        <p className="endpoint-desc">{description}</p>

        <div className="card-metrics-grid">
          <div className="metric-cell">
            <span className="metric-cell-label">Client Latency</span>
            <span className="metric-cell-val" style={{ color: latestDuration != null ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
              {latestDuration != null ? formatDuration(latestDuration) : 'No requests yet'}
            </span>
          </div>

          <div className="metric-cell">
            <span className="metric-cell-label">Edge Cache</span>
            <span className="metric-cell-val">
              {getXCacheBadge(latestXCache)}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="btn-send"
        disabled={loading}
        onClick={onSend}
      >
        {loading ? (
          <>
            <span className="spinner" />
            <span>Fetching via Edge...</span>
          </>
        ) : (
          <>
            <span>⚡ Send Request</span>
          </>
        )}
      </button>
    </div>
  );
}
