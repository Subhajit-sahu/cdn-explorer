import React from 'react';
import { ENV_INFO } from '../../config/env';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="brand-icon" aria-hidden="true">🌍</div>
        <div>
          <h1 className="brand-title">CDN Explorer</h1>
          <p className="brand-subtitle">CDN Request & Cache Visualization Lab</p>
        </div>
      </div>

      <div className="header-meta">
        <div className="meta-pill">
          <span className="dot" />
          <span className="label">Environment:</span>
          <span className="value">{ENV_INFO.name}</span>
        </div>
        <div className="meta-pill">
          <span className="label">API:</span>
          <span className="value">{ENV_INFO.host}</span>
        </div>
      </div>
    </header>
  );
}
