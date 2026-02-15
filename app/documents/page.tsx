'use client';

import { useState } from 'react';
import Link from 'next/link';
import { documentsData } from '../data/mockData';
import type { DocumentItem, DocumentStatus } from '../types/types';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import Icon from '../components/ui/Icon';
import StudentSidebar from '../components/StudentSidebar';

const statusVariant: Record<DocumentStatus, { variant: 'success' | 'warning' | 'error' | 'neutral'; label: string }> = {
    verified: { variant: 'success', label: 'Verified' },
    uploaded: { variant: 'info' as 'warning', label: 'Uploaded' },
    pending: { variant: 'warning', label: 'Pending' },
    rejected: { variant: 'error', label: 'Rejected' },
};

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<DocumentItem[]>(documentsData);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [uploadModal, setUploadModal] = useState<{ open: boolean; docId: string | null }>({ open: false, docId: null });
    const [uploading, setUploading] = useState(false);

    const verifiedCount = documents.filter((d) => d.status === 'verified').length;
    const totalCount = documents.length;
    const progressPercent = (verifiedCount / totalCount) * 100;

    const handleUpload = async () => {
        if (!uploadModal.docId) return;
        setUploading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setDocuments((prev) =>
            prev.map((d) =>
                d.id === uploadModal.docId ? { ...d, status: 'uploaded' as DocumentStatus, fileName: 'uploaded_file.pdf' } : d
            )
        );
        setUploading(false);
        setUploadModal({ open: false, docId: null });
    };

    return (
        <StudentSidebar>
            <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--color-dark)' }}>
                            <Icon name="document" size={24} /> Documents
                        </h1>
                        <Badge label="Stage: Documents" variant="warning" size="md" />
                    </div>

                    {/* Progress Bar */}
                    <div
                        className="rounded-lg p-5 mb-6 border-2 shadow-md"
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-dark)' }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>
                                Document Verification Progress
                            </h2>
                            <span className="text-sm font-bold" style={{ color: 'var(--color-accent)' }}>
                                {verifiedCount}/{totalCount} Verified
                            </span>
                        </div>
                        <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                    width: `${progressPercent}%`,
                                    backgroundColor: progressPercent === 100 ? 'var(--status-done)' : 'var(--color-accent)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Info banner */}
                    {verifiedCount < totalCount && (
                        <div
                            className="rounded-lg p-4 mb-6 border-2"
                            style={{
                                backgroundColor: 'rgba(245, 158, 11, 0.08)',
                                borderColor: 'var(--status-in-progress)',
                            }}
                        >
                            <p className="text-sm" style={{ color: 'var(--color-dark)' }}>
                                <Icon name="warning" size={16} color="var(--color-accent)" /> All documents must be verified before you can proceed to the <strong>Fees</strong> stage.
                            </p>
                        </div>
                    )}

                    {/* Documents Table */}
                    <div
                        className="rounded-lg border-2 shadow-md overflow-hidden mb-6"
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-dark)' }}
                    >
                        {/* Table Header */}
                        <div
                            className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2"
                            style={{ color: 'var(--color-accent)', borderColor: 'var(--color-dark)' }}
                        >
                            <div className="col-span-4">Document</div>
                            <div className="col-span-3">Requirement</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-3 text-right">Action</div>
                        </div>

                        {/* Table Rows */}
                        {documents.map((doc) => {
                            const sv = statusVariant[doc.status];
                            const isExpanded = expandedId === doc.id;
                            return (
                                <div key={doc.id}>
                                    <div
                                        className="grid grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 cursor-pointer border-b"
                                        style={{ borderColor: 'rgba(0,0,0,0.08)' }}
                                        onClick={() => setExpandedId(isExpanded ? null : doc.id)}
                                    >
                                        <div className="col-span-4 flex items-center gap-2">
                                            <span
                                                className="text-xs transition-transform duration-200"
                                                style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', color: 'var(--color-dark)' }}
                                            >
                                                <Icon name="chevron-right" size={14} />
                                            </span>
                                            <span className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                                                {doc.name}
                                            </span>
                                        </div>
                                        <div className="col-span-3">
                                            <span className="text-sm" style={{ color: 'var(--color-dark)' }}>{doc.requirement}</span>
                                        </div>
                                        <div className="col-span-2">
                                            <Badge label={sv.label} variant={sv.variant} />
                                        </div>
                                        <div className="col-span-3 text-right">
                                            {(doc.status === 'pending' || doc.status === 'rejected') && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setUploadModal({ open: true, docId: doc.id });
                                                    }}
                                                    className="px-4 py-1.5 rounded-md text-xs font-bold transition-all duration-200 cursor-pointer"
                                                    style={{
                                                        backgroundColor: 'var(--color-accent)',
                                                        color: 'white',
                                                        border: '1.5px solid var(--color-dark)',
                                                    }}
                                                >
                                                    Upload
                                                </button>
                                            )}
                                            {doc.status === 'uploaded' && (
                                                <span className="text-xs font-medium" style={{ color: 'var(--status-in-progress)' }}>
                                                    <Icon name="document" size={14} /> {doc.fileName}
                                                </span>
                                            )}
                                            {doc.status === 'verified' && (
                                                <span className="text-xs font-medium" style={{ color: 'var(--status-done)' }}>
                                                    <Icon name="check" size={14} color="var(--status-done)" /> Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Instructions */}
                                    {isExpanded && (
                                        <div
                                            className="px-12 py-4 border-b"
                                            style={{
                                                backgroundColor: 'var(--color-primary)',
                                                borderColor: 'rgba(0,0,0,0.08)',
                                            }}
                                        >
                                            <p className="text-sm" style={{ color: 'var(--color-dark)' }}>
                                                <strong>Instructions:</strong> {doc.instructions}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Stage Navigation */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                color: 'var(--color-dark)',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            <Icon name="arrow-left" size={14} /> Back to Profile
                        </Link>
                        <Link
                            href="/fees"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            Next: Fees <Icon name="arrow-right" size={14} color="white" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            <Modal
                isOpen={uploadModal.open}
                onClose={() => setUploadModal({ open: false, docId: null })}
                title="Upload Document"
            >
                <div className="space-y-4">
                    <p className="text-sm" style={{ color: 'var(--color-dark)' }}>
                        Select a file to upload for:{' '}
                        <strong>{documents.find((d) => d.id === uploadModal.docId)?.name}</strong>
                    </p>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-2 file:text-sm file:font-bold file:cursor-pointer"
                        style={{
                            color: 'var(--color-dark)',
                        }}
                    />
                    <p className="text-xs" style={{ color: 'var(--status-locked)' }}>
                        Accepted formats: PDF, JPG, PNG (Max 5MB)
                    </p>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            onClick={() => setUploadModal({ open: false, docId: null })}
                            className="px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                border: '2px solid var(--color-dark)',
                                color: 'var(--color-dark)',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="px-4 py-2 rounded-md text-sm font-bold cursor-pointer transition-all duration-200 flex items-center gap-2"
                            style={{
                                backgroundColor: uploading ? 'var(--status-locked)' : 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            {uploading ? (
                                <>
                                    <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                'Upload'
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </StudentSidebar>
    );
}
