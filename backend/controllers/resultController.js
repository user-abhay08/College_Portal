const { Result, User } = require('../models');
const { Op } = require('sequelize');

// Calculate grade based on marks
const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
};

// Calculate GPA based on grades
const calculateGPA = (results) => {
    const gradePoints = {
        'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C': 6, 'D': 5, 'F': 0
    };

    let totalPoints = 0;
    let totalCredits = 0;

    results.forEach(result => {
        totalPoints += gradePoints[result.grade] * result.credits;
        totalCredits += result.credits;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
};

// Declare results (Admin only)
const declareResults = async (req, res) => {
    try {
        const { studentId, semester, results, academicYear } = req.body;

        // Validate student exists
        const student = await User.findByPk(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Create results for each subject
        const createdResults = await Promise.all(
            results.map(async (result) => {
                const grade = calculateGrade(result.marks);
                return await Result.create({
                    studentId,
                    semester,
                    subject: result.subject,
                    marks: result.marks,
                    grade,
                    credits: result.credits || 3,
                    academicYear
                });
            })
        );

        res.status(201).json({
            message: 'Results declared successfully',
            results: createdResults
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get student results
const getStudentResults = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { semester, academicYear } = req.query;

        const where = { studentId };
        if (semester) where.semester = parseInt(semester);
        if (academicYear) where.academicYear = academicYear;

        const results = await Result.findAll({
            where,
            order: [['semester', 'ASC'], ['subject', 'ASC']]
        });

        // Group by semester
        const groupedResults = {};
        results.forEach(result => {
            if (!groupedResults[result.semester]) {
                groupedResults[result.semester] = [];
            }
            groupedResults[result.semester].push(result);
        });

        // Calculate GPA for each semester
        const semesterGPAs = {};
        Object.keys(groupedResults).forEach(sem => {
            semesterGPAs[sem] = calculateGPA(groupedResults[sem]);
        });

        // Calculate overall GPA
        const overallGPA = calculateGPA(results);

        res.json({
            results: groupedResults,
            semesterGPAs,
            overallGPA
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get my results (for logged-in student)
const getMyResults = async (req, res) => {
    try {
        const { semester, academicYear } = req.query;

        const where = { studentId: req.user.id };
        if (semester) where.semester = parseInt(semester);
        if (academicYear) where.academicYear = academicYear;

        const results = await Result.findAll({
            where,
            order: [['semester', 'ASC'], ['subject', 'ASC']]
        });

        // Group by semester
        const groupedResults = {};
        results.forEach(result => {
            if (!groupedResults[result.semester]) {
                groupedResults[result.semester] = [];
            }
            groupedResults[result.semester].push(result);
        });

        // Calculate GPA for each semester
        const semesterGPAs = {};
        Object.keys(groupedResults).forEach(sem => {
            semesterGPAs[sem] = calculateGPA(groupedResults[sem]);
        });

        // Calculate overall GPA
        const overallGPA = calculateGPA(results);

        res.json({
            results: groupedResults,
            semesterGPAs,
            overallGPA
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    declareResults,
    getStudentResults,
    getMyResults
};
