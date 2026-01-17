import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="glass-strong mt-20 border-t border-gray-200 dark:border-dark-700">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 gradient-text">College Portal</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Your one-stop platform for academic resources, collaboration, and results.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/resources" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Resources</Link></li>
                            <li><Link to="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Projects</Link></li>
                            <li><Link to="/results" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Results</Link></li>
                            <li><Link to="/my-desk" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">My Desk</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Help Center</a></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Documentation</a></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-700 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center space-x-1">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>for Students</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        © 2026 College Portal. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
