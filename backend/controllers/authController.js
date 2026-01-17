const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// Register user
const register = async (req, res) => {
    try {
        const { name, email, password, branch, year, semester, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            branch,
            year,
            semester,
            role: role || 'student'
        });

        // Generate token
        const token = generateToken(user.id);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(user.id);

        res.json({
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get current user profile
const getProfile = async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { name, branch, year, semester, bio, avatar } = req.body;

        await req.user.update({
            ...(name && { name }),
            ...(branch && { branch }),
            ...(year && { year }),
            ...(semester && { semester }),
            ...(bio && { bio }),
            ...(avatar && { avatar })
        });

        res.json({
            message: 'Profile updated successfully',
            user: req.user
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};
