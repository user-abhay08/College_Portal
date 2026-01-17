# College Portal - Full-Stack Academic Resource Platform

A comprehensive full-stack college portal application inspired by NotesAdda, featuring resource management, student collaboration, result declaration, and personal workspace organization. Built with React, Node.js/Express, and MySQL.

![College Portal](https://img.shields.io/badge/College-Portal-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)

## ✨ Features

### 🎓 Core Features
- **Branch & Semester Organization**: Structured navigation for CSE, IT, AI&ML, ECE, Mechanical, and Civil branches
- **Dynamic Subject Management**: Browse resources by branch, semester, and subject
- **Global Search**: Find resources, subjects, and materials instantly
- **Cloud Storage**: Secure file uploads with Cloudinary integration
- **Dark/Light Mode**: Fully responsive theme switching with modern glassmorphism design

### 🛠 My Desk Workspace
- **Folder Organization**: Create and manage personal folders
- **File Management**: Upload and organize your study materials
- **Persistent Layout**: Your workspace is saved and synced

### 📊 Result Score Declaration (New Feature)
- **Semester Results**: View detailed semester-wise results
- **GPA Calculation**: Automatic GPA computation per semester and overall
- **Grade Visualization**: Clear display of marks, grades, and credits
- **Admin Declaration**: Admins can declare results for students

### 🤝 Project Collaboration (New Feature)
- **Create Projects**: Start new project collaborations
- **Team Management**: Invite and manage team members
- **Resource Sharing**: Upload and share project-related files
- **Status Tracking**: Track project progress (Planning, In-Progress, Completed, On-Hold)
- **Project Dashboard**: Detailed view of members and resources

### 👤 User Profiles
- **Profile Cards**: Academic details, year of study, and bio
- **Contribution Tracking**: Track uploaded resources
- **Avatar Support**: Personalized profile pictures
- **Edit Profile**: Update your information anytime

## 🏗 Tech Stack

### Frontend
- **React.js** (Vite) - Fast and modern development
- **Tailwind CSS** - Utility-first styling with custom design system
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API calls
- **React Router DOM** - Client-side routing

### Backend
- **Node.js & Express.js** - RESTful API server
- **MySQL** - Relational database
- **Sequelize** - ORM for MySQL
- **JWT** - Secure authentication
- **Cloudinary** - Cloud file storage
- **Bcrypt** - Password hashing

## 📂 Project Structure

```
College_Portal/
├── backend/
│   ├── config/
│   │   ├── database.js          # MySQL/Sequelize configuration
│   │   └── cloudinary.js        # Cloudinary setup
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── resourceController.js
│   │   ├── resultController.js
│   │   ├── projectController.js
│   │   └── deskController.js
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── adminAuth.js         # Admin authorization
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Resource.js
│   │   ├── Result.js
│   │   ├── Project.js
│   │   ├── ProjectResource.js
│   │   ├── MyDesk.js
│   │   └── index.js             # Model associations
│   ├── routes/
│   │   ├── auth.js
│   │   ├── resources.js
│   │   ├── results.js
│   │   ├── projects.js
│   │   └── desk.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                # Entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Navigation with search
    │   │   ├── Footer.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   ├── ThemeContext.jsx  # Dark/Light mode
    │   │   └── AuthContext.jsx   # Authentication state
    │   ├── data/
    │   │   └── branches.js       # Branch/subject data
    │   ├── services/
    │   │   ├── api.js            # Axios instance
    │   │   ├── authService.js
    │   │   ├── resourceService.js
    │   │   ├── resultService.js
    │   │   ├── projectService.js
    │   │   └── deskService.js
    │   ├── views/
    │   │   ├── Home.jsx          # Landing page
    │   │   ├── Login.jsx         # Auth page
    │   │   ├── Resources.jsx
    │   │   ├── UploadResource.jsx
    │   │   ├── Projects.jsx
    │   │   ├── ProjectDetails.jsx
    │   │   ├── Results.jsx
    │   │   ├── MyDesk.jsx
    │   │   └── Profile.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css             # Global styles
    ├── index.html
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- Cloudinary Account (for file uploads)

### 1. Clone the Repository
```bash
cd /home/abhay/Documents/College_Portal
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=college_portal
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

Create the MySQL database:
```bash
mysql -u root -p
CREATE DATABASE college_portal;
EXIT;
```

Start the backend server:
```bash
npm start
# or for development with auto-restart
npm run dev
```

The backend will run on `http://localhost:5000` and automatically create database tables.

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and visit: **http://localhost:5173**

## 🎨 Design Features

### Modern Aesthetics
- **Glassmorphism Effects**: Frosted glass UI components
- **Gradient Designs**: Vibrant color gradients throughout
- **Smooth Animations**: Fade-in, slide-up, and scale animations
- **Dark Mode**: Complete dark theme support
- **Responsive**: Works on desktop, tablet, and mobile

### Color Palette
- Primary: Blue-Purple gradient (#667eea to #764ba2)
- Success: Green shades
- Warning: Yellow/Orange shades
- Error: Red shades
- Dark Mode: Custom dark color system

## 🔐 Authentication

### User Registration
- Name, Email, Password
- Branch selection (CSE, IT, AI&ML, etc.)
- Year and Semester selection
- Automatic JWT token generation

### User Types
- **Student**: Can upload resources, create projects, view results
- **Admin**: Can declare results + all student features

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)
- `PUT /api/auth/profile` - Update profile (Protected)

### Resources
- `GET /api/resources` - Get all resources (with filters)
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Upload resource (Protected)
- `PUT /api/resources/:id/like` - Like resource (Protected)
- `PUT /api/resources/:id/dislike` - Dislike resource (Protected)
- `DELETE /api/resources/:id` - Delete resource (Protected)

### Results
- `GET /api/results/my-results` - Get my results (Protected)
- `GET /api/results/student/:id` - Get student results (Protected)
- `POST /api/results` - Declare results (Admin only)

### Projects
- `GET /api/projects` - Get all projects (Protected)
- `GET /api/projects/:id` - Get project details (Protected)
- `POST /api/projects` - Create project (Protected)
- `PUT /api/projects/:id` - Update project (Protected)
- `POST /api/projects/:id/members` - Add member (Protected)
- `POST /api/projects/:id/resources` - Upload project resource (Protected)

### My Desk
- `GET /api/desk` - Get user's desk (Protected)
- `PUT /api/desk` - Update desk layout (Protected)

## 🚀 Usage Guide

### For Students

1. **Register/Login**: Create an account with your college email
2. **Browse Resources**: Navigate by branch → semester → subject
3. **Upload Materials**: Share your notes with peers
4. **View Results**: Check semester results and GPA
5. **Join Projects**: Collaborate with classmates on projects
6. **Organize MyDesk**: Create folders and manage personal files

### For Admins

1. **Login as Admin**: Use admin credentials
2. **Declare Results**: Upload semester results for students
3. **Manage Resources**: Monitor and moderate uploaded content
4. **All Student Features**: Plus administrative capabilities

## 🌟 Key Differentiators from Reference

### ✅ Switched to MySQL
- Using MySQL instead of MongoDB
- Sequelize ORM for elegant data modeling
- Proper relational database design

### ✅ Result Score Declaration
- Complete result management system
- GPA calculation with credit hours
- Grade-based color coding
- Semester-wise and overall GPA

### ✅ Project Collaboration
- Team-based project creation
- Member invitation system
- Shared resource uploads
- Project status tracking

### ✅ Enhanced UI/UX
- Premium glassmorphism design
- Vibrant gradient color schemes
- Smooth micro-animations
- Better responsive layouts

## 🔧 Development

### Run in Development Mode

Backend (with auto-reload):
```bash
cd backend
npm run dev
```

Frontend (with hot reload):
```bash
cd frontend
npm run dev
```

### Build for Production

Frontend:
```bash
cd frontend
npm run build
```

The production-ready files will be in `frontend/dist/`

## 📝 Environment Variables

Make sure to update the `.env` file with your actual credentials:
- MySQL database credentials
- Cloudinary API keys (get from cloudinary.com)
- Strong JWT secret for production

## 🤝 Contributing

This is an academic project. Feel free to fork and enhance!

## 📄 License

MIT License - free to use for educational purposes

## 👥 Credits

- Inspired by NotesAdda by Saurabh Doiphode & Srushti Garad
- Enhanced with additional features for result declaration and collaboration
- Built for college students to simplify academic resource sharing

## 📞 Support

For issues or questions, please open an issue on the repository.

---

**Made with ❤️ for Students**
