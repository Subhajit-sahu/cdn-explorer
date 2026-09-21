/**
 * Centralized API Environment Configuration
 * Do not hardcode API URLs in individual components.
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const isCloudFront = API_BASE_URL.includes('cloudfront.net');

export const ENV_INFO = {
  name: isCloudFront ? 'CLOUDFRONT' : 'LOCAL',
  baseUrl: API_BASE_URL,
  host: (() => {
    try {
      const url = new URL(API_BASE_URL);
      return url.host;
    } catch {
      return API_BASE_URL.replace(/^https?:\/\//, '');
    }
  })(),
};
