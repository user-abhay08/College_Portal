const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    members: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('planning', 'in-progress', 'completed', 'on-hold'),
        defaultValue: 'planning'
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    }
}, {
    timestamps: true
});

module.exports = Project;
