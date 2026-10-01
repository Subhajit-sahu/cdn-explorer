import React from 'react';
import { formatTime, formatDuration } from '../../utils/formatters';

export default function RequestHistory({ history, onClearHistory }) {
  const getXCacheBadge = (val) => {
    if (val === 'HIT') return <span className="badge-xcache cache-hit">HIT</span>;
    if (val === 'MISS') return <span className="badge-xcache cache-miss">MISS</span>;
    return <span className="badge-xcache cache-unknown">{val || 'Unknown'}</span>;
  };

  return (
    <section className="card history-card" aria-label="Request History Log">
      <div className="card-header">
        <div className="card-title">
          <span>Request History Telemetry Log</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            ({history.length} {history.length === 1 ? 'record' : 'records'})
          </span>
        </div>
        <button
          type="button"
          className="btn-clear"
          onClick={onClearHistory}
          disabled={history.length === 0}
        >
          Clear Log
        </button>
      </div>

      <div className="table-responsive">
        {history.length === 0 ? (
          <div className="empty-history">
            No telemetry recorded in this session. Click &quot;Send Request&quot; on any card above or use the Quick Start steps.
          </div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Route</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Latency</th>
                <th>X-Cache</th>
                <th>Age</th>
                <th>Cache-Control</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => {
                const hdrs = item.headers || {};
                const isCdn = item.target === 'CDN';

                return (
                  <tr key={`${item.timestamp?.valueOf?.() || item.timestamp}-${index}`}>
                    <td style={{ color: 'var(--text-muted)' }}>{history.length - index}</td>
                    <td>
                      <span className={`target-tag ${isCdn ? 'target-cdn' : 'target-origin'}`}>
                        {item.target || (isCdn ? 'CDN' : 'ORIGIN')}
                      </span>
                    </td>
                    <td style={{ color: '#fff', fontWeight: 600 }}>
                      <span style={{ color: 'var(--accent-cyan)', marginRight: '0.35rem' }}>
                        {item.method}
                      </span>
                      {item.endpoint}
                    </td>
                    <td>
                      <span style={{ color: item.status === 200 ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                        {item.status || 'ERR'}
                      </span>
                    </td>
                    <td style={{ color: '#f8fafc', fontWeight: 600 }}>
                      {formatDuration(item.duration)}
                    </td>
                    <td>
                      {getXCacheBadge(hdrs.xCache)}
                    </td>
                    <td style={{ color: hdrs.age !== null ? '#f8fafc' : 'var(--text-muted)' }}>
                      {hdrs.age !== null ? `${hdrs.age}s` : '—'}
                    </td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {hdrs.cacheControl || '—'}
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>
                      {formatTime(item.timestamp)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
