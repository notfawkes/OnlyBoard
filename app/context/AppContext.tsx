'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AdminStudent, AdminStudentStatus } from '../types/types';
import { adminStudents as initialStudents } from '../data/mockData';

// ── Types ──────────────────────────────────────────────────────────
interface CurrentUser {
    id: string;       // student id (e.g. 'stu-1') or 'admin'
    role: 'student' | 'admin';
    name: string;
    uid: string;
}

interface AppContextValue {
    students: AdminStudent[];
    currentUser: CurrentUser | null;
    login: (identifier: string, password: string, role: 'student' | 'admin') => string | null;
    logout: () => void;
    approveStudent: (studentId: string) => void;
    rejectStudent: (studentId: string) => void;
    getCurrentStudentStage: () => AdminStudentStatus | null;
}

const AppContext = createContext<AppContextValue | null>(null);

// ── Storage keys ───────────────────────────────────────────────────
// Students array lives in localStorage so ALL tabs share it
const STUDENTS_KEY = 'onboard_students';
// Session lives in sessionStorage so each tab keeps its own login
const SESSION_KEY = 'onboard_session';

function loadStudents(): AdminStudent[] {
    if (typeof window === 'undefined') return initialStudents;
    try {
        const raw = localStorage.getItem(STUDENTS_KEY);
        if (raw) return JSON.parse(raw) as AdminStudent[];
    } catch { /* ignore */ }
    return initialStudents;
}

function saveStudents(students: AdminStudent[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}

function loadSession(): CurrentUser | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) return JSON.parse(raw) as CurrentUser;
    } catch { /* ignore */ }
    return null;
}

function saveSession(user: CurrentUser | null) {
    if (typeof window === 'undefined') return;
    if (user) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
        sessionStorage.removeItem(SESSION_KEY);
    }
}

// ── Credentials ────────────────────────────────────────────────────
const ADMIN_CREDENTIALS = { identifier: 'admin', password: 'admin' };

// ── Provider ───────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
    const [students, setStudents] = useState<AdminStudent[]>(initialStudents);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
    const [hydrated, setHydrated] = useState(false);

    // Hydrate on mount
    useEffect(() => {
        setStudents(loadStudents());
        setCurrentUser(loadSession());
        setHydrated(true);
    }, []);

    // Persist students to localStorage (shared across tabs)
    useEffect(() => {
        if (!hydrated) return;
        saveStudents(students);
    }, [students, hydrated]);

    // Persist session to sessionStorage (per-tab)
    useEffect(() => {
        if (!hydrated) return;
        saveSession(currentUser);
    }, [currentUser, hydrated]);

    // ── Real-time cross-tab sync ──────────────────────────────────
    // When another tab writes to localStorage, pick up the change
    useEffect(() => {
        const handleStorage = (e: StorageEvent) => {
            if (e.key === STUDENTS_KEY && e.newValue) {
                try {
                    const updated = JSON.parse(e.newValue) as AdminStudent[];
                    setStudents(updated);
                } catch { /* ignore bad data */ }
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // ── Also refresh students from localStorage on page focus ─────
    // Covers same-tab refresh and tab switching
    useEffect(() => {
        const handleFocus = () => {
            const fresh = loadStudents();
            setStudents(fresh);
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const login = useCallback((identifier: string, password: string, role: 'student' | 'admin'): string | null => {
        const currentStudents = loadStudents(); // always read latest

        if (role === 'admin') {
            if (
                identifier.toLowerCase() === ADMIN_CREDENTIALS.identifier &&
                password === ADMIN_CREDENTIALS.password
            ) {
                setCurrentUser({ id: 'admin', role: 'admin', name: 'Admin', uid: 'admin' });
                return null;
            }
            return 'Invalid admin credentials';
        }

        // Student login — match by name or UID (case-insensitive)
        const student = currentStudents.find(
            (s) =>
                s.name.toLowerCase() === identifier.toLowerCase() ||
                s.uid.toLowerCase() === identifier.toLowerCase()
        );

        if (!student) return 'Student not found';

        // Password = first name
        const expectedPassword = student.name.split(' ')[0];
        if (password !== expectedPassword) return 'Incorrect password';

        setCurrentUser({ id: student.id, role: 'student', name: student.name, uid: student.uid });
        return null;
    }, []);

    const logout = useCallback(() => {
        setCurrentUser(null);
    }, []);

    const approveStudent = useCallback((studentId: string) => {
        setStudents((prev) =>
            prev.map((s) => {
                if (s.id !== studentId) return s;
                const nextStage: Record<AdminStudentStatus, AdminStudentStatus> = {
                    profile: 'documents',
                    documents: 'fees',
                    fees: 'lms',
                    lms: 'completed',
                    completed: 'completed',
                };
                return { ...s, stage: nextStage[s.stage] };
            })
        );
    }, []);

    const rejectStudent = useCallback((studentId: string) => {
        void studentId;
    }, []);

    const getCurrentStudentStage = useCallback((): AdminStudentStatus | null => {
        if (!currentUser || currentUser.role !== 'student') return null;
        const student = students.find((s) => s.id === currentUser.id);
        return student?.stage || null;
    }, [currentUser, students]);

    return (
        <AppContext.Provider value={{
            students,
            currentUser,
            login,
            logout,
            approveStudent,
            rejectStudent,
            getCurrentStudentStage,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp(): AppContextValue {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
    return ctx;
}
