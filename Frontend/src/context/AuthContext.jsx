import { createContext, useContext, useState } from 'react';
import { loadAuthSession, saveAuthSession } from '../services/storage';
import { useApp } from './AppContext';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const { students, admins = [], registerStudentRecord, registerAdminRecord } = useApp();
  const [user, setUser] = useState(() => loadAuthSession());

  const login = ({ email, password, role, rememberMe }) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      return { success: false, message: 'Email and password are required.' };
    }

    if (role === 'admin') {
      const matchedAdmin = admins.find(
        (a) => a.email.toLowerCase() === cleanEmail && a.password === password
      );

      if (matchedAdmin) {
        const adminSession = {
          id: matchedAdmin.id,
          name: matchedAdmin.fullName,
          email: matchedAdmin.email,
          role: 'admin',
          employeeId: matchedAdmin.employeeId,
          designation: matchedAdmin.designation,
          department: matchedAdmin.department,
          rememberMe: Boolean(rememberMe),
          token: `demo-admin-jwt-${matchedAdmin.id}`,
        };
        setUser(adminSession);
        saveAuthSession(adminSession);
        return { success: true, user: adminSession };
      }

      const isFallbackAdmin =
        (cleanEmail === 'admin@careerbridge.edu' && password === 'admin123') ||
        (cleanEmail.endsWith('@careerbridge.edu') && password.length >= 6 && cleanEmail.includes('admin'));

      if (!isFallbackAdmin) {
        return {
          success: false,
          message: 'Invalid admin credentials. Try admin@careerbridge.edu / admin123 or register a new admin.',
        };
      }

      const adminSession = {
        id: 'admin-1',
        name: 'Dr. Meera Krishnan',
        email: cleanEmail,
        role: 'admin',
        designation: 'Chief Placement Officer',
        rememberMe: Boolean(rememberMe),
        token: 'demo-admin-jwt-token',
      };
      setUser(adminSession);
      saveAuthSession(adminSession);
      return { success: true, user: adminSession };
    }

    const matchedStudent = students.find(
      (s) => s.email.toLowerCase() === cleanEmail && (s.password || 'password123') === password
    );

    if (!matchedStudent) {
      return {
        success: false,
        message: 'Invalid student email or password. Try student@careerbridge.edu / password123.',
      };
    }

    const studentSession = {
      id: matchedStudent.id,
      name: matchedStudent.fullName,
      email: matchedStudent.email,
      role: 'student',
      enrollmentNumber: matchedStudent.enrollmentNumber,
      department: matchedStudent.department,
      rememberMe: Boolean(rememberMe),
      token: `demo-student-jwt-${matchedStudent.id}`,
    };
    setUser(studentSession);
    saveAuthSession(studentSession);
    return { success: true, user: studentSession };
  };

  const registerStudent = (formData) => {
    const cleanEmail = formData.email.trim().toLowerCase();
    const exists = students.some(
      (s) =>
        s.email.toLowerCase() === cleanEmail ||
        s.enrollmentNumber.toLowerCase() === formData.enrollmentNumber.trim().toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: 'A student with this email or enrollment number already exists.',
      };
    }

    const newStudent = registerStudentRecord(formData);
    const session = {
      id: newStudent.id,
      name: newStudent.fullName,
      email: newStudent.email,
      role: 'student',
      enrollmentNumber: newStudent.enrollmentNumber,
      department: newStudent.department,
      rememberMe: true,
      token: `demo-student-jwt-${newStudent.id}`,
    };
    setUser(session);
    saveAuthSession(session);
    return { success: true, user: session };
  };

  const registerAdmin = (formData) => {
    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanEmpId = formData.employeeId.trim().toUpperCase();
    const exists = admins.some(
      (a) =>
        a.email.toLowerCase() === cleanEmail ||
        a.employeeId.toUpperCase() === cleanEmpId
    );

    if (exists) {
      return {
        success: false,
        message: 'An admin with this email or employee ID already exists.',
      };
    }

    const newAdmin = registerAdminRecord(formData);
    const session = {
      id: newAdmin.id,
      name: newAdmin.fullName,
      email: newAdmin.email,
      role: 'admin',
      employeeId: newAdmin.employeeId,
      designation: newAdmin.designation,
      department: newAdmin.department,
      rememberMe: true,
      token: `demo-admin-jwt-${newAdmin.id}`,
    };
    setUser(session);
    saveAuthSession(session);
    return { success: true, user: session };
  };

  const syncAuthName = (name, email) => {
    if (!user) return;
    const updated = { ...user, name, email };
    setUser(updated);
    saveAuthSession(updated);
  };

  const logout = () => {
    setUser(null);
    saveAuthSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, registerStudent, registerAdmin, logout, syncAuthName }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export { AuthProvider, useAuth };
