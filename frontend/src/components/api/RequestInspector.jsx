import React from 'react';
import { formatTime, formatDuration, formatBytes } from '../../utils/formatters';

export default function RequestInspector({ lastRequest }) {
  if (!lastRequest) {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>Request Telemetry Inspector</span>
          </div>
        </div>
        <p className="empty-history">
          No requests executed yet. Click &quot;Send Request&quot; on any card above or use the Quick Start steps to inspect live telemetry.
        </p>
      </div>
    );
  }

  const {
    url,
    method,
    endpoint,
    status,
    statusText,
    duration,
    timestamp,
    size,
    ok,
    target = 'CDN',
    headers = {},
    data,
  } = lastRequest;

  const {
    cacheControl,
    etag,
    xCache = 'Unknown',
    rawXCache,
    age,
    via,
    xAmzCfPop,
    xAmzCfId,
  } = headers;

  const getXCacheBadgeClass = (val) => {
    if (val === 'HIT') return 'cache-hit';
    if (val === 'MISS') return 'cache-miss';
    return 'cache-unknown';
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>Request Telemetry Inspector</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className={`target-tag ${target === 'CDN' ? 'target-cdn' : 'target-origin'}`}>
            {target}
          </span>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: ok ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
            ● {status ? `${status} ${statusText}` : 'Failed'}
          </span>
        </div>
      </div>

      {/* HTTP Summary */}
      <div className="inspector-grid">
        <div className="inspector-item">
          <div className="inspector-label">Method &amp; Endpoint</div>
          <div className="inspector-value" style={{ fontSize: '0.78rem' }}>
            <span style={{ color: 'var(--accent-cyan)' }}>{method}</span> {endpoint || url.replace(/^https?:\/\/[^/]+/, '')}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Client Latency</div>
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
          <div className="inspector-label">Routing Path</div>
          <div className="inspector-value" style={{ color: target === 'CDN' ? 'var(--accent-cyan)' : 'var(--accent-amber)' }}>
            {target === 'CDN' ? 'CloudFront Edge' : 'Direct Origin'}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Host</div>
          <div className="inspector-value" style={{ fontSize: '0.72rem' }}>
            {url.replace(/^https?:\/\//, '').split('/')[0]}
          </div>
        </div>
      </div>

      {/* Section 1: CDN-Observed Headers */}
      <div className="inspector-section-header">
        <span className="section-tag cdn-tag">CDN-Observed Headers (Edge Telemetry)</span>
      </div>

      <div className="inspector-grid">
        <div className="inspector-item">
          <div className="inspector-label">X-Cache Status</div>
          <div className="inspector-value" style={{ marginTop: '0.2rem' }}>
            <span className={`badge-xcache ${getXCacheBadgeClass(xCache)}`}>
              {xCache}
            </span>
          </div>
          {rawXCache && rawXCache !== xCache && (
            <div className="header-subvalue" title={rawXCache}>{rawXCache}</div>
          )}
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Cache Age</div>
          <div className="inspector-value">
            {age !== null ? `${age} s` : <span className="text-dim">Not available</span>}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Edge POP (X-Amz-Cf-Pop)</div>
          <div className="inspector-value">
            {xAmzCfPop || <span className="text-dim">Not available</span>}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Cache-Control</div>
          <div className="inspector-value" style={{ fontSize: '0.75rem' }}>
            {cacheControl || <span className="text-dim">Not available</span>}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">ETag</div>
          <div className="inspector-value" style={{ fontSize: '0.7rem' }}>
            {etag || <span className="text-dim">Not available</span>}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Via</div>
          <div className="inspector-value" style={{ fontSize: '0.68rem', wordBreak: 'break-all' }}>
            {via || <span className="text-dim">Not available</span>}
          </div>
        </div>
      </div>

      {xAmzCfId && (
        <div className="inspector-callout" style={{ marginTop: '0.4rem', marginBottom: '0.85rem' }}>
          <div>
            <strong>CloudFront Request ID (X-Amz-Cf-Id):</strong>{' '}
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', wordBreak: 'break-all' }}>
              {xAmzCfId}
            </span>
          </div>
        </div>
      )}

      {/* Section 2: Application Response Data */}
      <div className="inspector-section-header">
        <span className="section-tag app-tag">Application Response Data (JSON Body)</span>
      </div>

      <div className="inspector-grid" style={{ marginBottom: '0.75rem' }}>
        <div className="inspector-item">
          <div className="inspector-label">JSON &quot;source&quot;</div>
          <div className="inspector-value" style={{ color: 'var(--accent-amber)' }}>
            {data && typeof data === 'object' && data.source ? data.source : '—'}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Origin Generation Time</div>
          <div className="inspector-value">
            {data && typeof data === 'object' && data.responseTime ? data.responseTime : '—'}
          </div>
        </div>

        <div className="inspector-item">
          <div className="inspector-label">Cacheable Flag</div>
          <div className="inspector-value">
            {data && typeof data === 'object' && data.cacheable !== undefined
              ? String(data.cacheable)
              : '—'}
          </div>
        </div>
      </div>

      {/* Distinction Note */}
      <div className="inspector-callout">
        <div>
          <strong>Architecture Distinction:</strong> When CloudFront returns <strong>HIT</strong>, the response is served entirely from the edge cache without contacting origin. The payload still contains <code>&quot;source&quot;: &quot;origin&quot;</code> because that was recorded when origin originally built the response. Use the <strong>X-Cache</strong> header above to see whether it came from edge or origin.
        </div>
      </div>
    </div>
  );
}
