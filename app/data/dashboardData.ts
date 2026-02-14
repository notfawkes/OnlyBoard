import { DashboardData } from '../types/dashboard';

// Mock data - Replace with API calls when integrating with backend
export const dashboardData: DashboardData = {
    userInfo: {
        name: 'Bala',
        branch: 'AIML',
        category: 'TFWS',
        uid: '24AIMLA0628',
        currentStage: 'Documents'
    },
    steps: [
        { id: 'profile', label: 'Profile', status: 'done' },
        { id: 'documents', label: 'Documents', status: 'in-progress' },
        { id: 'fees', label: 'Fees', status: 'locked' },
        { id: 'lms', label: 'LMS', status: 'locked' },
        { id: 'completed', label: 'Completed', status: 'locked' }
    ],
    pendingTasks: [
        { id: 'task-1', title: 'Task 1' },
        { id: 'task-2', title: 'Task 2' }
    ],
    deadlines: [
        { id: 'deadline-1', date: 'Feb 17, 2026', description: 'Document Submission' },
        { id: 'deadline-2', date: 'Feb 20, 2026', description: 'Fee Payment' },
        { id: 'deadline-3', date: 'Feb 25, 2026', description: 'LMS Registration' }
    ],
    notifications: [
        { id: 'notif-1', message: 'Your profile has been verified', type: 'success' },
        { id: 'notif-2', message: 'Document deadline approaching', type: 'warning' },
        { id: 'notif-3', message: 'New announcement available', type: 'info' }
    ]
};
