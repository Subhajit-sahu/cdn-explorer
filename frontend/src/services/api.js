import { API_BASE_URL, CLOUDFRONT_URL, DIRECT_ORIGIN_URL } from '../config/env';

/**
 * Executes a client-measured HTTP fetch request.
 * Captures real CloudFront and origin response headers exposed by the browser.
 */
async function executeRequest(endpoint, options = {}) {
  const base = options.baseUrl || API_BASE_URL;
  const url = `${base}${endpoint}`;
  const method = options.method || 'GET';
  const startTime = performance.now();
  const requestTimestamp = new Date();
  const isCdn = url.includes('cloudfront.net');

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    let data = null;
    let rawText = '';
    try {
      rawText = await response.text();
      data = rawText ? JSON.parse(rawText) : null;
    } catch {
      data = rawText;
    }

    const size = rawText ? new Blob([rawText]).size : 0;

    // Extract headers where exposed by the browser
    const rawCacheControl = response.headers.get('cache-control');
    const rawEtag = response.headers.get('etag');
    const rawXCache = response.headers.get('x-cache');
    const rawAge = response.headers.get('age');
    const rawVia = response.headers.get('via');
    const rawXAmzCfPop = response.headers.get('x-amz-cf-pop');
    const rawXAmzCfId = response.headers.get('x-amz-cf-id');

    // Interpret X-Cache strictly without fabrication:
    // "Hit from cloudfront" -> HIT
    // "Miss from cloudfront" -> MISS
    // Unavailable -> Unknown
    let xCache = 'Unknown';
    if (rawXCache) {
      const lower = rawXCache.toLowerCase();
      if (lower.includes('hit')) {
        xCache = 'HIT';
      } else if (lower.includes('miss')) {
        xCache = 'MISS';
      } else {
        xCache = rawXCache;
      }
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText || (response.ok ? 'OK' : 'Error'),
      duration,
      data,
      timestamp: requestTimestamp,
      size,
      url,
      method,
      endpoint,
      target: isCdn ? 'CDN' : 'DIRECT ORIGIN',
      targetUrl: base,
      // CDN and HTTP Header Telemetry
      headers: {
        cacheControl: rawCacheControl || null,
        etag: rawEtag || null,
        xCache,
        rawXCache: rawXCache || null,
        age: rawAge != null ? rawAge : null,
        via: rawVia || null,
        xAmzCfPop: rawXAmzCfPop || null,
        xAmzCfId: rawXAmzCfId || null,
      },
      error: response.ok ? null : `HTTP Error ${response.status}: ${response.statusText}`,
    };
  } catch (err) {
    const endTime = performance.now();
    const duration = endTime - startTime;

    return {
      ok: false,
      status: 0,
      statusText: 'Network Error',
      duration,
      data: null,
      timestamp: requestTimestamp,
      size: 0,
      url,
      method,
      endpoint,
      target: isCdn ? 'CDN' : 'DIRECT ORIGIN',
      targetUrl: base,
      headers: {
        cacheControl: null,
        etag: null,
        xCache: 'Unknown',
        rawXCache: null,
        age: null,
        via: null,
        xAmzCfPop: null,
        xAmzCfId: null,
      },
      error: err.message || 'Failed to connect. Check network and CORS configuration.',
    };
  }
}

export const apiService = {
  getRoot: (baseUrl) => executeRequest('/', { baseUrl }),
  getProducts: (baseUrl) => executeRequest('/api/products', { baseUrl }),
  getCurrentTime: (baseUrl) => executeRequest('/api/time', { baseUrl }),
  getCdnTest: (baseUrl) => executeRequest('/api/cdn-test', { baseUrl }),
  CLOUDFRONT_URL,
  DIRECT_ORIGIN_URL,
};
