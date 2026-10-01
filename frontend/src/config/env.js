/**
 * Centralized API Environment Configuration
 * Connects frontend to the real AWS CloudFront distribution
 * and provides Direct EC2 Origin reference for comparison.
 */

export const CLOUDFRONT_URL = 'https://d302cmp2c7foh.cloudfront.net';
export const DIRECT_ORIGIN_URL = 'http://52.66.74.208:5000';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || CLOUDFRONT_URL;

export const isCloudFront = API_BASE_URL.includes('cloudfront.net');

export const ENV_INFO = {
  name: isCloudFront ? 'CLOUDFRONT' : 'DIRECT ORIGIN',
  baseUrl: API_BASE_URL,
  host: (() => {
    try {
      const url = new URL(API_BASE_URL);
      return url.host;
    } catch {
      return API_BASE_URL.replace(/^https?:\/\//, '');
    }
  })(),
  originHost: '52.66.74.208:5000',
  distributionDomain: 'd302cmp2c7foh.cloudfront.net',
};
