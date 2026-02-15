'use client';

import Link from 'next/link';
import { lmsData } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import type { IconName } from '../components/ui/Icon';
import StudentSidebar from '../components/StudentSidebar';
import { useApp } from '../context/AppContext';

export default function LMSPage() {
    const { links, welcomeMessage } = lmsData;
    const { getCurrentStudentStage } = useApp();
    const stage = getCurrentStudentStage();
    // LMS is unlocked when the student has reached 'lms' or 'completed' stage
    const unlocked = stage === 'lms' || stage === 'completed';

    return (
        <StudentSidebar>
            <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--color-dark)' }}>
                            <Icon name="graduation" size={24} /> LMS Access
                        </h1>
                        <Badge
                            label={unlocked ? 'Unlocked' : 'Locked'}
                            variant={unlocked ? 'success' : 'error'}
                            size="md"
                        />
                    </div>

                    {/* Welcome */}
                    <div
                        className="rounded-lg p-6 mb-8 border-2 shadow-md"
                        style={{
                            backgroundColor: 'var(--color-secondary)',
                            borderColor: 'var(--color-dark)',
                        }}
                    >
                        <p className="text-sm" style={{ color: 'var(--color-dark)' }}>
                            {welcomeMessage}
                        </p>
                    </div>

                    {/* Lock Warning */}
                    {!unlocked && (
                        <div
                            className="rounded-lg p-4 mb-6 border-2"
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                borderColor: 'var(--status-in-progress)',
                            }}
                        >
                            <p className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                                <span className="flex items-center gap-2"><Icon name="lock" size={16} /> LMS access is locked. Complete the <strong>Fees</strong> stage to unlock your learning platforms.</span>
                            </p>
                        </div>
                    )}

                    {/* Platform Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {links.map((link) => (
                            <div
                                key={link.id}
                                className="rounded-lg border-2 shadow-md overflow-hidden relative transition-all duration-300 hover:shadow-lg"
                                style={{
                                    backgroundColor: 'var(--color-secondary)',
                                    borderColor: 'var(--color-dark)',
                                    opacity: unlocked ? 1 : 0.7,
                                }}
                            >
                                {!unlocked && (
                                    <div
                                        className="absolute inset-0 z-10 flex items-center justify-center rounded-lg"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                                    >
                                        <Icon name="lock" size={40} color="white" />
                                    </div>
                                )}

                                <div className="p-6 text-center">
                                    <Icon name={link.icon as IconName} size={48} />
                                    <h3
                                        className="text-base font-bold mt-4 mb-2"
                                        style={{ color: 'var(--color-dark)' }}
                                    >
                                        {link.platform}
                                    </h3>
                                    <p className="text-xs mb-4" style={{ color: 'var(--status-locked)' }}>
                                        {link.description}
                                    </p>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-2 rounded-md text-sm font-bold transition-all duration-200 no-underline"
                                        style={{
                                            backgroundColor: unlocked ? 'var(--color-accent)' : 'var(--status-locked)',
                                            color: 'white',
                                            border: '2px solid var(--color-dark)',
                                            pointerEvents: unlocked ? 'auto' : 'none',
                                        }}
                                    >
                                        {unlocked ? <><span>Open</span> <Icon name="arrow-right" size={14} color="white" /></> : 'Locked'}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Stage Navigation */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/fees"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                color: 'var(--color-dark)',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            <Icon name="arrow-left" size={14} /> Back to Fees
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            Back to Dashboard <Icon name="arrow-right" size={14} color="white" />
                        </Link>
                    </div>
                </div>
            </div>
        </StudentSidebar>
    );
}
