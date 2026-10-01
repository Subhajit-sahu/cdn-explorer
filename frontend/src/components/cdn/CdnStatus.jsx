import React from 'react';
import { ENV_INFO } from '../../config/env';

export default function CdnStatus({ latestCdnData }) {
  const pop = latestCdnData?.headers?.xAmzCfPop;
  const cacheStatus = latestCdnData?.headers?.xCache;
  const age = latestCdnData?.headers?.age;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>Infrastructure Status</span>
        </div>
        <div className="cdn-status-pill connected">
          <span className="pulse-dot" style={{ width: 6, height: 6 }} />
          <span>CDN Connected</span>
        </div>
      </div>

      <div className="cdn-fields">
        <div className="cdn-field-row">
          <span className="cdn-field-k">CDN Provider</span>
          <span className="cdn-field-v">AWS CloudFront</span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Distribution Domain</span>
          <span className="cdn-field-v" style={{ color: 'var(--accent-cyan)' }}>
            {ENV_INFO.distributionDomain}
          </span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Edge POP (Observed)</span>
          <span className="cdn-field-v">
            {pop ? (
              <span style={{ color: 'var(--accent-cyan)' }}>{pop}</span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>Send request to observe</span>
            )}
          </span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Latest Edge Cache</span>
          <span className="cdn-field-v">
            {cacheStatus ? (
              <span className={`badge-xcache ${cacheStatus === 'HIT' ? 'cache-hit' : cacheStatus === 'MISS' ? 'cache-miss' : 'cache-unknown'}`}>
                {cacheStatus}
              </span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>—</span>
            )}
          </span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Cache Age</span>
          <span className="cdn-field-v">
            {age != null ? `${age} s` : <span style={{ color: 'var(--text-muted)' }}>Not available</span>}
          </span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Origin EC2 Server</span>
          <span className="cdn-field-v" style={{ color: 'var(--accent-amber)' }}>
            {ENV_INFO.originHost} (Mumbai)
          </span>
        </div>
      </div>
    </div>
  );
}
