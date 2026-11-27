# CareerBridge – Student Recruitment Portal

**Bridging Students and Opportunities. Building Better Careers.**

CareerBridge is a web-based student recruitment portal developed to make the campus placement process more organized and accessible. It provides a common platform for students, recruiters, and placement administrators to manage recruitment-related activities.

---

## Project & Team Details

| Attribute | Details |
|---|---|
| Project ID | 95 |
| Project Title | CareerBridge – Student Recruitment Portal |
| Institution | ABES Engineering College |
| Department | Computer Science & Engineering |
| Section | CSE-11 |
| GitHub Repository | [CareerBridge-Student-Recruitment-Portal](https://github.com/Ajeet-cv/CareerBridge-Student-Recruitment-Portal) |

### Team Members

| Name | University Roll Number | Section |
|---|---|---|
| Akash Rauniyar | 2400320100120 | CSE-11 |
| Ajeet Chaursiya | 2400320100111 | CSE-11 |

---

## 1. Project Introduction

CareerBridge – Student Recruitment Portal is a platform designed to simplify the campus recruitment process by bringing students, companies, and the placement department together.

In many colleges, placement-related information is shared through different channels, which makes it difficult for students to keep track of job opportunities and application updates. CareerBridge provides a common platform where these activities can be managed in an organized manner.

The portal provides separate interfaces for Students and Training & Placement Officers (TPO / Admin), with a Recruiter portal planned for future backend integration. Each user has access to features according to their role.

The current implementation focuses on the complete frontend application using React.js, Vite, JavaScript, CSS3, React Router DOM, Axios, Lucide React, and Chart.js with LocalStorage persistence.

## 2. Problem Statement

Campus placement activities involve several tasks, such as sharing job opportunities, collecting student information, managing applications, and maintaining placement records.

When these activities are handled manually or through multiple platforms, it can lead to problems such as:

- Students may miss important placement and internship opportunities.
- Managing multiple job applications becomes difficult.
- Student academic and professional information is not maintained in one place.
- Recruiters and placement teams may face difficulties while managing applications from different candidates.
- Placement officers need an organized way to monitor recruitment activities.

The purpose of CareerBridge is to provide a centralized platform that manages these activities more efficiently.

## 3. Objectives

The main objectives of this project are:

1. To develop a common platform for campus recruitment activities.
2. To make job and internship opportunities easily accessible to students.
3. To provide a structured way to maintain student profiles and PDF resumes.
4. To automate student eligibility checks based on CGPA, branch, and backlog criteria.
5. To assist TPOs / Admins in managing companies, job openings, applications, and interviews.
6. To create a clean, responsive user interface styled around the ABES Placement Drive theme.
7. To reduce the difficulties involved in managing placement activities manually.

## 4. Main Platform Features

The platform is divided into the following major modules.

### A. Student Module

- Student registration and login.
- Personal and academic profile management (CGPA, department, graduation year, backlogs).
- PDF resume upload, preview, replacement, and removal.
- Browse available jobs and internships with search, filters, and sorting.
- Automatic eligibility checking and one-click job application with duplicate prevention.
- Track application status (`Applied`, `Shortlisted`, `Interview Scheduled`, `Selected`, `Rejected`).
- View upcoming interview schedules and manage notifications.

### B. Recruiter Module *(Planned)*

- Dedicated recruiter registration and login.
- External company profile self-management.
- Direct job posting and candidate shortlisting portal.

### C. TPO / Admin Module

- Admin login and multi-admin registration.
- Admin dashboard with live placement KPIs and Chart.js overview charts.
- Manage student records with search, department filter, pagination, edit, and delete.
- Manage companies and HR contact details.
- Manage job openings, eligibility criteria, and publish/close status.
- View and update candidate applications (Shortlist, Select, Reject) synced with student views.
- Interview scheduling with date, time, venue/meeting link, and candidate notifications.
- Placement reports and analytics (Bar, Pie, Line charts + CSV export).

### D. Public Website

The public website introduces the CareerBridge platform and explains its purpose and features.

The current landing page contains:

- Header Navigation Bar (with ABES Placement Drive logo and ABESEC Ghaziabad branding)
- Hero Section with live campus drive snapshot
- Featured Hiring Companies
- How CareerBridge Works (4-step workflow)
- Live Opportunities Preview
- Platform Impact Statistics
- Student Success Testimonials & Call-to-Action Section
- Footer with Placement Cell contact details

## 5. Technology Stack

The technologies used in the current frontend implementation are:

| Technology | Purpose |
|---|---|
| React.js | Developing the user interface |
| Vite | Frontend development and build tool |
| JavaScript | Application logic |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| React Router DOM | Navigation between pages |
| Axios | HTTP client (`http://localhost:8080/api`) prepared for backend integration |
| Chart.js & react-chartjs-2 | Placement reports and analytics charts |
| Lucide React | Icons |
| LocalStorage | Demo authentication and data persistence |
| Git & GitHub | Version control and collaboration |
| VS Code | Code editor |

**Backend:** Not implemented yet. Planned for backend API integration (`http://localhost:8080/api`).

**Database:** Database integration has not been started yet.

## 6. User Roles & Access Matrix

The portal is designed for three main types of users.

| Module | Student | Recruiter *(Planned)* | TPO / Admin |
|---|---|---|---|
| Manage Student Profile | Yes | No | Yes |
| Browse Job Opportunities | Yes | No | Yes |
| Apply for Jobs | Yes | No | No |
| Post Job Openings | No | Yes | Yes |
| View Applications | Own Applications | Yes | Yes |
| Manage Placement Records | No | No | Yes |
| View Placement Information | Yes | Yes | Yes |

*Note: Student and TPO / Admin modules are implemented in the current frontend; the standalone Recruiter module is planned for future backend integration.*

## 7. Project Architecture

The current version of CareerBridge follows a React-based Single Page Application (SPA) architecture.

### Current Frontend Architecture

```text
             User
               |
               v
        React Application
               |
               v
         React Router
               |
               v
       Application Pages
               |
               v
       Reusable Components
               |
               v
    Context & Services (JS)
               |
               v
             CSS
```

### Planned Architecture

In future development, backend services and database connectivity will be added to support the complete recruitment workflow.

```text
       React Frontend
              |
              v
          REST APIs
              |
              v
     Spring Boot Backend
              |
              v
         MySQL Database
```

## 8. Project Folder Structure

The current project follows a modular folder structure to keep pages, components, layouts, routes, services, and styles organized.

```text
CareerBridge-Student-Recruitment-Portal/
│
├── Frontend/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── abes-logo.jpg
│   │   │
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── StatusBadge.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AppContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminNotifications.jsx
│   │   │   │   ├── InterviewScheduling.jsx
│   │   │   │   ├── ManageApplications.jsx
│   │   │   │   ├── ManageCompanies.jsx
│   │   │   │   ├── ManageJobs.jsx
│   │   │   │   ├── ManageStudents.jsx
│   │   │   │   └── PlacementReports.jsx
│   │   │   └── student/
│   │   │       ├── BrowseJobs.jsx
│   │   │       ├── MyApplications.jsx
│   │   │       ├── Notifications.jsx
│   │   │       ├── StudentDashboard.jsx
│   │   │       └── StudentProfile.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── storage.js
│   │   │
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   ├── dashboard.css
│   │   │   └── global.css
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

## 9. Installation & Setup

Follow these steps to run the project on your local system.

### Prerequisites

- Node.js
- npm
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/Ajeet-cv/CareerBridge-Student-Recruitment-Portal.git
```

### Step 2: Open the Project Directory

```bash
cd CareerBridge-Student-Recruitment-Portal
```

### Step 3: Move to the Frontend Directory

```bash
cd Frontend
```

### Step 4: Install Dependencies

```bash
npm install
```

## 10. Run Commands

To start the application in development mode:

```bash
npm run dev
```

After starting the development server, open the local URL displayed in the terminal.

To create a production build:

```bash
npm run build
```

## 11. Local Development & Build Verification

The frontend has been set up using React.js and Vite with modular components, shared Context API state, and LocalStorage persistence.

The following work has been completed:

- Initial React and Vite project setup.
- Application routing and protected routes using React Router DOM.
- Common navigation bar, sidebar, dashboard layout, and footer with ABES Placement Drive branding.
- Public landing page with hero snapshot, hiring companies, workflow, opportunities preview, stats, and student testimonials.
- Student and Admin authentication (login and registration).
- Complete Student portal (Dashboard, Profile & PDF Resume, Browse Jobs with eligibility check, My Applications, Notifications).
- Complete TPO / Admin portal (Dashboard, Manage Students, Manage Companies, Manage Jobs, Manage Applications, Interview Scheduling, Placement Reports with Chart.js, Notifications).
- Responsive styling in ABES Maroon & Gold theme.

The production build has been executed successfully using `npm run build`.

## 12. Future Enhancements

The following features can be added to make the portal more useful:

- Backend REST API integration with database persistence.
- Standalone external recruiter portal.
- Email and SMS notifications for placement drives and interviews.
- AI-based resume parsing and job matching.
- Digital offer letter upload and acceptance workflow.

## 13. Project Status

The frontend implementation of CareerBridge is complete with interactive Student and TPO / Admin portals using LocalStorage for demo persistence. Backend services, database integration, and the standalone recruiter portal are planned for the next development phase.

---

**Project Developed By**

Akash Rauniyar  
Ajeet Chaursiya

**ABES Engineering College**  
Computer Science & Engineering, CSE-11
