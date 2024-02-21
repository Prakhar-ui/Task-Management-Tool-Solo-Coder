const express = require('express');
const router = express.Router();

router.get('/tasks', (req, res) => {
    res.send('All Tasks'); // Sending a simple response for testing
});

router.get('/', (req, res) => {
    res.send('Home Page'); // Sending a simple response for testing
});

module.exports = router;
