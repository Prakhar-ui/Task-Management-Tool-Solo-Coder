const express = require('express');
const router = express.Router();
const Task = require('../models/TaskSchema');


router.get('/Alltasks', async (req, res) => {
    try {
        // Query the database for all tasks
        const tasks = await Task.find();
        res.json(tasks); // Sending the tasks as a JSON response
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/getTaskByDate/:date', async (req, res) => {
    try {
        const targetDate = new Date(req.params.date); // Extracting date from request parameters
        // Query the database for tasks that have a recurrence
        const tasks = await Task.find({ 'recurring.startDate': { $lte: targetDate }, $or: [{ 'recurring.endDate': { $gte: targetDate } }, { 'recurring.endDate': { $exists: false } }] });
        const filteredTasks = tasks.filter(task => {
            const startDate = new Date(task.recurring.startDate);
            const endDate = task.recurring.endDate ? new Date(task.recurring.endDate) : null;
            // Check if the target date falls within the start date and end date (if available) of the task
            return targetDate >= startDate && (!endDate || targetDate <= endDate);
        });
        res.json(filteredTasks); // Sending the tasks as a JSON response
    } catch (error) {
        console.error('Error fetching tasks by date:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', (req, res) => {
    res.send('Home Page'); // Sending a simple response for testing
});

module.exports = router;
