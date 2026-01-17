export const branches = {
    CSE: {
        name: 'Computer Science Engineering',
        semesters: [
            {
                sem: 1,
                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Programming in C', 'Engineering Graphics', 'Basic Electrical Engineering']
            },
            {
                sem: 2,
                subjects: ['Engineering Mathematics II', 'Engineering Chemistry', 'Data Structures', 'Digital Electronics', 'Engineering Mechanics']
            },
            {
                sem: 3,
                subjects: ['Discrete Mathematics', 'Computer Organization', 'Object Oriented Programming', 'Database Management Systems', 'Software Engineering']
            },
            {
                sem: 4,
                subjects: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Theory of Computation', 'Web Technologies']
            },
            {
                sem: 5,
                subjects: ['Machine Learning', 'Compiler Design', 'Artificial Intelligence', 'Mobile Application Development', 'Cloud Computing']
            },
            {
                sem: 6,
                subjects: ['Big Data Analytics', 'Cyber Security', 'Internet of Things', 'Blockchain Technology', 'Natural Language Processing']
            },
            {
                sem: 7,
                subjects: ['Deep Learning', 'Computer Vision', 'Distributed Systems', 'DevOps', 'Elective I']
            },
            {
                sem: 8,
                subjects: ['Project', 'Seminar', 'Elective II', 'Elective III']
            }
        ]
    },
    IT: {
        name: 'Information Technology',
        semesters: [
            {
                sem: 1,
                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Programming in C', 'Engineering Graphics', 'Basic Electrical Engineering']
            },
            {
                sem: 2,
                subjects: ['Engineering Mathematics II', 'Engineering Chemistry', 'Data Structures', 'Digital Electronics', 'Communication Skills']
            },
            {
                sem: 3,
                subjects: ['Discrete Mathematics', 'Computer Organization', 'Object Oriented Programming', 'Database Management Systems', 'Software Engineering']
            },
            {
                sem: 4,
                subjects: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Web Technologies', 'System Administration']
            }
        ]
    },
    'AI&ML': {
        name: 'Artificial Intelligence & Machine Learning',
        semesters: [
            {
                sem: 1,
                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Programming in Python', 'Engineering Graphics', 'Linear Algebra']
            },
            {
                sem: 2,
                subjects: ['Engineering Mathematics II', 'Probability & Statistics', 'Data Structures', 'Digital Electronics', 'Calculus']
            },
            {
                sem: 3,
                subjects: ['Machine Learning Fundamentals', 'Computer Vision', 'Natural Language Processing', 'Database Systems', 'Neural Networks']
            },
            {
                sem: 4,
                subjects: ['Deep Learning', 'Reinforcement Learning', 'AI Ethics', 'Big Data Analytics', 'Pattern Recognition']
            }
        ]
    },
    ECE: {
        name: 'Electronics & Communication Engineering',
        semesters: [
            {
                sem: 1,
                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electronics', 'Engineering Graphics', 'Programming in C']
            },
            {
                sem: 2,
                subjects: ['Engineering Mathematics II', 'Circuit Theory', 'Electronic Devices', 'Signals and Systems', 'Digital Electronics']
            }
        ]
    },
    MECH: {
        name: 'Mechanical Engineering',
        semesters: [
            {
                sem: 1,
                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Graphics', 'Workshop Practice', 'Engineering Mechanics']
            },
            {
                sem: 2,
                subjects: ['Engineering Mathematics II', 'Thermodynamics', 'Material Science', 'Manufacturing Processes', 'Strength of Materials']
            }
        ]
    },
    CIVIL: {
        name: 'Civil Engineering',
        semesters: [
            {
                sem: 1,
                subjects: ['Engineering Mathematics I', 'Engineering Physics', 'Engineering Graphics', 'Surveying', 'Building Materials']
            },
            {
                sem: 2,
                subjects: ['Engineering Mathematics II', 'Mechanics of Materials', 'Structural Analysis', 'Fluid Mechanics', 'Concrete Technology']
            }
        ]
    }
};

export const branchList = Object.keys(branches).map(key => ({
    code: key,
    name: branches[key].name
}));
