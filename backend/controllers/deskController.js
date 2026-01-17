const { MyDesk } = require('../models');

// Get user's desk
const getDesk = async (req, res) => {
    try {
        let desk = await MyDesk.findOne({ where: { userId: req.user.id } });

        // Create desk if doesn't exist
        if (!desk) {
            desk = await MyDesk.create({
                userId: req.user.id,
                folders: [],
                files: [],
                layout: {}
            });
        }

        res.json({ desk });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user's desk
const updateDesk = async (req, res) => {
    try {
        const { folders, files, layout } = req.body;

        let desk = await MyDesk.findOne({ where: { userId: req.user.id } });

        if (!desk) {
            desk = await MyDesk.create({
                userId: req.user.id,
                folders: folders || [],
                files: files || [],
                layout: layout || {}
            });
        } else {
            await desk.update({
                ...(folders !== undefined && { folders }),
                ...(files !== undefined && { files }),
                ...(layout !== undefined && { layout })
            });
        }

        res.json({
            message: 'Desk updated successfully',
            desk
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDesk,
    updateDesk
};
