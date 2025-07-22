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
});
