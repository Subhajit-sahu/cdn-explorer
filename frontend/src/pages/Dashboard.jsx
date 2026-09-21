import React, { useState } from 'react';
import ArchitectureFlow from '../components/architecture/ArchitectureFlow';
import ApiTestCard from '../components/api/ApiTestCard';
import RequestInspector from '../components/api/RequestInspector';
import ResponseViewer from '../components/api/ResponseViewer';
import RequestHistory from '../components/api/RequestHistory';
import CdnStatus from '../components/cdn/CdnStatus';
import PerformancePanel from '../components/cdn/PerformancePanel';
import GeoExperiment from '../components/cdn/GeoExperiment';
import LearningPanel from '../components/learning/LearningPanel';
import { apiService } from '../services/api';

export default function Dashboard() {
  const [history, setHistory] = useState([]);
  const [lastRequest, setLastRequest] = useState(null);
  const [loading, setLoading] = useState({
    products: false,
    time: false,
    cdnTest: false,
  });
  const [metrics, setMetrics] = useState({
    products: null,
    time: null,
    cdnTest: null,
  });

  const executeApiCall = async (key, callFn, meta) => {
    setLoading((prev) => ({ ...prev, [key]: true }));

    const res = await callFn();

    const requestLog = {
      ...res,
      endpoint: meta.endpoint,
      type: meta.type,
      typeClass: meta.typeClass,
    };

    setLastRequest(requestLog);
    setMetrics((prev) => ({
      ...prev,
      [key]: { duration: res.duration },
    }));
    setHistory((prev) => [requestLog, ...prev]);

    setLoading((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div>
      {/* 1. System Architecture Card */}
      <ArchitectureFlow />

      {/* 2. API Testing Section */}
      <section style={{ marginBottom: '2rem' }} aria-label="API Testing Endpoints">
        <div className="card-title api-section-header">
          <span>API Testing Suite</span>
        </div>

        <div className="api-cards-grid">
          <ApiTestCard
            title="Products API"
            endpoint="GET /api/products"
            type="CACHEABLE"
            typeClass="cacheable"
            source="ORIGIN"
            description="Returns catalog items marked cacheable. Origin data will be cached at edge once CloudFront is linked."
            latestDuration={metrics.products?.duration}
            loading={loading.products}
            onSend={() =>
              executeApiCall('products', apiService.getProducts, {
                endpoint: '/api/products',
                type: 'CACHEABLE',
                typeClass: 'cacheable',
              })
            }
          />

          <ApiTestCard
            title="Time API"
            endpoint="GET /api/time"
            type="DYNAMIC / NON-CACHEABLE"
            typeClass="dynamic"
            source="ORIGIN"
            description="Returns live ISO server timestamp. Proves dynamic data changes with each subsequent request."
            latestDuration={metrics.time?.duration}
            loading={loading.time}
            onSend={() =>
              executeApiCall('time', apiService.getCurrentTime, {
                endpoint: '/api/time',
                type: 'DYNAMIC / NON-CACHEABLE',
                typeClass: 'dynamic',
              })
            }
          />

          <ApiTestCard
            title="CDN Test API"
            endpoint="GET /api/cdn-test"
            type="CACHE TEST"
            typeClass="cache-test"
            source="ORIGIN"
            description="Simulates ~1000ms origin delay. In Phase 2: First call = CACHE MISS (slow), Subsequent calls = CACHE HIT (fast)."
            latestDuration={metrics.cdnTest?.duration}
            loading={loading.cdnTest}
            onSend={() =>
              executeApiCall('cdnTest', apiService.getCdnTest, {
                endpoint: '/api/cdn-test',
                type: 'CACHE TEST',
                typeClass: 'cache-test',
              })
            }
          />
        </div>
      </section>

      {/* 3. Main 2-Column Split: Inspector & Response Viewer (Left), CDN & Perf (Right) */}
      <div className="dashboard-split">
        <div className="split-col">
          <RequestInspector lastRequest={lastRequest} />
          <ResponseViewer
            responseData={lastRequest?.data}
            error={lastRequest?.error}
          />
        </div>

        <div className="split-col">
          <CdnStatus />
          <PerformancePanel metrics={metrics} />
          <GeoExperiment />
        </div>
      </div>

      {/* 4. Request History Log */}
      <RequestHistory
        history={history}
        onClearHistory={() => setHistory([])}
      />

      {/* 5. Educational Learning Panel */}
      <LearningPanel />
    </div>
  );
}
