import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './views/Home';
import Login from './views/Login';
import Resources from './views/Resources';
import Projects from './views/Projects';
import ProjectDetails from './views/ProjectDetails';
import Results from './views/Results';
import MyDesk from './views/MyDesk';
import Profile from './views/Profile';
import UploadResource from './views/UploadResource';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/resources"
                        element={
                            <ProtectedRoute>
                                <Resources />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/upload-resource"
                        element={
                            <ProtectedRoute>
                                <UploadResource />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/projects"
                        element={
                            <ProtectedRoute>
                                <Projects />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/projects/:id"
                        element={
                            <ProtectedRoute>
                                <ProjectDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/results"
                        element={
                            <ProtectedRoute>
                                <Results />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/my-desk"
                        element={
                            <ProtectedRoute>
                                <MyDesk />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
