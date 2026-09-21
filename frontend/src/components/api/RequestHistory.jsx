import React from 'react';
import { formatTime, formatDuration } from '../../utils/formatters';

export default function RequestHistory({ history, onClearHistory }) {
  return (
    <section className="card history-card" aria-label="Request History Log">
      <div className="card-header">
        <div className="card-title">
          <span>Request History</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ({history.length} {history.length === 1 ? 'entry' : 'entries'})
          </span>
        </div>
        <button
          type="button"
          className="btn-clear"
          onClick={onClearHistory}
          disabled={history.length === 0}
        >
          Clear History
        </button>
      </div>

      <div className="table-responsive">
        {history.length === 0 ? (
          <div className="empty-history">
            No requests in this session yet. Trigger requests to populate history telemetry.
          </div>
        ) : (
          <table className="history-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Endpoint</th>
                <th>Method</th>
                <th>Status</th>
                <th>Response Time</th>
                <th>Type</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={`${item.timestamp}-${index}`}>
                  <td style={{ color: 'var(--text-muted)' }}>{history.length - index}</td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    {item.endpoint}
                  </td>
                  <td>
                    <span style={{ color: 'var(--accent-cyan)' }}>{item.method}</span>
                  </td>
                  <td>
                    <span style={{ color: item.status === 200 ? 'var(--accent-success)' : 'var(--accent-danger)' }}>
                      {item.status || 'ERR'}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    {formatDuration(item.duration)}
                  </td>
                  <td>
                    <span className={`type-pill ${item.typeClass || 'cacheable'}`}>
                      {item.type}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>
                    {formatTime(item.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
