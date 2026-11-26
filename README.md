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

In many colleges, placement-related information is shared through different channels, which makes it difficult for students to keep track of job opportunities and application updates. CareerBridge aims to provide a common platform where these activities can be managed in an organized manner.

The portal is planned to provide separate interfaces for students, recruiters, and Training & Placement Officers (TPO). Each user will have access to features according to their role.

The current implementation focuses on developing the frontend interface of the application using React.js, Vite, JavaScript, and CSS3.

## 2. Problem Statement

Campus placement activities involve several tasks, such as sharing job opportunities, collecting student information, managing applications, and maintaining placement records.

When these activities are handled manually or through multiple platforms, it can lead to problems such as:

- Students may miss important placement and internship opportunities.
- Managing multiple job applications becomes difficult.
- Student academic and professional information is not maintained in one place.
- Recruiters may face difficulties while managing applications from different candidates.
- Placement officers need an organized way to monitor recruitment activities.

The purpose of CareerBridge is to provide a centralized platform that can help manage these activities more efficiently.

## 3. Objectives

The main objectives of this project are:

1. To develop a common platform for campus recruitment activities.
2. To make job and internship opportunities easily accessible to students.
3. To provide a structured way to maintain student profiles and resumes.
4. To help recruiters manage job openings and candidate applications.
5. To assist TPOs in managing placement-related information.
6. To create a simple and responsive user interface.
7. To reduce the difficulties involved in managing placement activities manually.

## 4. Main Platform Features

The platform is divided into the following major modules.

### A. Student Module

- Student registration and login.
- Personal and academic profile management.
- Resume upload and management.
- Browse available jobs and internships.
- Apply for suitable opportunities.
- Check application status.

### B. Recruiter Module

- Recruiter registration and login.
- Company profile management.
- Post new job opportunities.
- Manage job openings.
- View candidate applications.
- Search and shortlist candidates.

### C. TPO / Admin Module

- View placement-related information.
- Manage student records.
- Monitor recruitment activities.
- Manage company and placement information.
- View placement statistics and reports.

### D. Public Website

The public website introduces the CareerBridge platform and explains its purpose and features.

The current landing page contains:

- Home / Hero Section
- Problem and Solution
- Recruitment Workflow
- Platform Features
- User Roles
- Results Overview
- Testimonials
- Frequently Asked Questions
- Call-to-Action Section

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
| Lucide React | Icons |
| Git & GitHub | Version control and collaboration |
| VS Code | Code editor |

**Backend:** Not implemented yet. It is planned for a later stage.

**Database:** Database integration has not been started yet.

## 6. User Roles & Access Matrix

The portal is designed for three main types of users.

| Module | Student | Recruiter | TPO / Admin |
|---|---|---|---|
| Manage Student Profile | Yes | No | Yes |
| Browse Job Opportunities | Yes | No | Yes |
| Apply for Jobs | Yes | No | No |
| Post Job Openings | No | Yes | Yes |
| View Applications | Own Applications | Yes | Yes |
| Manage Placement Records | No | No | Yes |
| View Placement Information | Yes | Yes | Yes |

*Note: This table represents the planned responsibilities of each user role.*

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
         JavaScript
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
      Node.js + Express
              |
              v
           MongoDB
```

## 8. Project Folder Structure

The current project follows a modular folder structure to keep pages, components, styles, and other files organized.

```text
CareerBridge-Student-Recruitment-Portal/
│
├── frontend/
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
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.css
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
cd frontend
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

The frontend has been set up using React.js and Vite. The landing page is divided into reusable components so that different sections can be maintained separately.

The following work has been completed:

- Initial React and Vite project setup.
- Application routing using React Router DOM.
- Common navigation bar and footer.
- Reusable components for the landing page.
- Landing page sections for features, workflow, user roles, and FAQs.
- FAQ accordion interaction.
- Basic responsive styling.
- Placeholder pages for upcoming portal sections.

The production build has been executed successfully using `npm run build`.

## 12. Future Enhancements

The following features can be added to make the portal more useful:

- User authentication and authorization.
- Student dashboard and profile management.
- Recruiter dashboard and company management.
- TPO administration dashboard.
- Resume upload and management.
- Job posting and application system.
- Application status tracking.
- Candidate filtering and shortlisting.
- Database integration.
- Placement reports and analytics.
- Notifications for placement updates.

## 13. Project Status

The frontend development of CareerBridge is currently in progress. The initial project setup and public landing page have been developed.

The student, recruiter, and TPO portal modules are planned for further development. Backend services and database integration will also be added as the project progresses.

---

**Project Developed By**

Akash Rauniyar  
Ajeet Chaursiya

**ABES Engineering College**  
Computer Science & Engineering, CSE-11