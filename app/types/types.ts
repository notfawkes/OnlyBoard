// Shared types for all pages

// Re-export dashboard types
export type { UserInfo, Step, Task, Deadline, Notification, DashboardData } from './dashboard';

// Login
export interface LoginForm {
    studentId: string;
    password: string;
}

// Profile
export interface AdmissionDetails {
    cetScore: number;
    percentile: number;
    category: string;
    branch: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

export interface ProfileData {
    currentStage: string;
    admissionDetails: AdmissionDetails;
    contactInfo: ContactInfo;
}

// Documents
export type DocumentStatus = 'pending' | 'uploaded' | 'verified' | 'rejected';
export type RequirementType = 'Original' | 'Print' | 'Original + Print';

export interface DocumentItem {
    id: string;
    name: string;
    requirement: RequirementType;
    status: DocumentStatus;
    instructions: string;
    fileName?: string;
}

export interface DocumentsPageData {
    totalDocuments: number;
    verifiedCount: number;
    documents: DocumentItem[];
    stageLocked: boolean;
}

// Fees
export type FeeStatus = 'pending' | 'generated' | 'confirmed';

export interface FeeLineItem {
    id: string;
    label: string;
    amount: number;
    isDeduction?: boolean;
}

export interface FeeData {
    lineItems: FeeLineItem[];
    totalAmount: number;
    status: FeeStatus;
    receiptUrl?: string;
}

// LMS
export interface LMSLink {
    id: string;
    platform: string;
    icon: string;
    description: string;
    url: string;
}

export interface LMSPageData {
    links: LMSLink[];
    unlocked: boolean;
    welcomeMessage: string;
}

// AI Chat
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

// Admin
export type AdminStudentStatus = 'profile' | 'documents' | 'fees' | 'lms' | 'completed';

export interface AdminStudent {
    id: string;
    name: string;
    uid: string;
    branch: string;
    category: string;
    stage: AdminStudentStatus;
    documentsVerified: number;
    totalDocuments: number;
    feeStatus: FeeStatus;
}

// Knowledge Base
export interface KBEntry {
    id: string;
    title: string;
    category: string;
    content: string;
    lastUpdated: string;
}
