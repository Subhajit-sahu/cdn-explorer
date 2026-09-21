import React from 'react';
import { formatDuration } from '../../utils/formatters';

export default function PerformancePanel({ metrics }) {
  const { products, time, cdnTest } = metrics;

  // Compute maximum duration for scaling bars (minimum 1000ms base)
  const maxDuration = Math.max(
    1000,
    products?.duration || 0,
    time?.duration || 0,
    cdnTest?.duration || 0
  );

  const getPercent = (duration) => {
    if (!duration) return 0;
    return Math.min(100, Math.max(4, Math.round((duration / maxDuration) * 100)));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>Request Performance</span>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Origin Benchmarks</span>
      </div>

      <div className="perf-bars">
        {/* Products API */}
        <div className="perf-item">
          <div className="perf-label-row">
            <span className="perf-name">Products API (Static Data)</span>
            <span className="perf-metric">
              {products ? formatDuration(products.duration) : 'No data'}
            </span>
          </div>
          <div className="perf-track">
            <div
              className="perf-fill cyan"
              style={{ width: `${getPercent(products?.duration)}%` }}
            />
          </div>
        </div>

        {/* Time API */}
        <div className="perf-item">
          <div className="perf-label-row">
            <span className="perf-name">Time API (Dynamic Time)</span>
            <span className="perf-metric">
              {time ? formatDuration(time.duration) : 'No data'}
            </span>
          </div>
          <div className="perf-track">
            <div
              className="perf-fill purple"
              style={{ width: `${getPercent(time?.duration)}%` }}
            />
          </div>
        </div>

        {/* CDN Test API */}
        <div className="perf-item">
          <div className="perf-label-row">
            <span className="perf-name">CDN Test API (~1000ms Origin Delay)</span>
            <span className="perf-metric" style={{ color: 'var(--accent-origin)' }}>
              {cdnTest ? formatDuration(cdnTest.duration) : 'No data'}
            </span>
          </div>
          <div className="perf-track">
            <div
              className="perf-fill amber"
              style={{ width: `${getPercent(cdnTest?.duration)}%` }}
            />
          </div>
        </div>
      </div>

      <p className="perf-note">
        In Phase 2, this benchmark will directly compare Origin Latency against CloudFront Cache HIT Latency (~10-20ms).
      </p>
    </div>
  );
}
