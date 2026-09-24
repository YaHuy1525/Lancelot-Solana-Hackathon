jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn().mockResolvedValue(1000000000),
  })),
  PublicKey: jest.fn().mockImplementation((key) => key),
  clusterApiUrl: jest.fn().mockReturnValue('https://api.devnet.solana.com'),
}));

const request = require('supertest');
const express = require('express');
const solanaRoutes = require('../routes/solanaRoutes');

const app = express();
app.use(express.json());
app.use('/solana', solanaRoutes);

describe('Solana Routes', () => {
  it('should create a job', async () => {
    const jobData = {
      title: 'Test Job',
      description: 'Test Description',
      price: 1,
      employerPublicKey: 'dummy_employer_public_key',
    };

    const res = await request(app).post('/solana/job').send(jobData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('signature', 'dummy_signature_for_createJob');
  });
});
