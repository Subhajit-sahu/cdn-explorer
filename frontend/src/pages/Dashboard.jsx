import React, { useState } from 'react';
import QuickStartGuide from '../components/cdn/QuickStartGuide';
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
  const [comparisonData, setComparisonData] = useState({
    origin: null,
    cdn: null,
  });
  const [comparing, setComparing] = useState(false);

  const executeApiCall = async (key, callFn, meta, baseUrl = null) => {
    setLoading((prev) => ({ ...prev, [key]: true }));

    const res = await callFn(baseUrl);

    const requestLog = {
      ...res,
      endpoint: meta.endpoint,
      type: meta.type,
      typeClass: meta.typeClass,
    };

    setLastRequest(requestLog);
    setMetrics((prev) => ({
      ...prev,
      [key]: {
        duration: res.duration,
        headers: res.headers,
      },
    }));
    setHistory((prev) => [requestLog, ...prev]);

    setLoading((prev) => ({ ...prev, [key]: false }));
    return requestLog;
  };

  const handleRunComparison = async () => {
    setComparing(true);

    try {
      // 1. Direct EC2 Origin Request
      const originLog = await executeApiCall(
        'cdnTest',
        apiService.getCdnTest,
        {
          endpoint: '/api/cdn-test',
          type: 'CACHE TEST',
          typeClass: 'cache-test',
        },
        apiService.DIRECT_ORIGIN_URL
      );

      // 2. CloudFront CDN Request
      const cdnLog = await executeApiCall(
        'cdnTest',
        apiService.getCdnTest,
        {
          endpoint: '/api/cdn-test',
          type: 'CACHE TEST',
          typeClass: 'cache-test',
        },
        apiService.CLOUDFRONT_URL
      );

      setComparisonData({
        origin: originLog,
        cdn: cdnLog,
      });
      setLastRequest(cdnLog);
    } finally {
      setComparing(false);
    }
  };

  const handleQuickMiss = () => {
    executeApiCall('cdnTest', apiService.getCdnTest, {
      endpoint: '/api/cdn-test',
      type: 'CACHE TEST (30s)',
      typeClass: 'cache-test',
    });
  };

  const handleQuickHit = () => {
    executeApiCall('cdnTest', apiService.getCdnTest, {
      endpoint: '/api/cdn-test',
      type: 'CACHE TEST (30s)',
      typeClass: 'cache-test',
    });
  };

  const latestPop = lastRequest?.headers?.xAmzCfPop || null;

  return (
    <div>
      {/* 1. Interactive Quick Start Guide */}
      <QuickStartGuide
        onRunMiss={handleQuickMiss}
        onRunHit={handleQuickHit}
        onRunBenchmark={handleRunComparison}
        loading={loading.cdnTest}
        benchmarking={comparing}
        lastResult={lastRequest}
      />

      {/* 2. System Architecture Flow Diagram */}
      <ArchitectureFlow latestPop={latestPop} />

      {/* 3. API Testing Suite */}
      <section style={{ marginBottom: '2rem' }} aria-label="API Testing Endpoints">
        <div className="api-section-header">
          <span className="section-title">API Testing Suite (via AWS CloudFront)</span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Target: d302cmp2c7foh.cloudfront.net
          </span>
        </div>

        <div className="api-cards-grid">
          <ApiTestCard
            title="Products API"
            endpoint="GET /api/products"
            type="CACHEABLE (60s)"
            typeClass="cacheable"
            description="Returns catalog data marked cacheable for 60s. Request 1 triggers MISS from CloudFront; subsequent calls respond with HIT and an increasing Age."
            latestDuration={metrics.products?.duration}
            latestXCache={metrics.products?.headers?.xCache}
            loading={loading.products}
            onSend={() =>
              executeApiCall('products', apiService.getProducts, {
                endpoint: '/api/products',
                type: 'CACHEABLE (60s)',
                typeClass: 'cacheable',
              })
            }
          />

          <ApiTestCard
            title="Time API"
            endpoint="GET /api/time"
            type="DYNAMIC (no-store)"
            typeClass="dynamic"
            description="Origin responds with Cache-Control: no-store. CloudFront never caches this endpoint, always forwarding to origin (consistently MISS)."
            latestDuration={metrics.time?.duration}
            latestXCache={metrics.time?.headers?.xCache}
            loading={loading.time}
            onSend={() =>
              executeApiCall('time', apiService.getCurrentTime, {
                endpoint: '/api/time',
                type: 'DYNAMIC (no-store)',
                typeClass: 'dynamic',
              })
            }
          />

          <ApiTestCard
            title="CDN Test API"
            endpoint="GET /api/cdn-test"
            type="CACHE TEST (30s)"
            typeClass="cache-test"
            description="Origin simulates 1000ms delay with max-age=30. Click once to observe ~1000ms (MISS); click again to observe ~100-200ms (HIT) directly from edge."
            latestDuration={metrics.cdnTest?.duration}
            latestXCache={metrics.cdnTest?.headers?.xCache}
            loading={loading.cdnTest}
            onSend={() =>
              executeApiCall('cdnTest', apiService.getCdnTest, {
                endpoint: '/api/cdn-test',
                type: 'CACHE TEST (30s)',
                typeClass: 'cache-test',
              })
            }
          />
        </div>
      </section>

      {/* 4. Main 2-Column Split: Inspector & Response Viewer (Left), CDN & Perf (Right) */}
      <div className="dashboard-split">
        <div className="split-col">
          <RequestInspector lastRequest={lastRequest} />
          <ResponseViewer
            responseData={lastRequest?.data}
            error={lastRequest?.error}
          />
        </div>

        <div className="split-col">
          <CdnStatus latestCdnData={lastRequest?.target === 'CDN' ? lastRequest : null} />
          <PerformancePanel
            cdnTestMetrics={metrics.cdnTest}
            comparisonData={comparisonData}
            onRunComparison={handleRunComparison}
            comparing={comparing}
          />
          <GeoExperiment />
        </div>
      </div>

      {/* 5. Request History Telemetry Log */}
      <RequestHistory
        history={history}
        onClearHistory={() => setHistory([])}
      />

      {/* 6. Educational Learning Panel */}
      <LearningPanel />
    </div>
  );
}
