const { Project, ProjectResource, User } = require('../models');
const { cloudinary } = require('../config/cloudinary');

// Create new project
const createProject = async (req, res) => {
    try {
        const { title, description, startDate, endDate, tags } = req.body;

        const project = await Project.create({
            title,
            description,
            createdBy: req.user.id,
            members: [req.user.id], // Creator is automatically a member
            startDate,
            endDate,
            tags: tags || []
        });

        const projectWithCreator = await Project.findByPk(project.id, {
            include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'avatar'] }]
        });

        res.status(201).json({
            message: 'Project created successfully',
            project: projectWithCreator
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all projects
const getProjects = async (req, res) => {
    try {
        const { status, search } = req.query;
        const where = {};

        if (status) where.status = status;

        const projects = await Project.findAll({
            where,
            include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'avatar'] }],
            order: [['createdAt', 'DESC']]
        });

        // Filter by search if provided
        let filteredProjects = projects;
        if (search) {
            filteredProjects = projects.filter(p =>
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.description?.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.json({ projects: filteredProjects });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single project
const getProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
                { model: User, as: 'creator', attributes: ['id', 'name', 'avatar'] },
                {
                    model: ProjectResource,
                    as: 'projectResources',
                    include: [{ model: User, as: 'uploader', attributes: ['id', 'name', 'avatar'] }]
                }
            ]
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Fetch member details
        const members = await User.findAll({
            where: { id: project.members },
            attributes: ['id', 'name', 'avatar', 'branch', 'year']
        });

        res.json({ project: { ...project.toJSON(), memberDetails: members } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update project
const updateProject = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is creator or member
        if (project.createdBy !== req.user.id && !project.members.includes(req.user.id)) {
            return res.status(403).json({ message: 'Not authorized to update this project' });
        }

        const { title, description, status, startDate, endDate, tags } = req.body;

        await project.update({
            ...(title && { title }),
            ...(description && { description }),
            ...(status && { status }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(tags && { tags })
        });

        res.json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add member to project
const addMember = async (req, res) => {
    try {
        const { userId } = req.body;
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is creator
        if (project.createdBy !== req.user.id) {
            return res.status(403).json({ message: 'Only project creator can add members' });
        }

        // Check if user exists
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if already a member
        if (project.members.includes(userId)) {
            return res.status(400).json({ message: 'User is already a member' });
        }

        await project.update({
            members: [...project.members, userId]
        });

        res.json({ message: 'Member added successfully', project });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload project resource
const uploadProjectResource = async (req, res) => {
    try {
        const { title, description } = req.body;
        const project = await Project.findByPk(req.params.id);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Check if user is a member
        if (!project.members.includes(req.user.id)) {
            return res.status(403).json({ message: 'Only project members can upload resources' });
        }

        let fileUrl = null;
        let fileType = null;

        if (req.file) {
            // Upload to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'auto',
                        folder: `college_portal/projects/${project.id}`
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(req.file.buffer);
            });

            fileUrl = result.secure_url;
            fileType = result.format;
        }

        const resource = await ProjectResource.create({
            projectId: project.id,
            title,
            description,
            fileUrl,
            fileType,
            uploadedBy: req.user.id
        });

        const resourceWithUploader = await ProjectResource.findByPk(resource.id, {
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

module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    addMember,
    uploadProjectResource
};
