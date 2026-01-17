const { sequelize } = require('../config/database');
const User = require('./User');
const Resource = require('./Resource');
const Result = require('./Result');
const Project = require('./Project');
const ProjectResource = require('./ProjectResource');
const MyDesk = require('./MyDesk');

// Define associations
User.hasMany(Resource, { foreignKey: 'uploadedBy', as: 'resources' });
Resource.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

User.hasMany(Result, { foreignKey: 'studentId', as: 'results' });
Result.belongsTo(User, { foreignKey: 'studentId', as: 'student' });

User.hasMany(Project, { foreignKey: 'createdBy', as: 'createdProjects' });
Project.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

Project.hasMany(ProjectResource, { foreignKey: 'projectId', as: 'projectResources' });
ProjectResource.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

User.hasMany(ProjectResource, { foreignKey: 'uploadedBy', as: 'uploadedProjectResources' });
ProjectResource.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

User.hasOne(MyDesk, { foreignKey: 'userId', as: 'desk' });
MyDesk.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
    sequelize,
    User,
    Resource,
    Result,
    Project,
    ProjectResource,
    MyDesk
};
