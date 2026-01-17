import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, Award, FolderKanban, Sparkles, ArrowRight, GraduationCap } from 'lucide-react';
import { branchList } from '../data/branches';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const features = [
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: 'Resource Library',
            description: 'Access notes, PDFs, and study materials organized by branch and semester',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: <FolderKanban className="w-8 h-8" />,
            title: 'Project Collaboration',
            description: 'Create and collaborate on projects with your classmates',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: <Award className="w-8 h-8" />,
            title: 'Results Portal',
            description: 'View your semester results, GPA, and academic performance',
            gradient: 'from-green-500 to-emerald-500'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'My Desk',
            description: 'Personal workspace to organize your study materials',
            gradient: 'from-orange-500 to-yellow-500'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="hero-gradient text-white py-20 md:py-32">
                <div className="container-custom text-center">
                    <div className="animate-fade-in">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center animate-scale-in">
                                <GraduationCap className="w-12 h-12" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            Your Academic Hub<br />
                            <span className="text-white/90">All in One Place</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                            Access resources, collaborate on projects, view results, and organize your studies seamlessly
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {user ? (
                                <Link
                                    to="/resources"
                                    className="btn-primary bg-white text-purple-600 hover:bg-gray-100 flex items-center space-x-2"
                                >
                                    <span>Browse Resources</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="btn-primary bg-white text-purple-600 hover:bg-gray-100 flex items-center space-x-2"
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container-custom py-20">
                <div className="text-center mb-16 animate-slide-up">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <Sparkles className="w-6 h-6 text-primary-600" />
                        <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                            Powerful Features
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        Everything you need for academic success in one beautiful platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="glass-card card-hover group"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Branches Section */}
            <section className="glass py-20">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                            Explore by Branch
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Select your branch to access specialized resources
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {branchList.map((branch, index) => (
                            <div
                                key={branch.code}
                                onClick={() => user && navigate(`/resources?branch=${branch.code}`)}
                                className="glass-card card-hover cursor-pointer"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                        {branch.code.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{branch.code}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{branch.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!user && (
                <section className="container-custom py-20">
                    <div className="glass-card text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            Join your fellow students and access a world of academic resources
                        </p>
                        <Link to="/login" className="btn-primary inline-flex items-center space-x-2">
                            <span>Create Account</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Home;
