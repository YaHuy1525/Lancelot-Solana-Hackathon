jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn().mockResolvedValue(1000000000),
  })),
  PublicKey: jest.fn().mockImplementation((key) => key),
  clusterApiUrl: jest.fn().mockReturnValue('https://api.devnet.solana.com'),
}));

jest.mock('../config/db', () => jest.fn());

const request = require('supertest');
const app = require('../server');

describe('Health & Metrics Endpoints', () => {
  it('GET /health should return 200 and healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('service', 'lancelot-backend');
    expect(res.body).toHaveProperty('timestamp');
  });

  it('GET /metrics should return 200 and system metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('uptime_seconds');
    expect(res.body).toHaveProperty('memory_heap_used_bytes');
    expect(res.body).toHaveProperty('status_code', 200);
  });
});
