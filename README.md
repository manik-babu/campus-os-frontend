# 🎓 CampusOS

A comprehensive university management system designed to streamline administrative processes, enhance student engagement, and facilitate efficient communication between students, faculty, and administrators.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live URLs](#live-urls)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

CampusOS is a modern, full-stack university management system built to support the complete lifecycle of student academic journey. From admissions and enrollment to course management, attendance tracking, result publishing, and payment processing, CampusOS provides a unified platform for educational institutions.

The system is designed with scalability, security, and user experience in mind, serving students, faculty members, and administrative staff across the institution.

---

## 🌐 Live URLs

- **Production**: [https://uttarauniversity.vercel.app](https://uttarauniversity.vercel.app)

---

## ✨ Features

### Student Management
- **Student Profiles**: Comprehensive student information management
- **Enrollment**: Easy course enrollment and management
- **Attendance Tracking**: Real-time attendance monitoring
- **Results & Grades**: Transparent grade publishing and transcript access
- **Payment Processing**: Integrated payment system for fees

### Academic Management
- **Course Management**: Create and manage course offerings
- **Program Management**: Organize programs by levels and departments
- **Faculty Assignment**: Assign faculty members to courses
- **Course Posts**: Faculty can share course materials and announcements

### Administrative Features
- **Admission Forms**: Streamlined admission process with form submissions
- **User Management**: Role-based access control (Students, Faculty, Admin)
- **Faculty Profiles**: Comprehensive faculty information management
- **Graduation Tracking**: Monitor graduation progress and status

### Communication
- **Announcements**: Faculty can post course-specific announcements
- **Campus Updates**: Keep students informed with important notices

### Data Management
- **Image Management**: Support for student and faculty profile images
- **Document Storage**: Secure storage for academic documents
- **Data Export**: Export academic records in multiple formats

---

## 🛠️ Technologies Used

### Frontend
- **Next.js 14** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Zod** - TypeScript-first schema validation
- **Zustand** - State management
- **Axios** - HTTP client

### DevOps & Tools
- **Vercel** - Frontend deployment platform
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformation
- **Git** - Version control

---

## 🚀 Setup Instructions

### Prerequisites
- npm or yarn package manager
- Git

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/manik-babu/campus-os-frontend.git
   cd campus-os-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   - Copy the environment template file (if available) or create a `.env.local` file
   - Add your API endpoints and configuration variables:
   ```env
   NODE_ENV="development"

   BACKEND_URL=backend-api-url
   FRONTEND_URL=frontend-base-url

   NEXT_PUBLIC_BACKEND_URL=backend-base-url
   NEXT_PUBLIC_FRONTEND_URL=frontend-base-url

   JWT_SECRET=your-jsonwebtoken-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

5. **Build for production**
   ```bash
   npm run build
   npm start
   # or
   yarn build
   yarn start
   ```

### Project Structure
- `/src/app` - Next.js app directory with page layouts
- `/src/components` - Reusable React components
- `/src/services` - API service layer
- `/src/lib` - Utility functions and helpers
- `/src/@types` - TypeScript type definitions
- `/src/zod` - Zod validation schemas
- `/src/zustand` - Zustand store definitions

### Code Quality
- Run ESLint: `npm run lint`
- Format code: `npm run format` (if configured)

---

**Built with ❤️ for educational excellence**