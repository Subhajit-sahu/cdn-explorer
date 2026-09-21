import { API_BASE_URL } from '../config/env';

/**
 * Executes a client-measured HTTP fetch request to the backend.
 * Measures real client duration using high-resolution performance.now().
 */
async function executeRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const method = options.method || 'GET';
  const startTime = performance.now();
  const requestTimestamp = new Date();

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

    // Estimate response payload byte size
    const size = rawText ? new Blob([rawText]).size : 0;

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
      error: err.message || 'Failed to connect to backend server. Make sure the backend is running on port 5000.',
    };
  }
}

export const apiService = {
  getRoot: () => executeRequest('/'),
  getProducts: () => executeRequest('/api/products'),
  getCurrentTime: () => executeRequest('/api/time'),
  getCdnTest: () => executeRequest('/api/cdn-test'),
};
