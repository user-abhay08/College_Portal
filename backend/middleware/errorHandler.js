const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    console.error(err.stack);

    // Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            message: 'Validation error',
            errors: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    // Sequelize unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            message: 'Duplicate entry',
            errors: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Default error
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
