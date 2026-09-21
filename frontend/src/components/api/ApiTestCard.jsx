import React from 'react';
import { formatDuration } from '../../utils/formatters';

export default function ApiTestCard({
  title,
  endpoint,
  method = 'GET',
  type,
  typeClass = 'cacheable',
  source = 'ORIGIN',
  description,
  latestDuration,
  loading = false,
  onSend,
}) {
  return (
    <div className="card api-card">
      <div className="api-card-top">
        <div className="endpoint-badge-row">
          <span className="method-tag">{method}</span>
          <span className={`type-pill ${typeClass}`}>{type}</span>
        </div>

        <div className="endpoint-path">{endpoint}</div>
        <p className="endpoint-desc">{description}</p>

        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-k">Source</span>
            <span className="meta-v origin">{source}</span>
          </div>
          <div className="meta-item">
            <span className="meta-k">Latest Latency</span>
            <span className="meta-v">
              {latestDuration != null ? formatDuration(latestDuration) : '—'}
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
            <span>Sending...</span>
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
