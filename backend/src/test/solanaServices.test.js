jest.mock('@solana/web3.js', () => ({
  Connection: jest.fn().mockImplementation(() => ({
    getBalance: jest.fn().mockResolvedValue(1000000000),
  })),
  PublicKey: jest.fn().mockImplementation((key) => key),
  clusterApiUrl: jest.fn().mockReturnValue('https://api.devnet.solana.com'),
}));

const solanaService = require('../utils/solanaServices');

describe('SolanaService', () => {
  it('should create a job', async () => {
    const jobData = {
      title: 'Test Job',
      description: 'Test Description',
      price: 1,
    };
    const employerPublicKey = 'dummy_employer_public_key';
    const signature = await solanaService.createJob(jobData, employerPublicKey);
    expect(signature).toBe('dummy_signature_for_createJob');
  });

  it('should return job details', async () => {
    const job = await solanaService.getJob(1);
    expect(job).toHaveProperty('id', 1);
    expect(job).toHaveProperty('title', 'Sample Job');
  });
});
