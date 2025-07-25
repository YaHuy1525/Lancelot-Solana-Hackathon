const express = require('express');
const router = express.Router();
const solanaService = require('../utils/solanaServices');

// Test Solana connection
router.get('/test-connection', async (req, res) => {
  try {
    const connectionStatus = await solanaService.testConnection();
    
    if (connectionStatus.connected) {
      res.status(200).json({
        success: true,
        message: 'Solana connection successful',
        data: connectionStatus
      });
    } else {
      res.status(503).json({
        success: false,
        message: 'Solana connection failed',
        data: connectionStatus
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error while testing Solana connection',
      error: error.message
    });
  }
});

// Get cluster info
router.get('/cluster-info', async (req, res) => {
  try {
    const connectionStatus = await solanaService.testConnection();
    res.status(200).json({
      success: true,
      data: {
        cluster: connectionStatus.cluster,
        rpcUrl: connectionStatus.rpcUrl,
        connected: connectionStatus.connected,
        version: connectionStatus.version,
        currentSlot: connectionStatus.currentSlot,
        blockHeight: connectionStatus.blockHeight
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get cluster info',
      error: error.message
    });
  }
});

// Get account balance
router.get('/balance/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params;
    
    if (!publicKey) {
      return res.status(400).json({
        success: false,
        message: 'Public key is required'
      });
    }

    const balanceInfo = await solanaService.getBalance(publicKey);
    
    res.status(200).json({
      success: true,
      data: balanceInfo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to get balance',
      error: error.message
    });
  }
});

// Get account info
router.get('/account/:publicKey', async (req, res) => {
  try {
    const { publicKey } = req.params;
    
    if (!publicKey) {
      return res.status(400).json({
        success: false,
        message: 'Public key is required'
      });
    }

    const accountInfo = await solanaService.getAccountInfo(publicKey);
    
    res.status(200).json({
      success: true,
      data: accountInfo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to get account info',
      error: error.message
    });
  }
});

// Get recent blockhash
router.get('/blockhash', async (req, res) => {
  try {
    const blockhashInfo = await solanaService.getRecentBlockhash();
    
    res.status(200).json({
      success: true,
      data: blockhashInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get recent blockhash',
      error: error.message
    });
  }
});

// Health check for Solana service
router.get('/health', async (req, res) => {
  try {
    const connectionStatus = await solanaService.testConnection();
    
    res.status(connectionStatus.connected ? 200 : 503).json({
      service: 'Solana',
      status: connectionStatus.connected ? 'healthy' : 'unhealthy',
      data: connectionStatus
    });
  } catch (error) {
    res.status(503).json({
      service: 'Solana',
      status: 'error',
      error: error.message
    });
  }
});

// ----------------------------------------------------------------
// Job Contract Routes
// ----------------------------------------------------------------

// Create a new job
router.post('/job', async (req, res) => {
  try {
    const { title, description, price, employerPublicKey } = req.body;
    const jobData = { title, description, price };
    const signature = await solanaService.createJob(jobData, employerPublicKey);
    res.status(201).json({ success: true, signature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a job by ID
router.get('/job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const job = await solanaService.getJob(id);
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Complete a job
router.post('/job/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { employerPublicKey } = req.body;
    const signature = await solanaService.completeJob(id, employerPublicKey);
    res.status(200).json({ success: true, signature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Pay a contractor for a job
router.post('/job/:id/pay', async (req, res) => {
  try {
    const { id } = req.params;
    const { employerPublicKey } = req.body;
    const signature = await solanaService.payContractor(id, employerPublicKey);
    res.status(200).json({ success: true, signature });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;