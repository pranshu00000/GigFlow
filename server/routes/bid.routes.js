const express = require('express');
const router = express.Router();
const { createBid, getBidsByGig, hireFreelancer } = require('../controllers/bid.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, createBid);
router.get('/:gigId', protect, getBidsByGig);
router.patch('/:bidId/hire', protect, hireFreelancer);

module.exports = router;
