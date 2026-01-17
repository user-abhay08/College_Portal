import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { resultService } from '../services/resultService';
import { Award, TrendingUp, BookOpen } from 'lucide-react';

const Results = () => {
    const { user } = useAuth();
    const [results, setResults] = useState({});
    const [semesterGPAs, setSemesterGPAs] = useState({});
    const [overallGPA, setOverallGPA] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const data = await resultService.getMyResults();
            setResults(data.results || {});
            setSemesterGPAs(data.semesterGPAs || {});
            setOverallGPA(data.overallGPA || 0);
        } catch (error) {
            console.error('Error fetching results:', error);
        } finally {
            setLoading(false);
        }
    };

    const getGradeColor = (grade) => {
        if (grade === 'A+' || grade === 'A') return 'text-green-600 dark:text-green-400';
        if (grade === 'B+' || grade === 'B') return 'text-blue-600 dark:text-blue-400';
        if (grade === 'C') return 'text-yellow-600 dark:text-yellow-400';
        return 'text-red-600 dark:text-red-400';
    };

    if (loading) {
        return (
            <div className="container-custom py-8">
                <div className="glass-card animate-pulse h-96"></div>
            </div>
        );
    }

    return (
        <div className="container-custom py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold gradient-text mb-2">Academic Results</h1>
                <p className="text-gray-600 dark:text-gray-400">View your exam results and GPA</p>
            </div>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="glass-card">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center text-white">
                            <Award className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Overall GPA</p>
                            <p className="text-2xl font-bold">{overallGPA}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Semesters</p>
                            <p className="text-2xl font-bold">{Object.keys(results).length}</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Total Subjects</p>
                            <p className="text-2xl font-bold">
                                {Object.values(results).reduce((acc, sem) => acc + sem.length, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Semester Results */}
            {Object.keys(results).length > 0 ? (
                <div className="space-y-6">
                    {Object.keys(results).sort((a, b) => b - a).map(semester => (
                        <div key={semester} className="glass-card">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">Semester {semester}</h2>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Semester GPA</p>
                                    <p className="text-2xl font-bold gradient-text">
                                        {semesterGPAs[semester] || 'N/A'}
                                    </p>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="border-b border-gray-200 dark:border-dark-700">
                                        <tr>
                                            <th className="text-left py-3 px-4">Subject</th>
                                            <th className="text-center py-3 px-4">Marks</th>
                                            <th className="text-center py-3 px-4">Grade</th>
                                            <th className="text-center py-3 px-4">Credits</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results[semester].map((result, idx) => (
                                            <tr key={idx} className="border-b border-gray-100 dark:border-dark-800 hover:bg-gray-50 dark:hover:bg-dark-800/50">
                                                <td className="py-3 px-4 font-medium">{result.subject}</td>
                                                <td className="py-3 px-4 text-center">{result.marks}</td>
                                                <td className={`py-3 px-4 text-center font-bold ${getGradeColor(result.grade)}`}>
                                                    {result.grade}
                                                </td>
                                                <td className="py-3 px-4 text-center">{result.credits}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="glass-card text-center py-12">
                    <Award className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-xl font-semibold mb-2">No Results Available</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Your results will appear here once they are declared
                    </p>
                </div>
            )}
        </div>
    );
};

export default Results;
