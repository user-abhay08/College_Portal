import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resourceService } from '../services/resourceService';
import { branchList, branches } from '../data/branches';
import { Upload, FileText, X } from 'lucide-react';

const UploadResource = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        branch: user?.branch || '',
        semester: user?.semester || '',
        subject: ''
    });

    const subjects = formData.branch && formData.semester
        ? branches[formData.branch]?.semesters[parseInt(formData.semester) - 1]?.subjects || []
        : [];

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 10 * 1024 * 1024) {
                setError('File size must be less than 10MB');
                return;
            }
            setFile(selectedFile);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('file', file);
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('branch', formData.branch);
        data.append('semester', formData.semester);
        data.append('subject', formData.subject);

        try {
            await resourceService.uploadResource(data);
            navigate('/resources');
        } catch (err) {
            setError(err.response?.data?.message || 'Error uploading resource');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-custom py-8 max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text mb-2">Upload Resource</h1>
                <p className="text-gray-600 dark:text-gray-400">Share study materials with your peers</p>
            </div>

            <div className="glass-card">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="input-field"
                            placeholder="e.g., Data Structures Unit 1 Notes"
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
                            placeholder="Brief description of the resource..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Branch *</label>
                            <select
                                value={formData.branch}
                                onChange={(e) => setFormData({ ...formData, branch: e.target.value, subject: '' })}
                                className="input-field"
                                required
                            >
                                <option value="">Select Branch</option>
                                {branchList.map(branch => (
                                    <option key={branch.code} value={branch.code}>{branch.code}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Semester *</label>
                            <select
                                value={formData.semester}
                                onChange={(e) => setFormData({ ...formData, semester: e.target.value, subject: '' })}
                                className="input-field"
                                required
                            >
                                <option value="">Semester</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                    <option key={sem} value={sem}>{sem}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Subject *</label>
                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="input-field"
                                required
                                disabled={!formData.semester}
                            >
                                <option value="">Subject</option>
                                {subjects.map((subject, idx) => (
                                    <option key={idx} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">File (PDF or Image) *</label>
                        <div className="border-2 border-dashed border-gray-300 dark:border-dark-700 rounded-xl p-8 text-center">
                            {file ? (
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <FileText className="w-8 h-8 text-primary-600" />
                                        <div className="text-left">
                                            <p className="font-semibold">{file.name}</p>
                                            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setFile(null)}
                                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-sm text-gray-500">PDF or Image (Max 10MB)</p>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,image/*"
                                        className="hidden"
                                        id="file-upload"
                                        required
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="btn-secondary mt-4 inline-block cursor-pointer"
                                    >
                                        Select File
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex-1 disabled:opacity-50"
                        >
                            {loading ? 'Uploading...' : 'Upload Resource'}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/resources')}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadResource;
