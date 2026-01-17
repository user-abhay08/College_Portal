const { Resource, User } = require('../models');
const { cloudinary } = require('../config/cloudinary');

// Upload resource
const uploadResource = async (req, res) => {
    try {
        const { title, description, branch, semester, subject } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }

        // Upload to Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: 'college_portal/resources'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(req.file.buffer);
        });

        // Create resource
        const resource = await Resource.create({
            title,
            description,
            branch,
            semester: parseInt(semester),
            subject,
            fileUrl: result.secure_url,
            fileType: result.format,
            uploadedBy: req.user.id
        });

        // Fetch resource with uploader info
        const resourceWithUploader = await Resource.findByPk(resource.id, {
            include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'avatar'] }]
        });

        res.status(201).json({
            message: 'Resource uploaded successfully',
            resource: resourceWithUploader
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all resources with filters
const getResources = async (req, res) => {
    try {
        const { branch, semester, subject, search } = req.query;
        const where = {};

        if (branch) where.branch = branch;
        if (semester) where.semester = parseInt(semester);
        if (subject) where.subject = subject;
        if (search) {
            where[Op.or] = [
                { title: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }

        const resources = await Resource.findAll({
            where,
            include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'avatar'] }],
            order: [['createdAt', 'DESC']]
        });

        res.json({ resources });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single resource
const getResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id, {
            include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'avatar'] }]
        });

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        res.json({ resource });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like resource
const likeResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        await resource.update({
            likes: resource.likes + 1
        });

        res.json({ message: 'Resource liked', resource });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Dislike resource
const dislikeResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        await resource.update({
            dislikes: resource.dislikes + 1
        });

        res.json({ message: 'Resource disliked', resource });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete resource
const deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);

        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }

        // Check if user is the uploader or admin
        if (resource.uploadedBy !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to delete this resource' });
        }

        await resource.destroy();
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    uploadResource,
    getResources,
    getResource,
    likeResource,
    dislikeResource,
    deleteResource
};
