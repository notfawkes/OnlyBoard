'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Icon from './ui/Icon';
import type { IconName } from './ui/Icon';
import { useApp } from '../context/AppContext';
import type { AdminStudentStatus } from '../types/types';
import AIAssistantButton from './AIAssistantButton';

interface NavItem {
    id: string;
    label: string;
    icon: IconName;
    href: string;
    stageKey?: string; // maps to AdminStudentStatus
}

const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'users', href: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: 'user', href: '/profile', stageKey: 'profile' },
    { id: 'documents', label: 'Documents', icon: 'document', href: '/documents', stageKey: 'documents' },
    { id: 'fees', label: 'Fees', icon: 'money', href: '/fees', stageKey: 'fees' },
    { id: 'lms', label: 'LMS', icon: 'graduation', href: '/lms', stageKey: 'lms' },
];

// Order of stages for comparison
const stageOrder: AdminStudentStatus[] = ['profile', 'documents', 'fees', 'lms', 'completed'];

function getStepStatus(navStageKey: string | undefined, currentStage: AdminStudentStatus): 'done' | 'in-progress' | 'locked' {
    if (!navStageKey) return 'done'; // dashboard always accessible
    const navIndex = stageOrder.indexOf(navStageKey as AdminStudentStatus);
    const currentIndex = stageOrder.indexOf(currentStage);
    if (navIndex < currentIndex) return 'done';
    if (navIndex === currentIndex) return 'in-progress';
    return 'locked';
}

export default function StudentSidebar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { currentUser, students, logout } = useApp();

    // Find student data from context
    const student = students.find((s) => s.id === currentUser?.id);
    const currentStage = student?.stage || 'profile';
    const userName = currentUser?.name || 'Student';
    const userUid = currentUser?.uid || '';

    const getStatusIndicator = (status: string) => {
        switch (status) {
            case 'done':
                return <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-done)' }} />;
            case 'in-progress':
                return <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />;
            case 'locked':
                return <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-locked)' }} />;
            default:
                return null;
        }
    };

    const stageLabelMap: Record<string, string> = {
        profile: 'Profile',
        documents: 'Documents',
        fees: 'Fees',
        lms: 'LMS',
        completed: 'Completed',
    };

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-primary)' }}>
            {/* Sidebar */}
            <aside
                className="w-64 flex flex-col border-r-2 flex-shrink-0"
                style={{
                    backgroundColor: '#F2EBD9',
                    borderColor: 'var(--color-dark)',
                }}
            >
                {/* Logo */}
                <div className="p-6">
                    <Link href="/dashboard">
                        <Image
                            src="/logo/logo_dark_full.png"
                            alt="OnBoard Logo"
                            width={180}
                            height={50}
                            className="object-contain"
                        />
                    </Link>
                    <p className="mt-2 text-xs font-medium" style={{ color: 'var(--status-locked)' }}>
                        Stage: <span style={{ color: 'var(--color-accent)' }}>{stageLabelMap[currentStage] || currentStage}</span>
                    </p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const status = getStepStatus(item.stageKey, currentStage);

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className="flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all duration-200 relative"
                                style={{
                                    color: isActive ? 'var(--color-accent)' : 'var(--color-dark)',
                                    backgroundColor: isActive ? 'rgba(255, 109, 31, 0.08)' : 'transparent',
                                }}
                            >
                                {/* Active indicator */}
                                {isActive && (
                                    <div
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                                        style={{ backgroundColor: 'var(--color-accent)' }}
                                    />
                                )}

                                <Icon
                                    name={item.icon}
                                    size={18}
                                    color={isActive ? 'var(--color-accent)' : 'var(--color-dark)'}
                                />
                                <span className="flex-1">{item.label}</span>
                                {getStatusIndicator(status)}
                            </Link>
                        );
                    })}
                </nav>

                {/* User + Logout */}
                <div
                    className="p-5 border-t-2"
                    style={{ borderColor: 'var(--color-dark)' }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                            }}
                        >
                            {userName.charAt(0)}
                        </div>
                        <div>
                            <p className="text-sm font-semibold" style={{ color: 'var(--color-dark)' }}>{userName}</p>
                            <p className="text-xs" style={{ color: 'var(--status-locked)' }}>{userUid}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); router.push('/login'); }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-dark)',
                            border: '1.5px solid var(--color-dark)',
                        }}
                    >
                        <Icon name="arrow-left" size={14} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                {children}
                <AIAssistantButton />
            </main>
        </div>
    );
}
