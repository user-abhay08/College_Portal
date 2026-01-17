import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resourceService } from '../services/resourceService';
import { branchList, branches } from '../data/branches';
import { FileText, Download, ThumbsUp, ThumbsDown, Upload, Filter } from 'lucide-react';

const Resources = () => {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        branch: '',
        semester: '',
        subject: ''
    });

    useEffect(() => {
        fetchResources();
    }, [filters]);

    const fetchResources = async () => {
        try {
            setLoading(true);
            const data = await resourceService.getResources(filters);
            setResources(data.resources || []);
        } catch (error) {
            console.error('Error fetching resources:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (id) => {
        try {
            await resourceService.likeResource(id);
            fetchResources();
        } catch (error) {
            console.error('Error liking resource:', error);
        }
    };

    const handleDislike = async (id) => {
        try {
            await resourceService.dislikeResource(id);
            fetchResources();
        } catch (error) {
            console.error('Error disliking resource:', error);
        }
    };

    const subjects = filters.branch && filters.semester
        ? branches[filters.branch]?.semesters[parseInt(filters.semester) - 1]?.subjects || []
        : [];

    return (
        <div className="container-custom py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">Resource Library</h1>
                    <p className="text-gray-600 dark:text-gray-400">Browse and download study materials</p>
                </div>
                <Link to="/upload-resource" className="btn-primary flex items-center space-x-2">
                    <Upload className="w-5 h-5" />
                    <span>Upload Resource</span>
                </Link>
            </div>

            {/* Filters */}
            <div className="glass-card mb-8">
                <div className="flex items-center space-x-2 mb-4">
                    <Filter className="w-5 h-5 text-primary-600" />
                    <h2 className="text-lg font-semibold">Filters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Branch</label>
                        <select
                            value={filters.branch}
                            onChange={(e) => setFilters({ ...filters, branch: e.target.value, semester: '', subject: '' })}
                            className="input-field"
                        >
                            <option value="">All Branches</option>
                            {branchList.map(branch => (
                                <option key={branch.code} value={branch.code}>{branch.code}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Semester</label>
                        <select
                            value={filters.semester}
                            onChange={(e) => setFilters({ ...filters, semester: e.target.value, subject: '' })}
                            className="input-field"
                            disabled={!filters.branch}
                        >
                            <option value="">All Semesters</option>
                            {filters.branch && branches[filters.branch]?.semesters.map((sem, idx) => (
                                <option key={idx} value={sem.sem}>{sem.sem}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Subject</label>
                        <select
                            value={filters.subject}
                            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                            className="input-field"
                            disabled={!filters.semester}
                        >
                            <option value="">All Subjects</option>
                            {subjects.map((subject, idx) => (
                                <option key={idx} value={subject}>{subject}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Resources Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="glass-card animate-pulse">
                            <div className="h-40 bg-gray-200 dark:bg-dark-700 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : resources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource) => (
                        <div key={resource.id} className="glass-card card-hover">
                            <div className="flex items-start space-x-3 mb-4">
                                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1">{resource.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="badge badge-info">{resource.branch}</span>
                                        <span className="badge badge-success">Sem {resource.semester}</span>
                                    </div>
                                </div>
                            </div>

                            {resource.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {resource.description}
                                </p>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => handleLike(resource.id)}
                                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-green-600"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        <span className="text-sm">{resource.likes || 0}</span>
                                    </button>
                                    <button
                                        onClick={() => handleDislike(resource.id)}
                                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-red-600"
                                    >
                                        <ThumbsDown className="w-4 h-4" />
                                        <span className="text-sm">{resource.dislikes || 0}</span>
                                    </button>
                                </div>
                                <a
                                    href={resource.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary py-2 text-sm flex items-center space-x-1"
                                >
                                    <Download className="w-4 h-4" />
                                    <span>Download</span>
                                </a>
                            </div>

                            {resource.uploader && (
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-700 text-sm text-gray-500">
                                    Uploaded by {resource.uploader.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-card text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No Resources Found</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Be the first to upload resources for this selection
                    </p>
                    <Link to="/upload-resource" className="btn-primary">
                        Upload Resource
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Resources;
