const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startTime: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
        second: { type: Number, required: true }
    },
    endTime: {
        hour: { type: Number, required: true },
        minute: { type: Number, required: true },
        second: { type: Number, required: true }
    },
    totalSeconds: { type: Number, required: true }, // Total duration of the task in seconds
    recurring: {
        frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'], required: true }, // Frequency of recurrence
        days: [{ type: String, enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] }], // Days of the week for weekly recurrence
        startDate: { type: Date, required: true }, // Start date of recurrence
        endDate: { type: Date } // End date of recurrence (optional)
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;