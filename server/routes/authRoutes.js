const express = require('express');
const router = express.Router();

// Define your authentication-related routes here
router.get('/test', (req, res) => {
    res.send('Auth route is working!');
});

module.exports = router; // Ensure you're exporting the router object
