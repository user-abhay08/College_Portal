const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ProjectResource = sequelize.define('ProjectResource', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Projects',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fileUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    fileType: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    uploadedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

module.exports = ProjectResource;
