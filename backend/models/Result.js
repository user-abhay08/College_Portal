const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Result = sequelize.define('Result', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
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
    marks: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    grade: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    credits: {
        type: DataTypes.INTEGER,
        defaultValue: 3
    },
    academicYear: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Result;
