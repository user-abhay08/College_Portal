import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { User, Mail, BookOpen, Award, Edit2, Camera } from 'lucide-react';
import { branchList } from '../data/branches';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        branch: user?.branch || '',
        year: user?.year || '',
        semester: user?.semester || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await authService.updateProfile(formData);
            updateUser(data.user);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container-custom py-8 max-w-4xl">
            <div className="glass-card">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                        <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-dark-800 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">{user?.name}</h1>
                    <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
                    {user?.role === 'admin' && (
                        <span className="badge badge-warning mt-2">Admin</span>
                    )}
                </div>

                {/* Profile Info */}
                {!isEditing ? (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Profile Information</h2>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="btn-secondary flex items-center space-x-2"
                            >
                                <Edit2 className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <User className="w-5 h-5 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                        <p className="font-semibold">{user?.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="font-semibold">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <BookOpen className="w-5 h-5 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Branch</p>
                                        <p className="font-semibold">{user?.branch || 'Not set'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Award className="w-5 h-5 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                                        <p className="font-semibold">
                                            {user?.year ? `Year ${user.year}` : 'Not set'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Award className="w-5 h-5 text-primary-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Semester</p>
                                        <p className="font-semibold">
                                            {user?.semester ? `Semester ${user.semester}` : 'Not set'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {user?.bio && (
                            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Bio</p>
                                <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Full Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input-field"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Bio</label>
                            <textarea
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="input-field"
                                rows="3"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Branch</label>
                                <select
                                    value={formData.branch}
                                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">Select Branch</option>
                                    {branchList.map(branch => (
                                        <option key={branch.code} value={branch.code}>{branch.code}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Year</label>
                                <select
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">Year</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Semester</label>
                                <select
                                    value={formData.semester}
                                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                    className="input-field"
                                >
                                    <option value="">Semester</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <option key={sem} value={sem}>{sem}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button type="submit" className="btn-primary flex-1">
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Profile;
