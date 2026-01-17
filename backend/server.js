const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/results', require('./routes/results'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/desk', require('./routes/desk'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'College Portal API is running' });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect to database
        await connectDB();

        // Start listening
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
