import React from 'react';
import { formatDuration } from '../../utils/formatters';

export default function PerformancePanel({
  cdnTestMetrics,
  comparisonData,
  onRunComparison,
  comparing = false,
}) {
  const maxDuration = Math.max(
    1100,
    cdnTestMetrics?.duration || 0,
    comparisonData?.origin?.duration || 0,
    comparisonData?.cdn?.duration || 0
  );

  const getPercent = (duration) => {
    if (!duration) return 0;
    return Math.min(100, Math.max(6, Math.round((duration / maxDuration) * 100)));
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>Latency &amp; Edge Benchmark</span>
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Measured Timings
        </span>
      </div>

      {/* /api/cdn-test Telemetry Summary */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#f1f5f9' }}>
            Latest /api/cdn-test Telemetry
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Origin delay: ~1000ms
          </span>
        </div>

        <div className="inspector-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.5rem', marginBottom: 0 }}>
          <div className="inspector-item">
            <div className="inspector-label">Latency</div>
            <div className="inspector-value" style={{ color: 'var(--accent-cyan)' }}>
              {cdnTestMetrics ? formatDuration(cdnTestMetrics.duration) : '—'}
            </div>
          </div>
          <div className="inspector-item">
            <div className="inspector-label">X-Cache</div>
            <div className="inspector-value" style={{ marginTop: '0.15rem' }}>
              {cdnTestMetrics?.headers?.xCache ? (
                <span className={`badge-xcache ${cdnTestMetrics.headers.xCache === 'HIT' ? 'cache-hit' : 'cache-miss'}`}>
                  {cdnTestMetrics.headers.xCache}
                </span>
              ) : '—'}
            </div>
          </div>
          <div className="inspector-item">
            <div className="inspector-label">Age</div>
            <div className="inspector-value">
              {cdnTestMetrics?.headers?.age != null ? `${cdnTestMetrics.headers.age} s` : '—'}
            </div>
          </div>
          <div className="inspector-item">
            <div className="inspector-label">Cache-Control</div>
            <div className="inspector-value" style={{ fontSize: '0.72rem' }}>
              {cdnTestMetrics?.headers?.cacheControl || '—'}
            </div>
          </div>
        </div>
      </div>

      {/* Comparative Benchmark */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>
              Direct Origin vs. CloudFront CDN
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Direct Mumbai EC2 round-trip vs. Edge cached delivery
            </div>
          </div>
          <button
            type="button"
            className="btn-send"
            style={{ width: 'auto', padding: '0.4rem 0.85rem', fontSize: '0.75rem' }}
            disabled={comparing}
            onClick={onRunComparison}
          >
            {comparing ? (
              <>
                <span className="spinner" />
                <span>Running...</span>
              </>
            ) : (
              '⚡ Benchmark Both'
            )}
          </button>
        </div>

        <div className="perf-bars">
          {/* Direct Origin */}
          <div className="perf-item">
            <div className="perf-label-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span className="target-tag target-origin">DIRECT ORIGIN</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>52.66.74.208:5000</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-amber)' }}>
                {comparisonData?.origin ? formatDuration(comparisonData.origin.duration) : 'No data'}
              </span>
            </div>
            <div className="perf-track">
              <div
                className="perf-fill amber"
                style={{ width: `${getPercent(comparisonData?.origin?.duration)}%` }}
              />
            </div>
          </div>

          {/* CloudFront CDN */}
          <div className="perf-item">
            <div className="perf-label-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <span className="target-tag target-cdn">CDN (CloudFront)</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {comparisonData?.cdn?.headers?.xCache ? `[${comparisonData.cdn.headers.xCache}]` : ''}
                </span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--accent-cyan)' }}>
                {comparisonData?.cdn ? formatDuration(comparisonData.cdn.duration) : 'No data'}
              </span>
            </div>
            <div className="perf-track">
              <div
                className="perf-fill cyan"
                style={{ width: `${getPercent(comparisonData?.cdn?.duration)}%` }}
              />
            </div>
          </div>
        </div>

        <p className="perf-note">
          Timings represent real round-trip network measurements from your current browser session. Direct origin calls always execute the 1s backend delay; CDN hits respond immediately from edge memory.
        </p>
      </div>
    </div>
  );
}
