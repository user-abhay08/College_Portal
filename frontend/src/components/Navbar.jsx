import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
    Menu, X, Sun, Moon, Search, BookOpen, User, LogOut,
    Home, FolderKanban, BarChart3, Users
} from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/resources?search=${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <nav className="glass-strong sticky top-0 z-50 shadow-lg">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            College Portal
                        </span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    {user && (
                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search resources, subjects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="input-field pl-10 pr-4"
                                />
                            </div>
                        </form>
                    )}

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        {user ? (
                            <>
                                <Link to="/" className="btn-ghost flex items-center space-x-1">
                                    <Home className="w-4 h-4" />
                                    <span>Home</span>
                                </Link>
                                <Link to="/resources" className="btn-ghost flex items-center space-x-1">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Resources</span>
                                </Link>
                                <Link to="/projects" className="btn-ghost flex items-center space-x-1">
                                    <FolderKanban className="w-4 h-4" />
                                    <span>Projects</span>
                                </Link>
                                <Link to="/results" className="btn-ghost flex items-center space-x-1">
                                    <BarChart3 className="w-4 h-4" />
                                    <span>Results</span>
                                </Link>
                                <Link to="/my-desk" className="btn-ghost flex items-center space-x-1">
                                    <Users className="w-4 h-4" />
                                    <span>My Desk</span>
                                </Link>

                                {/* Theme Toggle */}
                                <button onClick={toggleTheme} className="btn-ghost p-2">
                                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                </button>

                                {/* User Menu */}
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 btn-ghost">
                                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-semibold">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 glass-strong rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <div className="p-4 border-b border-gray-200 dark:border-dark-700">
                                            <p className="font-semibold">{user.name}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg">
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={toggleTheme} className="btn-ghost p-2">
                                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                </button>
                                <Link to="/login" className="btn-secondary">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden btn-ghost p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-2 animate-slide-down">
                        {user && (
                            <form onSubmit={handleSearch} className="mb-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search resources..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="input-field pl-10"
                                    />
                                </div>
                            </form>
                        )}
                        {user ? (
                            <>
                                <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    Home
                                </Link>
                                <Link to="/resources" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    Resources
                                </Link>
                                <Link to="/projects" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    Projects
                                </Link>
                                <Link to="/results" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    Results
                                </Link>
                                <Link to="/my-desk" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    My Desk
                                </Link>
                                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"
                                >
                                    Logout
                                </button>
                                <button
                                    onClick={toggleTheme}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg flex items-center space-x-2"
                                >
                                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    <span>Toggle Theme</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg">
                                    Login
                                </Link>
                                <button
                                    onClick={toggleTheme}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg flex items-center space-x-2"
                                >
                                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                    <span>Toggle Theme</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
