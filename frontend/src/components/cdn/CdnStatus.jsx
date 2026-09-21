import React from 'react';
import { ENV_INFO } from '../../config/env';

export default function CdnStatus() {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>CDN Status</span>
        </div>
        <div className="cdn-status-pill">
          <span className="dot" />
          <span>Not Connected</span>
        </div>
      </div>

      <div className="cdn-fields">
        <div className="cdn-field-row">
          <span className="cdn-field-k">CDN Provider</span>
          <span className="cdn-field-v" style={{ color: 'var(--text-primary)' }}>AWS CloudFront</span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Distribution</span>
          <span className="cdn-field-v">Not configured</span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Edge Location</span>
          <span className="cdn-field-v">Not available</span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Cache Status</span>
          <span className="cdn-field-v">Not available</span>
        </div>

        <div className="cdn-field-row">
          <span className="cdn-field-k">Active Origin</span>
          <span className="cdn-field-v" style={{ color: 'var(--accent-origin)' }}>{ENV_INFO.host}</span>
        </div>
      </div>

      <div className="cdn-info-box">
        <span style={{ fontSize: '1rem' }}>☁️</span>
        <div>
          <strong>Phase 1 Notice:</strong> CloudFront will be connected in the next phase. All requests currently hit the local Node.js origin directly.
        </div>
      </div>
    </div>
  );
}
