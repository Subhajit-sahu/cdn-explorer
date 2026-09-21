import React from 'react';

const CONCEPTS = [
  {
    term: 'EDGE LOCATION',
    desc: 'CloudFront serves cached content from geographically distributed edge locations closest to end-users.',
  },
  {
    term: 'CACHE HIT',
    desc: 'The requested object was already available in memory/disk at the CDN edge location, responding in milliseconds without querying origin.',
  },
  {
    term: 'CACHE MISS',
    desc: 'The CDN had to forward the request to retrieve the object from the origin server, resulting in standard origin network latency.',
  },
  {
    term: 'ORIGIN SERVER',
    desc: 'The authoritative application server (e.g. Node.js/Express) responsible for generating the authoritative dynamic responses.',
  },
  {
    term: 'TTL (TIME TO LIVE)',
    desc: 'Directive determining the maximum duration an object remains cached at the CDN edge before re-validating with the origin.',
  },
];

export default function LearningPanel() {
  return (
    <section className="card" aria-label="CDN Learning Reference">
      <div className="card-header">
        <div className="card-title">
          <span>What are we learning?</span>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Core CDN Concepts</span>
      </div>

      <div className="learning-grid">
        {CONCEPTS.map((concept) => (
          <div key={concept.term} className="learning-card">
            <div className="learning-term">{concept.term}</div>
            <div className="learning-desc">{concept.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
