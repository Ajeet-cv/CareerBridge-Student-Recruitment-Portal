# CareerBridge – Student Recruitment Portal

> **Tagline:** Bridging Students and Opportunities. Building Better Careers.

A centralized student recruitment platform designed to connect students, recruiters, and placement administrators through a unified digital experience.

---

## 📌 Project & Team Details

| Attribute | Details |
|---|---|
| Project ID | 95 |
| Project Title | CareerBridge – Student Recruitment Portal |
| Institution | ABES Engineering College |
| Department & Section | Computer Science & Engineering (CSE-11) |
| GitHub Repository | [CareerBridge-Student-Recruitment-Portal](https://github.com/Ajeet-cv/CareerBridge-Student-Recruitment-Portal) |

### 👥 Project Team Members

| Name | University Roll Number | Section |
|---|---|---|
| Akash Rauniyar | 2400320100120 | CSE-11 |
| Ajeet Chaursiya | 2400320100111 | CSE-11 |

---

## 📖 1. Project Introduction

**CareerBridge – Student Recruitment Portal** is a web-based platform designed to simplify and organize the campus recruitment process.

The platform aims to connect students, corporate recruiters, and Training & Placement Officers (TPO) through a centralized interface.

Students can explore career opportunities, maintain their professional profiles, and track their applications. Recruiters can manage job openings and candidates, while placement administrators can monitor recruitment activities.

The project is currently under frontend development using React.js, Vite, JavaScript, and CSS3. Backend development and database integration are planned for future phases.

## ❗ 2. Problem Statement

Traditional campus recruitment processes often involve multiple disconnected tools and manual activities, creating difficulties for students, recruiters, and placement departments.

Some common problems include:

- **Scattered Opportunities:** Students often receive job and internship information through different platforms, making opportunities difficult to track.
- **Manual Application Tracking:** Managing multiple job applications and their progress can become confusing.
- **Profile Management Difficulties:** Students need a centralized place to maintain their academic and professional information.
- **Recruitment Management:** Recruiters need an organized way to manage job openings and candidate applications.
- **Placement Monitoring:** TPOs require a centralized system to monitor recruitment activities and student placement progress.

CareerBridge aims to address these challenges through a unified student recruitment platform.

## 🎯 3. Project Objectives

1. Develop a centralized platform for campus recruitment activities.
2. Provide students with an organized interface to explore career opportunities.
3. Simplify student profile and resume management.
4. Help recruiters manage job openings and candidate applications.
5. Provide placement administrators with a centralized recruitment management interface.
6. Create a responsive and user-friendly web application.
7. Establish a foundation for future backend and database integration.

## ✨ 4. Planned Platform Features

The following modules represent the planned functionality of CareerBridge and will be implemented progressively.

### 🎓 A. Student Module

- Student registration and login.
- Student profile management.
- Academic information management.
- Resume upload and management.
- Browse job and internship opportunities.
- Apply for suitable job openings.
- Track application status.

### 🏢 B. Recruiter Module

- Recruiter registration and login.
- Company profile management.
- Create and manage job openings.
- View student applications.
- Search and filter candidates.
- Shortlist suitable applicants.

### 🏛️ C. TPO / Administrator Module

- Centralized placement dashboard.
- Student record management.
- Monitor recruitment activities.
- Manage placement-related information.
- View placement analytics.
- Generate recruitment reports.

### 🌐 D. Public Landing Page

The public-facing landing page introduces the CareerBridge platform and its major features.

Implemented sections include:

- Hero Section
- Problem vs Solution
- Recruitment Workflow
- Core Features
- Role-Based Platform Overview
- Illustrative Results Section
- Testimonials
- FAQ Accordion
- Final Call-to-Action

## 💻 5. Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js 19 | Building reusable user interface components |
| Vite 6 | Frontend development and build tool |
| JavaScript | Application logic and interactions |
| CSS3 | Styling and responsive layouts |
| React Router DOM 7 | Client-side routing |
| Lucide React | Interface icons |
| React Hooks | Managing component state and behavior |

### Backend

- Not implemented yet.
- Planned for future development.

### Database

- Not integrated yet.
- Planned for future development.

### Development Tools

- Visual Studio Code
- Git
- GitHub
- npm
- Antigravity

## 🎭 6. User Roles & Responsibilities

| User Role | Planned Responsibilities |
|---|---|
| Student | Manage profile, explore opportunities, upload resume and track applications |
| Recruiter | Manage company profile, post jobs and review candidates |
| TPO / Administrator | Monitor student recruitment activities and manage placement records |

## 🏗️ 7. Project Architecture

### Current Frontend Architecture

CareerBridge currently follows a frontend-based Single Page Application (SPA) architecture.

```text
             [ User ]
                |
                v
       [ React.js Frontend ]
                |
                v
        [ React Router DOM ]
                |
                v
       [ Reusable UI Components ]
                |
                v
        [ JavaScript + CSS3 ]
                |
                v
          [ Vite Build Tool ]
```

### Planned Future Architecture

```text
       [ React.js Frontend ]
                |
                v
       [ REST API Requests ]
                |
                v
     [ Node.js + Express.js ]
                |
                v
          [ MongoDB ]
```

The backend architecture will be introduced in future development phases.

## 📂 8. Project Folder Structure

The current repository follows a modular React + Vite frontend structure.

```text
CareerBridge-Student-Recruitment-Portal/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   │
│   │   ├── components/
│   │   │   ├── landing/
│   │   │   │   ├── FaqSection.jsx
│   │   │   │   ├── FeaturesSection.jsx
│   │   │   │   ├── FinalCta.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── ProblemSolution.jsx
│   │   │   │   ├── ResultsSection.jsx
│   │   │   │   ├── RolesSection.jsx
│   │   │   │   ├── TestimonialsSection.jsx
│   │   │   │   └── WorkflowSection.jsx
│   │   │   │
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   └── SectionHeader.jsx
│   │   │
│   │   ├── data/
│   │   │   └── homeData.js
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   └── MainLayout.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.css
│   │   │   ├── PortalPlaceholder.jsx
│   │   │   └── PortalPlaceholder.css
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Note: This structure represents the current implementation. Additional folders and components will be introduced as development progresses.*

## ⚙️ 9. Installation & Setup

### Prerequisites

- Node.js installed.
- npm installed.
- Git installed.

### 1. Clone the Repository

```bash
git clone https://github.com/Ajeet-cv/CareerBridge-Student-Recruitment-Portal.git
```

### 2. Navigate to the Project

```bash
cd CareerBridge-Student-Recruitment-Portal
```

### 3. Navigate to Frontend

```bash
cd frontend
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal to access CareerBridge.

### 6. Production Build

```bash
npm run build
```

## 🌿 10. Git Workflow

The project uses Git and GitHub for version control and collaborative development.

Development work is maintained through separate branches.

Example workflow:

```bash
# Get the latest changes
git pull origin main

# Switch to your development branch
git checkout dev_akash

# Check modified files
git status

# Add changes
git add .

# Commit changes
git commit -m "Update CareerBridge frontend"

# Push your branch
git push origin dev_akash
```

Changes can subsequently be reviewed and merged into the main branch through a Pull Request.

## 🧪 11. Current Development Progress

CareerBridge is being developed in multiple phases.

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Project Setup & Design System | Completed |
| Phase 2 | Complete Landing Page Development | Completed |
| Phase 3 | Authentication UI | Planned |
| Phase 4 | Student Dashboard | Planned |
| Phase 5 | Recruiter Dashboard | Planned |
| Phase 6 | TPO Dashboard | Planned |
| Phase 7 | Frontend Functionality & Mock Data Integration | Planned |
| Phase 8 | Final Testing & UI Improvements | Planned |

### Completed Work

**Phase 1 – Project Setup & Design System**

- React + Vite project configuration.
- React Router DOM setup.
- Reusable Navbar and Footer.
- Main application layout.
- Global CSS and design variables.
- Responsive design foundation.

**Phase 2 – Landing Page Development**

- Complete landing page with nine sections.
- Reusable landing page components.
- Responsive navigation bar and footer.
- Interactive FAQ accordion.
- Temporary opportunities and authentication placeholder routes.
- Illustrative statistics and sample testimonials.

### Verification

- Phase 1 production build completed successfully.
- Phase 2 production build completed successfully.
- Vite development server started successfully during Phase 1.
- Manual browser testing of all responsive layouts and interactions remains to be completed.

## 🚀 12. Future Scope

The project can be extended with the following capabilities:

- Backend development using Node.js and Express.js.
- Database integration using MongoDB.
- Secure authentication and role-based authorization.
- Functional student, recruiter and TPO dashboards.
- Student profile and resume management.
- Job posting and application management.
- Application status tracking.
- Candidate shortlisting and recruitment workflows.
- Placement analytics and report generation.
- Notifications and recruitment updates.

## 📌 13. Current Project Status

**Status: Frontend Development in Progress**

CareerBridge has successfully completed its initial frontend setup and landing page development.

The current application provides the foundation for a centralized student recruitment portal, with dedicated modules and interactive workflows planned for upcoming development phases.

Backend services, database connectivity, and complete recruitment functionality have not yet been implemented.

---

**Developed by:**  
Akash Rauniyar & Ajeet Chaursiya

**Project:** CareerBridge – Student Recruitment Portal

**Institution:** ABES Engineering College

**Department:** Computer Science & Engineering (CSE-11)