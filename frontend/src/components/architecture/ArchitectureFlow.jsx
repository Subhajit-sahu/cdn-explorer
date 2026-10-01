import React from 'react';
import { ENV_INFO } from '../../config/env';

export default function ArchitectureFlow({ latestPop = null }) {
  return (
    <section className="arch-card" aria-label="System Architecture Flow">
      <div className="arch-header">
        <div className="arch-title-group">
          <span className="section-title">Live Architecture Flow</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            End-to-End Request Pipeline
          </span>
        </div>
        <div className="node-status-tag active">
          ● CDN Active
        </div>
      </div>

      <div className="pipeline-container">
        {/* Node 1: Client */}
        <div className="pipeline-node">
          <div className="node-top">
            <span className="node-role">Client</span>
            <span className="node-status-tag active">HTTPS</span>
          </div>
          <div className="node-title">Client Browser</div>
          <div className="node-sub">React / Vite Dashboard</div>
        </div>

        {/* Arrow 1 */}
        <div className="pipeline-arrow">
          <span className="pipeline-arrow-label">:443 TLS</span>
          <div className="arrow-line">
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
              <path d="M0 8H26M26 8L20 2M26 8L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Node 2: CloudFront Edge */}
        <div className="pipeline-node active-edge">
          <div className="node-top">
            <span className="node-role" style={{ color: 'var(--accent-cyan)' }}>Edge Layer</span>
            <span className="node-status-tag active">Cache POP</span>
          </div>
          <div className="node-title">AWS CloudFront</div>
          <div className="node-sub">{ENV_INFO.distributionDomain}</div>
          <div className="node-pop-highlight">
            <span className="pulse-dot" style={{ width: 5, height: 5 }} />
            <span>Active POP: {latestPop || 'Nearest Edge'}</span>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="pipeline-arrow">
          <span className="pipeline-arrow-label">On MISS :5000</span>
          <div className="arrow-line" style={{ color: 'var(--accent-amber)' }}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
              <path d="M0 8H26M26 8L20 2M26 8L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Node 3: EC2 Origin */}
        <div className="pipeline-node origin-node">
          <div className="node-top">
            <span className="node-role" style={{ color: 'var(--accent-amber)' }}>Origin Server</span>
            <span className="node-status-tag origin">Mumbai EC2</span>
          </div>
          <div className="node-title">Node.js + Express</div>
          <div className="node-sub">http://{ENV_INFO.originHost}</div>
        </div>
      </div>
    </section>
  );
}
