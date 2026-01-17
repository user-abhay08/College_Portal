import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { useAuth } from '../context/AuthContext';
import { Plus, FolderKanban, Users, Calendar, Clock } from 'lucide-react';

const Projects = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const data = await projectService.getProjects();
            setProjects(data.projects || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await projectService.createProject(formData);
            setShowCreateModal(false);
            setFormData({ title: '', description: '', startDate: '', endDate: '' });
            fetchProjects();
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            'planning': 'badge-info',
            'in-progress': 'badge-warning',
            'completed': 'badge-success',
            'on-hold': 'badge-error'
        };
        return badges[status] || 'badge';
    };

    return (
        <div className="container-custom py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Project Collaboration</h1>
                    <p className="text-gray-600 dark:text-gray-400">Work together on academic projects</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="btn-primary flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>New Project</span>
                </button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="glass-card animate-pulse h-48"></div>
                    ))}
                </div>
            ) : projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map(project => (
                        <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="glass-card card-hover block"
                        >
                            <div className="flex items-start space-x-3 mb-4">
                                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white">
                                    <FolderKanban className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1">{project.title}</h3>
                                    <span className={`badge ${getStatusBadge(project.status)}`}>
                                        {project.status}
                                    </span>
                                </div>
                            </div>

                            {project.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                            )}

                            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center space-x-2">
                                    <Users className="w-4 h-4" />
                                    <span>{project.members?.length || 0} members</span>
                                </div>
                                {project.creator && (
                                    <div className="flex items-center space-x-2">
                                        <Clock className="w-4 h-4" />
                                        <span>By {project.creator.name}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="glass-card text-center py-12">
                    <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No Projects Yet</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Create your first project and start collaborating
                    </p>
                    <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                        Create Project
                    </button>
                </div>
            )}

            {/* Create Project Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-strong rounded-2xl p-6 max-w-md w-full animate-scale-in">
                        <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Project Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="input-field"
                                    placeholder="e.g., AI Chatbot Project"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="input-field"
                                    rows="3"
                                    placeholder="Brief description..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">End Date</label>
                                    <input
                                        type="date"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4">
                                <button type="submit" className="btn-primary flex-1">
                                    Create Project
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
