'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { AdminStudent, AdminStudentStatus, FeeStatus } from '../types/types';
import Badge from '../components/ui/Badge';
import Sidebar from '../components/ui/Sidebar';
import Icon from '../components/ui/Icon';
import type { IconName } from '../components/ui/Icon';
import { useApp } from '../context/AppContext';

const sidebarItems: { id: string; label: string; icon: IconName }[] = [
    { id: 'students', label: 'Students', icon: 'users' },
    { id: 'knowledge', label: 'Knowledge Base', icon: 'book' }
];

const stageVariant: Record<AdminStudentStatus, { variant: 'success' | 'warning' | 'accent' | 'info' | 'neutral'; label: string }> = {
    profile: { variant: 'info', label: 'Profile' },
    documents: { variant: 'warning', label: 'Documents' },
    fees: { variant: 'accent', label: 'Fees' },
    lms: { variant: 'info', label: 'LMS' },
    completed: { variant: 'success', label: 'Completed' },
};

const feeVariant: Record<FeeStatus, { variant: 'warning' | 'accent' | 'success'; label: string }> = {
    pending: { variant: 'warning', label: 'Pending' },
    generated: { variant: 'accent', label: 'Generated' },
    confirmed: { variant: 'success', label: 'Confirmed' },
};

export default function AdminDashboard() {
    const router = useRouter();
    const { students, approveStudent, rejectStudent, logout } = useApp();
    const [activeTab, setActiveTab] = useState('students');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState<keyof AdminStudent>('name');
    const [sortAsc, setSortAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;

    // Filter & Sort
    const filtered = students.filter(
        (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.branch.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
        const valA = String(a[sortField]);
        const valB = String(b[sortField]);
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    const totalPages = Math.ceil(sorted.length / perPage);
    const paginated = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

    const handleSort = (field: keyof AdminStudent) => {
        if (sortField === field) setSortAsc(!sortAsc);
        else { setSortField(field); setSortAsc(true); }
    };

    const handleAction = (studentId: string, action: 'approve' | 'reject') => {
        if (action === 'approve') {
            approveStudent(studentId);
        } else {
            rejectStudent(studentId);
        }
    };

    const SortIcon = ({ field }: { field: keyof AdminStudent }) => (
        <span className="ml-1 text-xs opacity-50">
            {sortField === field ? (sortAsc ? '▲' : '▼') : '↕'}
        </span>
    );

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-primary)' }}>
            <Sidebar items={sidebarItems} activeId={activeTab} onSelect={(id) => {
                if (id === 'knowledge') {
                    router.push('/admin/knowledge');
                } else {
                    setActiveTab(id);
                }
            }} onLogout={() => { logout(); router.push('/login'); }} />

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>
                            <span className="flex items-center gap-2">
                                <Icon name={sidebarItems.find((i) => i.id === activeTab)?.icon || 'users'} size={24} />
                                {sidebarItems.find((i) => i.id === activeTab)?.label}
                            </span>
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium" style={{ color: 'var(--status-locked)' }}>
                                {filtered.length} records
                            </span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by name, UID, or branch..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className="w-full max-w-md px-4 py-3 rounded-md text-sm outline-none"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                        />
                    </div>

                    {/* Data Table */}
                    <div
                        className="rounded-lg border-2 shadow-md overflow-hidden"
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-dark)' }}
                    >
                        {/* Header */}
                        <div
                            className="grid grid-cols-12 gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2"
                            style={{ color: 'var(--color-accent)', borderColor: 'var(--color-dark)' }}
                        >
                            <button className="col-span-2 text-left cursor-pointer flex items-center" onClick={() => handleSort('name')}>
                                Name <SortIcon field="name" />
                            </button>
                            <button className="col-span-2 text-left cursor-pointer flex items-center" onClick={() => handleSort('uid')}>
                                UID <SortIcon field="uid" />
                            </button>
                            <button className="col-span-1 text-left cursor-pointer flex items-center" onClick={() => handleSort('branch')}>
                                Branch <SortIcon field="branch" />
                            </button>
                            <div className="col-span-1">Category</div>
                            <div className="col-span-1">Stage</div>
                            <div className="col-span-2">Docs</div>
                            <div className="col-span-1">Fee</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        {/* Rows */}
                        {paginated.map((student) => {
                            const sv = stageVariant[student.stage];
                            const fv = feeVariant[student.feeStatus];
                            return (
                                <div
                                    key={student.id}
                                    className="grid grid-cols-12 gap-2 px-6 py-4 items-center border-b transition-colors duration-200"
                                    style={{ borderColor: 'rgba(0,0,0,0.06)' }}
                                >
                                    <div className="col-span-2 text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                                        {student.name}
                                    </div>
                                    <div className="col-span-2 text-xs font-mono" style={{ color: 'var(--color-dark)' }}>
                                        {student.uid}
                                    </div>
                                    <div className="col-span-1 text-sm" style={{ color: 'var(--color-dark)' }}>
                                        {student.branch}
                                    </div>
                                    <div className="col-span-1 text-xs" style={{ color: 'var(--color-dark)' }}>
                                        {student.category}
                                    </div>
                                    <div className="col-span-1">
                                        <Badge label={sv.label} variant={sv.variant} />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-primary)' }}>
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${(student.documentsVerified / student.totalDocuments) * 100}%`,
                                                        backgroundColor: student.documentsVerified === student.totalDocuments ? 'var(--status-done)' : 'var(--color-accent)',
                                                    }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono" style={{ color: 'var(--color-dark)' }}>
                                                {student.documentsVerified}/{student.totalDocuments}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-span-1">
                                        <Badge label={fv.label} variant={fv.variant} />
                                    </div>
                                    <div className="col-span-2 flex justify-end gap-2">
                                        {student.stage !== 'completed' && (
                                            <>
                                                <button
                                                    onClick={() => handleAction(student.id, 'approve')}
                                                    className="px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all duration-200"
                                                    style={{
                                                        backgroundColor: 'var(--status-done)',
                                                        color: 'white',
                                                        border: '1px solid var(--color-dark)',
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction(student.id, 'reject')}
                                                    className="px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all duration-200"
                                                    style={{
                                                        backgroundColor: '#ef4444',
                                                        color: 'white',
                                                        border: '1px solid var(--color-dark)',
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {student.stage === 'completed' && (
                                            <span className="text-xs font-semibold flex items-center gap-1" style={{ color: 'var(--status-done)' }}><Icon name="check" size={12} color="var(--status-done)" /> Done</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {paginated.length === 0 && (
                            <div className="px-6 py-12 text-center text-sm" style={{ color: 'var(--status-locked)' }}>
                                No students found matching your search.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1.5 rounded text-sm font-medium cursor-pointer transition-all"
                                style={{
                                    backgroundColor: currentPage === 1 ? 'var(--color-secondary)' : 'var(--color-accent)',
                                    color: currentPage === 1 ? 'var(--status-locked)' : 'white',
                                    border: '1.5px solid var(--color-dark)',
                                }}
                            >
                                <Icon name="arrow-left" size={14} /> Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className="w-8 h-8 rounded text-sm font-bold cursor-pointer transition-all"
                                    style={{
                                        backgroundColor: page === currentPage ? 'var(--color-accent)' : 'var(--color-secondary)',
                                        color: page === currentPage ? 'white' : 'var(--color-dark)',
                                        border: '1.5px solid var(--color-dark)',
                                    }}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1.5 rounded text-sm font-medium cursor-pointer transition-all"
                                style={{
                                    backgroundColor: currentPage === totalPages ? 'var(--color-secondary)' : 'var(--color-accent)',
                                    color: currentPage === totalPages ? 'var(--status-locked)' : 'white',
                                    border: '1.5px solid var(--color-dark)',
                                }}
                            >
                                Next <Icon name="arrow-right" size={14} />
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
