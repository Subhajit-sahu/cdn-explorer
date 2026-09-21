import React from 'react';
import { ENV_INFO, isCloudFront } from '../../config/env';

export default function ArchitectureFlow() {
  return (
    <section className="card arch-card" aria-label="System Architecture Flow">
      <div className="arch-header">
        <div className="card-title">
          <span>System Architecture Flow</span>
        </div>
        <span className="section-desc" style={{ margin: 0 }}>
          {isCloudFront ? 'Active: CloudFront Edge Routing' : 'Direct Origin Connection (Phase 1)'}
        </span>
      </div>

      <div className="arch-flows">
        {/* Current Flow */}
        <div className={`flow-box ${!isCloudFront ? 'active' : 'inactive'}`}>
          <div className="flow-title-row">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Current Architecture
            </span>
            <span className={`flow-badge ${!isCloudFront ? 'active' : 'inactive'}`}>
              {!isCloudFront ? 'Active (Direct)' : 'Bypassed'}
            </span>
          </div>

          <div className="flow-nodes">
            <div className="flow-node highlight">
              <div className="flow-node-title">Browser</div>
              <div className="flow-node-sub">React Client</div>
            </div>

            <div className="flow-arrow active">→</div>

            <div className="flow-node origin">
              <div className="flow-node-title">Origin Server</div>
              <div className="flow-node-sub">Node + Express ({ENV_INFO.host})</div>
            </div>
          </div>
        </div>

        {/* Future Architecture */}
        <div className={`flow-box ${isCloudFront ? 'active' : 'inactive'}`}>
          <div className="flow-title-row">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Target Architecture
            </span>
            <span className={`flow-badge ${isCloudFront ? 'active' : 'inactive'}`}>
              {isCloudFront ? 'Active' : 'Future (Phase 2)'}
            </span>
          </div>

          <div className="flow-nodes">
            <div className="flow-node highlight">
              <div className="flow-node-title">Browser</div>
              <div className="flow-node-sub">Client</div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-node disabled">
              <div className="flow-node-title">CloudFront CDN</div>
              <div className="flow-node-sub">Edge Cache POP</div>
            </div>

            <div className="flow-arrow">→</div>

            <div className="flow-node origin">
              <div className="flow-node-title">Origin Server</div>
              <div className="flow-node-sub">AWS EC2 / Express</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
