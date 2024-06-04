const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/items
// @desc    Create a new item
// @access  Public
router.post('/', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;

    const newItem = new Item({
        name,
        price,
        description,
        imageUrl
    });

    try {
        const item = await newItem.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
