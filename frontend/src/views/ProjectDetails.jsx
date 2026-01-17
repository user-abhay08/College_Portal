import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { Users, FileText, Upload, Calendar } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProject();
    }, [id]);

    const fetchProject = async () => {
        try {
            const data = await projectService.getProject(id);
            setProject(data.project);
        } catch (error) {
            console.error('Error fetching project:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <div className="glass-card animate-pulse h-96"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="container-custom py-8">
                <div className="glass-card text-center py-12">
                    <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom py-8">
            <div className="glass-card mb-6">
                <h1 className="text-3xl font-bold gradient-text mb-4">{project.title}</h1>
                {project.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                    <span className="badge badge-info">{project.status}</span>
                    {project.startDate && (
                        <span className="badge">
                            Start: {new Date(project.startDate).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                            <FileText className="w-5 h-5" />
                            <span>Project Resources</span>
                        </h2>
                        {project.projectResources && project.projectResources.length > 0 ? (
                            <div className="space-y-3">
                                {project.projectResources.map(resource => (
                                    <div
                                        key={resource.id}
                                        className="p-4 glass rounded-lg hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="font-semibold mb-1">{resource.title}</h3>
                                        {resource.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {resource.description}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">
                                                By {resource.uploader?.name}
                                            </span>
                                            {resource.fileUrl && (
                                                <a
                                                    href={resource.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn-secondary py-1 px-3 text-sm"
                                                >
                                                    Download
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                                No resources uploaded yet
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="glass-card">
                        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>Members</span>
                        </h2>
                        {project.memberDetails && project.memberDetails.length > 0 ? (
                            <div className="space-y-3">
                                {project.memberDetails.map(member => (
                                    <div key={member.id} className="flex items-center space-x-3">
                                        <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                                            {member.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{member.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {member.branch} - Year {member.year}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No members</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
