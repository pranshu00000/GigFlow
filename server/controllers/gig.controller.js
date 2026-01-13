const Gig = require('../models/Gig');

// @desc    Get all open gigs
// @route   GET /api/gigs
// @access  Public
const getAllGigs = async (req, res) => {
    const { search } = req.query;
    try {
        let query = { status: 'open' };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const gigs = await Gig.find(query).populate('owner', 'name email').sort({ createdAt: -1 });
        res.json(gigs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get gig by ID
// @route   GET /api/gigs/:id
// @access  Public (or Private)
const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('owner', 'name email');
        if (gig) {
            res.json(gig);
        } else {
            res.status(404).json({ message: 'Gig not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new gig
// @route   POST /api/gigs
// @access  Private (Client/User)
const createGig = async (req, res) => {
    const { title, description, budget } = req.body;

    try {
        const gig = await Gig.create({
            title,
            description,
            budget,
            owner: req.user._id,
        });
        const populatedGig = await Gig.findById(gig._id).populate('owner', 'name email');
        res.status(201).json(populatedGig);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllGigs,
    getGigById,
    createGig,
};
