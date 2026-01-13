const express = require('express');
const router = express.Router();
const { getAllGigs, getGigById, createGig } = require('../controllers/gig.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getAllGigs);
router.get('/:id', getGigById);
router.post('/', protect, createGig);

module.exports = router;
