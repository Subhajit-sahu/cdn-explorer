import React from 'react';
import { ENV_INFO } from '../../config/env';

export default function Header() {
  return (
    <div className="app-header-wrap">
      <header className="app-header">
        <div className="header-brand">
          <div className="brand-badge" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <div>
            <div className="brand-title">
              <span>CDN Explorer</span>
              <span className="brand-version">AWS PROD</span>
            </div>
            <p className="brand-subtitle">
              CloudFront Edge &amp; Origin Cache Telemetry Lab
            </p>
          </div>
        </div>

        <div className="header-meta">
          <div className="meta-pill active-cdn">
            <span className="pulse-dot" />
            <span className="label">Routing:</span>
            <span className="value">CLOUDFRONT</span>
          </div>
          <div className="meta-pill">
            <span className="label">Distribution:</span>
            <span className="value">{ENV_INFO.distributionDomain}</span>
          </div>
        </div>
      </header>
    </div>
  );
}
