import React from 'react';

export default function QuickStartGuide({
  onRunMiss,
  onRunHit,
  onRunBenchmark,
  loading = false,
  benchmarking = false,
  lastResult = null,
}) {
  return (
    <section className="quickstart-card" aria-label="Interactive CDN Experiment Guide">
      <div className="quickstart-header">
        <div className="quickstart-title">
          <span>Interactive Experiment: Observe Real CDN Caching</span>
          <span className="quickstart-title-badge">Step-by-Step Lab</span>
        </div>
        {lastResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Latest Telemetry:</span>
            <span className={`badge-xcache ${lastResult.headers?.xCache === 'HIT' ? 'cache-hit' : 'cache-miss'}`}>
              {lastResult.headers?.xCache || 'MISS'}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 600 }}>
              {Math.round(lastResult.duration)} ms
            </span>
            {lastResult.headers?.age !== null && (
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                (Age: {lastResult.headers?.age}s)
              </span>
            )}
          </div>
        )}
      </div>

      <p className="quickstart-desc">
        Click the buttons below in sequence to test live CloudFront edge caching against your Mumbai EC2 origin server. Observe how latency drops and headers transition from <code>MISS</code> to <code>HIT</code>.
      </p>

      <div className="quickstart-steps">
        {/* Step 1 */}
        <div className="step-card">
          <div>
            <div className="step-header">
              <span className="step-num">STEP 1</span>
              <span className="step-tag miss">CACHE MISS</span>
            </div>
            <div className="step-title">Cold Edge Request</div>
            <p className="step-desc">
              Sends <code>GET /api/cdn-test</code> to CloudFront. Edge cache misses and fetches from Mumbai EC2. Expect <strong>~1000ms+</strong> latency and <strong>MISS from cloudfront</strong>.
            </p>
          </div>
          <button
            type="button"
            className="btn-step-action secondary"
            disabled={loading || benchmarking}
            onClick={onRunMiss}
          >
            {loading ? <span className="spinner" /> : <span>▶ Trigger Request 1</span>}
          </button>
        </div>

        {/* Step 2 */}
        <div className="step-card">
          <div>
            <div className="step-header">
              <span className="step-num">STEP 2</span>
              <span className="step-tag hit">CACHE HIT</span>
            </div>
            <div className="step-title">Warm Edge Request</div>
            <p className="step-desc">
              Send the same request immediately. CloudFront edge intercepts and responds from memory without hitting origin. Expect <strong>~100-200ms</strong>, <strong>HIT</strong>, and <strong>Age &gt; 0</strong>.
            </p>
          </div>
          <button
            type="button"
            className="btn-step-action primary"
            disabled={loading || benchmarking}
            onClick={onRunHit}
          >
            {loading ? <span className="spinner" /> : <span>⚡ Trigger Request 2 (HIT)</span>}
          </button>
        </div>

        {/* Step 3 */}
        <div className="step-card">
          <div>
            <div className="step-header">
              <span className="step-num">STEP 3</span>
              <span className="step-tag bench">BENCHMARK</span>
            </div>
            <div className="step-title">Direct Origin vs CDN</div>
            <p className="step-desc">
              Executes parallel requests to Direct EC2 (<code>52.66.74.208:5000</code>) and CloudFront (<code>d302cmp2c7foh.cloudfront.net</code>) to directly compare round-trip network times.
            </p>
          </div>
          <button
            type="button"
            className="btn-step-action secondary"
            disabled={loading || benchmarking}
            onClick={onRunBenchmark}
          >
            {benchmarking ? <span className="spinner" /> : <span>⚖ Benchmark Both</span>}
          </button>
        </div>
      </div>
    </section>
  );
}
