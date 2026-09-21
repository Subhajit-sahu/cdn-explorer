import React, { useState } from 'react';

const LOCATIONS = [
  { id: 'in', name: 'India (ap-south-1 / Mumbai)' },
  { id: 'sg', name: 'Singapore (ap-southeast-1)' },
  { id: 'de', name: 'Germany (eu-central-1 / Frankfurt)' },
  { id: 'uk', name: 'United Kingdom (eu-west-2 / London)' },
  { id: 'us', name: 'United States (us-east-1 / N. Virginia)' },
  { id: 'jp', name: 'Japan (ap-northeast-1 / Tokyo)' },
];

export default function GeoExperiment() {
  const [selectedLocation, setSelectedLocation] = useState('in');

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>🌍 Geographic CDN Experiment</span>
        </div>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Simulation Only</span>
      </div>

      <label htmlFor="geo-location-select" className="inspector-label" style={{ display: 'block', marginBottom: '0.35rem' }}>
        Test Client Location:
      </label>
      <select
        id="geo-location-select"
        className="geo-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        {LOCATIONS.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.name}
          </option>
        ))}
      </select>

      <div className="geo-warning">
        <span>⚠️</span>
        <div>
          <strong>Informational Notice:</strong> Changing this value currently simulates a test location. Actual geographic CDN routing will be tested later using CloudFront and geographically distributed requests.
        </div>
      </div>
    </div>
  );
}
