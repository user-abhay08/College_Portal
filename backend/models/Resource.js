const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Resource = sequelize.define('Resource', {
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
    branch: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 8
        }
    },
    subject: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fileUrl: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    fileType: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    uploadedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    timestamps: true
});

module.exports = Resource;
