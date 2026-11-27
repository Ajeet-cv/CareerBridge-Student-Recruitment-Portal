import { createContext, useContext, useEffect, useState } from 'react';
import {
  getInitialData,
  loadPortalData,
  savePortalData,
} from '../services/storage';

const AppContext = createContext(null);

function nowTimestamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

function AppProvider({ children }) {
  const [data, setData] = useState(() => loadPortalData());

  useEffect(() => {
    savePortalData(data);
  }, [data]);

  const addActivity = (prev, action) => [
    { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, action, timestamp: nowTimestamp() },
    ...prev.activities.slice(0, 24),
  ];

  const pushStudentNotification = (prev, { studentId, type, title, message }) => [
    {
      id: `snot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      studentId,
      type,
      title,
      message,
      createdAt: nowTimestamp(),
      read: false,
    },
    ...prev.studentNotifications,
  ];

  const pushAdminNotification = (prev, { type, title, message }) => [
    {
      id: `anot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type,
      title,
      message,
      createdAt: nowTimestamp(),
      read: false,
    },
    ...prev.adminNotifications,
  ];

  // Student Registration & Profile CRUD
  const registerStudentRecord = (formData) => {
    const newStudent = {
      id: `stu-${Date.now()}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      phone: formData.phone.trim(),
      dob: '',
      address: '',
      enrollmentNumber: formData.enrollmentNumber.trim().toUpperCase(),
      department: formData.department,
      cgpa: 7.5,
      graduationYear: formData.graduationYear,
      backlogs: 0,
      registeredAt: todayDate(),
      resume: null,
    };

    setData((prev) => ({
      ...prev,
      students: [newStudent, ...prev.students],
      studentNotifications: pushStudentNotification(prev, {
        studentId: newStudent.id,
        type: 'company',
        title: 'Welcome to CareerBridge',
        message: 'Complete your academic profile and upload your PDF resume to unlock placement drives.',
      }),
      adminNotifications: pushAdminNotification(prev, {
        type: 'student',
        title: 'New student registered',
        message: `${newStudent.fullName} (${newStudent.enrollmentNumber} – ${newStudent.department}) joined CareerBridge.`,
      }),
      activities: addActivity(prev, `New student registered: ${newStudent.fullName} (${newStudent.enrollmentNumber})`),
    }));

    return newStudent;
  };

  // Admin Registration
  const registerAdminRecord = (formData) => {
    const newAdmin = {
      id: `admin-${Date.now()}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      employeeId: formData.employeeId.trim().toUpperCase(),
      designation: formData.designation,
      department: formData.adminDepartment || 'Training & Placement Cell',
      phone: formData.phone.trim(),
      registeredAt: todayDate(),
    };

    setData((prev) => ({
      ...prev,
      admins: [newAdmin, ...(prev.admins || [])],
      adminNotifications: pushAdminNotification(prev, {
        type: 'company',
        title: 'New placement admin added',
        message: `${newAdmin.fullName} (${newAdmin.designation}) joined the Placement Cell portal.`,
      }),
      activities: addActivity(
        prev,
        `New admin registered: ${newAdmin.fullName} (${newAdmin.employeeId})`
      ),
    }));

    return newAdmin;
  };

  const updateStudent = (studentId, updates) => {
    setData((prev) => ({
      ...prev,
      students: prev.students.map((s) => (s.id === studentId ? { ...s, ...updates } : s)),
      activities: addActivity(prev, `Updated student record for ${updates.fullName || studentId}`),
    }));
  };

  const deleteStudent = (studentId) => {
    setData((prev) => {
      const target = prev.students.find((s) => s.id === studentId);
      return {
        ...prev,
        students: prev.students.filter((s) => s.id !== studentId),
        applications: prev.applications.filter((a) => a.studentId !== studentId),
        interviews: prev.interviews.map((i) => ({
          ...i,
          studentIds: i.studentIds.filter((id) => id !== studentId),
        })),
        activities: addActivity(
          prev,
          `Deleted student record: ${target ? target.fullName : studentId}`
        ),
      };
    });
  };

  // Company CRUD
  const addCompany = (companyForm) => {
    const cleanName = companyForm.name.trim();
    const shortCode = cleanName
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 4)
      .toUpperCase();

    const newCompany = {
      id: `comp-${Date.now()}`,
      name: cleanName,
      shortCode: shortCode || 'CO',
      color: companyForm.color || '#7a1624',
      logoUrl: companyForm.logoUrl?.trim() || '',
      industry: companyForm.industry.trim(),
      location: companyForm.location.trim(),
      website: companyForm.website.trim(),
      hrContact: companyForm.hrContact.trim(),
      email: companyForm.email.trim(),
      description: companyForm.description?.trim() || `${cleanName} campus recruitment partner.`,
    };

    setData((prev) => {
      let nextNotifications = prev.studentNotifications;
      prev.students.forEach((stu) => {
        nextNotifications = [
          {
            id: `snot-${Date.now()}-${stu.id}`,
            studentId: stu.id,
            type: 'company',
            title: 'New company registered',
            message: `${newCompany.name} (${newCompany.industry}) has partnered with CareerBridge for campus hiring.`,
            createdAt: nowTimestamp(),
            read: false,
          },
          ...nextNotifications,
        ];
      });

      return {
        ...prev,
        companies: [newCompany, ...prev.companies],
        studentNotifications: nextNotifications,
        activities: addActivity(prev, `Added partner company: ${newCompany.name}`),
      };
    });
  };

  const updateCompany = (companyId, updates) => {
    setData((prev) => ({
      ...prev,
      companies: prev.companies.map((c) => (c.id === companyId ? { ...c, ...updates } : c)),
      activities: addActivity(prev, `Updated company details: ${updates.name || companyId}`),
    }));
  };

  const deleteCompany = (companyId) => {
    setData((prev) => {
      const target = prev.companies.find((c) => c.id === companyId);
      const removedJobIds = prev.jobs.filter((j) => j.companyId === companyId).map((j) => j.id);
      return {
        ...prev,
        companies: prev.companies.filter((c) => c.id !== companyId),
        jobs: prev.jobs.filter((j) => j.companyId !== companyId),
        applications: prev.applications.filter(
          (a) => a.companyId !== companyId && !removedJobIds.includes(a.jobId)
        ),
        interviews: prev.interviews.filter((i) => i.companyId !== companyId),
        activities: addActivity(prev, `Deleted company: ${target ? target.name : companyId}`),
      };
    });
  };

  // Job CRUD
  const addJob = (jobForm) => {
    const newJob = {
      id: `job-${Date.now()}`,
      companyId: jobForm.companyId,
      title: jobForm.title.trim(),
      description: jobForm.description.trim(),
      location: jobForm.location.trim(),
      packageLPA: Number(jobForm.packageLPA),
      jobType: jobForm.jobType,
      minCGPA: Number(jobForm.minCGPA),
      eligibleBranches: jobForm.eligibleBranches,
      allowedBacklogs: Number(jobForm.allowedBacklogs),
      deadline: jobForm.deadline,
      postedDate: todayDate(),
      status: jobForm.status || 'Open',
    };

    setData((prev) => {
      const comp = prev.companies.find((c) => c.id === newJob.companyId);
      let nextNotifications = prev.studentNotifications;
      if (newJob.status === 'Open') {
        prev.students.forEach((stu) => {
          nextNotifications = [
            {
              id: `snot-${Date.now()}-${stu.id}`,
              studentId: stu.id,
              type: 'job',
              title: 'New job opening',
              message: `${comp?.name || 'Partner Company'} is hiring for ${newJob.title} (${newJob.packageLPA} LPA).`,
              createdAt: nowTimestamp(),
              read: false,
            },
            ...nextNotifications,
          ];
        });
      }

      return {
        ...prev,
        jobs: [newJob, ...prev.jobs],
        studentNotifications: nextNotifications,
        activities: addActivity(prev, `Created job opening: ${newJob.title} at ${comp?.name || 'Company'}`),
      };
    });
  };

  const updateJob = (jobId, updates) => {
    setData((prev) => ({
      ...prev,
      jobs: prev.jobs.map((j) =>
        j.id === jobId
          ? {
              ...j,
              ...updates,
              packageLPA: updates.packageLPA !== undefined ? Number(updates.packageLPA) : j.packageLPA,
              minCGPA: updates.minCGPA !== undefined ? Number(updates.minCGPA) : j.minCGPA,
              allowedBacklogs:
                updates.allowedBacklogs !== undefined
                  ? Number(updates.allowedBacklogs)
                  : j.allowedBacklogs,
            }
          : j
      ),
      activities: addActivity(prev, `Updated job opening: ${updates.title || jobId}`),
    }));
  };

  const toggleJobStatus = (jobId) => {
    setData((prev) => {
      const job = prev.jobs.find((j) => j.id === jobId);
      const nextStatus = job?.status === 'Open' ? 'Closed' : 'Open';
      return {
        ...prev,
        jobs: prev.jobs.map((j) => (j.id === jobId ? { ...j, status: nextStatus } : j)),
        activities: addActivity(prev, `${nextStatus === 'Open' ? 'Published' : 'Closed'} job: ${job?.title || jobId}`),
      };
    });
  };

  const deleteJob = (jobId) => {
    setData((prev) => {
      const target = prev.jobs.find((j) => j.id === jobId);
      return {
        ...prev,
        jobs: prev.jobs.filter((j) => j.id !== jobId),
        applications: prev.applications.filter((a) => a.jobId !== jobId),
        interviews: prev.interviews.filter((i) => i.jobId !== jobId),
        activities: addActivity(prev, `Deleted job opening: ${target ? target.title : jobId}`),
      };
    });
  };

  // Applications
  const applyToJob = (studentId, jobId) => {
    const duplicate = data.applications.some(
      (a) => a.studentId === studentId && a.jobId === jobId
    );
    if (duplicate) {
      return { success: false, message: 'You have already applied for this job opening.' };
    }

    const job = data.jobs.find((j) => j.id === jobId);
    const company = data.companies.find((c) => c.id === job?.companyId);
    const student = data.students.find((s) => s.id === studentId);

    if (!job || !student) {
      return { success: false, message: 'Unable to submit application.' };
    }

    const newApp = {
      id: `app-${Date.now()}`,
      studentId,
      jobId,
      companyId: job.companyId,
      appliedDate: todayDate(),
      status: 'Applied',
    };

    setData((prev) => ({
      ...prev,
      applications: [newApp, ...prev.applications],
      studentNotifications: pushStudentNotification(prev, {
        studentId,
        type: 'application',
        title: 'Application submitted successfully',
        message: `Your application for ${job.title} at ${company?.name || 'Company'} has been submitted.`,
      }),
      adminNotifications: pushAdminNotification(prev, {
        type: 'application',
        title: 'New job application received',
        message: `${student.fullName} applied for ${job.title} at ${company?.name || 'Company'}.`,
      }),
      activities: addActivity(
        prev,
        `${student.fullName} applied to ${company?.name || ''} – ${job.title}`
      ),
    }));

    return { success: true };
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setData((prev) => {
      const app = prev.applications.find((a) => a.id === applicationId);
      if (!app) return prev;
      const job = prev.jobs.find((j) => j.id === app.jobId);
      const company = prev.companies.find((c) => c.id === app.companyId);
      const student = prev.students.find((s) => s.id === app.studentId);

      const notifMap = {
        Shortlisted: {
          type: 'shortlist',
          title: 'Application shortlisted',
          message: `Great news! You were shortlisted for ${job?.title || 'Role'} at ${company?.name || 'Company'}.`,
        },
        Selected: {
          type: 'selection',
          title: 'Final selection announced',
          message: `Congratulations! You have been selected for ${job?.title || 'Role'} at ${company?.name || 'Company'} (${job?.packageLPA || ''} LPA).`,
        },
        Rejected: {
          type: 'application',
          title: 'Application status updated',
          message: `Your application for ${job?.title || 'Role'} at ${company?.name || 'Company'} was not moved forward.`,
        },
        'Interview Scheduled': {
          type: 'interview',
          title: 'Interview stage active',
          message: `Your application for ${job?.title || 'Role'} at ${company?.name || 'Company'} moved to Interview Scheduled.`,
        },
      };

      const notif = notifMap[newStatus];
      const nextStudentNotifications = notif
        ? pushStudentNotification(prev, { studentId: app.studentId, ...notif })
        : prev.studentNotifications;

      return {
        ...prev,
        applications: prev.applications.map((a) =>
          a.id === applicationId ? { ...a, status: newStatus } : a
        ),
        studentNotifications: nextStudentNotifications,
        activities: addActivity(
          prev,
          `Updated ${student?.fullName || 'student'}'s ${company?.name || ''} application to ${newStatus}`
        ),
      };
    });
  };

  // Interviews
  const scheduleInterview = (form) => {
    const newInterview = {
      id: `int-${Date.now()}`,
      companyId: form.companyId,
      jobId: form.jobId,
      studentIds: form.studentIds,
      date: form.date,
      time: form.time,
      locationOrLink: form.locationOrLink.trim(),
      instructions: form.instructions.trim(),
      status: 'Upcoming',
    };

    setData((prev) => {
      const company = prev.companies.find((c) => c.id === form.companyId);
      const job = prev.jobs.find((j) => j.id === form.jobId);

      // Move selected students' applications for this job to Interview Scheduled (unless already Selected)
      const updatedApps = prev.applications.map((app) => {
        if (
          app.jobId === form.jobId &&
          form.studentIds.includes(app.studentId) &&
          app.status !== 'Selected' &&
          app.status !== 'Rejected'
        ) {
          return { ...app, status: 'Interview Scheduled' };
        }
        return app;
      });

      let nextStudentNotifications = prev.studentNotifications;
      form.studentIds.forEach((stuId) => {
        nextStudentNotifications = [
          {
            id: `snot-${Date.now()}-${stuId}`,
            studentId: stuId,
            type: 'interview',
            title: 'Interview scheduled',
            message: `${company?.name || 'Company'} scheduled your ${job?.title || 'Job'} interview on ${form.date} at ${form.time}.`,
            createdAt: nowTimestamp(),
            read: false,
          },
          ...nextStudentNotifications,
        ];
      });

      return {
        ...prev,
        interviews: [newInterview, ...prev.interviews],
        applications: updatedApps,
        studentNotifications: nextStudentNotifications,
        activities: addActivity(
          prev,
          `Scheduled ${company?.name || ''} interview (${job?.title || ''}) for ${form.studentIds.length} student(s)`
        ),
      };
    });
  };

  const updateInterviewStatus = (interviewId, status) => {
    setData((prev) => ({
      ...prev,
      interviews: prev.interviews.map((i) => (i.id === interviewId ? { ...i, status } : i)),
      activities: addActivity(prev, `Marked interview ${interviewId} as ${status}`),
    }));
  };

  const deleteInterview = (interviewId) => {
    setData((prev) => ({
      ...prev,
      interviews: prev.interviews.filter((i) => i.id !== interviewId),
      activities: addActivity(prev, `Removed interview schedule ${interviewId}`),
    }));
  };

  // Notifications
  const markStudentNotificationRead = (notifId) => {
    setData((prev) => ({
      ...prev,
      studentNotifications: prev.studentNotifications.map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
    }));
  };

  const markAllStudentNotificationsRead = (studentId) => {
    setData((prev) => ({
      ...prev,
      studentNotifications: prev.studentNotifications.map((n) =>
        n.studentId === studentId ? { ...n, read: true } : n
      ),
    }));
  };

  const deleteStudentNotification = (notifId) => {
    setData((prev) => ({
      ...prev,
      studentNotifications: prev.studentNotifications.filter((n) => n.id !== notifId),
    }));
  };

  const markAdminNotificationRead = (notifId) => {
    setData((prev) => ({
      ...prev,
      adminNotifications: prev.adminNotifications.map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
    }));
  };

  const markAllAdminNotificationsRead = () => {
    setData((prev) => ({
      ...prev,
      adminNotifications: prev.adminNotifications.map((n) => ({ ...n, read: true })),
    }));
  };

  const deleteAdminNotification = (notifId) => {
    setData((prev) => ({
      ...prev,
      adminNotifications: prev.adminNotifications.filter((n) => n.id !== notifId),
    }));
  };

  const resetDemoData = () => {
    const fresh = getInitialData();
    setData(fresh);
  };

  return (
    <AppContext.Provider
      value={{
        ...data,
        registerStudentRecord,
        registerAdminRecord,
        updateStudent,
        deleteStudent,
        addCompany,
        updateCompany,
        deleteCompany,
        addJob,
        updateJob,
        toggleJobStatus,
        deleteJob,
        applyToJob,
        updateApplicationStatus,
        scheduleInterview,
        updateInterviewStatus,
        deleteInterview,
        markStudentNotificationRead,
        markAllStudentNotificationsRead,
        deleteStudentNotification,
        markAdminNotificationRead,
        markAllAdminNotificationsRead,
        deleteAdminNotification,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

export { AppProvider, useApp };
