const express = require('express');
const router = express.Router();

router.get('/quote', async (req, res) => {
    try {
        const response = await fetch('https://zenquotes.io/api/today');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fetch error:', error); 
        res.status(500).json({ message: 'Failed to fetch quote' });
    }
});


module.exports = router;
