import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Mail, Lock, User, GraduationCap } from 'lucide-react';
import { branchList } from '../data/branches';

const Login = () => {
    const { user, login, register } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        branch: '',
        year: '',
        semester: ''
    });

    if (user) {
        return <Navigate to="/" replace />;
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password });
            } else {
                await register(formData);
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-4 animate-scale-in">
                        <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold gradient-text mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isLogin ? 'Sign in to continue' : 'Join the academic community'}
                    </p>
                </div>

                {/* Form */}
                <div className="glass-card animate-slide-up">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold mb-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input-field pl-10"
                                        placeholder="Enter your name"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="your.email@college.edu"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Branch</label>
                                    <div className="relative">
                                        <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <select
                                            name="branch"
                                            value={formData.branch}
                                            onChange={handleChange}
                                            className="input-field pl-10"
                                            required={!isLogin}
                                        >
                                            <option value="">Select Branch</option>
                                            {branchList.map(branch => (
                                                <option key={branch.code} value={branch.code}>
                                                    {branch.code} - {branch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Year</label>
                                        <select
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            className="input-field"
                                            required={!isLogin}
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
                                            name="semester"
                                            value={formData.semester}
                                            onChange={handleChange}
                                            className="input-field"
                                            required={!isLogin}
                                        >
                                            <option value="">Sem</option>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                                <option key={sem} value={sem}>{sem}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-semibold"
                        >
                            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
