const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MyDesk = sequelize.define('MyDesk', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    folders: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    files: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    layout: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    timestamps: true
});

module.exports = MyDesk;
