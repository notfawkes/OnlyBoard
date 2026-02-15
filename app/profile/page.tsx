'use client';

import { useState } from 'react';
import Link from 'next/link';
import { profileData } from '../data/mockData';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import StudentSidebar from '../components/StudentSidebar';

export default function ProfilePage() {
    const { currentStage, admissionDetails, contactInfo: initialContact } = profileData;
    const [contact, setContact] = useState(initialContact);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        await new Promise((r) => setTimeout(r, 1200));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <StudentSidebar>
            <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold" style={{ color: 'var(--color-dark)' }}>
                            My Profile
                        </h1>
                        <Badge label={`Stage: ${currentStage}`} variant="warning" size="md" />
                    </div>

                    {/* Stage Banner */}
                    <div
                        className="rounded-lg p-4 mb-8 border-2"
                        style={{
                            backgroundColor: 'rgba(255, 109, 31, 0.08)',
                            borderColor: 'var(--color-accent)',
                        }}
                    >
                        <p className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                            <span className="flex items-center gap-2"><Icon name="clipboard" size={16} /> You are currently in the <strong>{currentStage}</strong> stage. Complete all required actions to proceed.</span>
                        </p>
                    </div>

                    {/* Admission Details - Read Only */}
                    <div
                        className="rounded-lg p-6 mb-6 border-2 shadow-md"
                        style={{
                            backgroundColor: 'var(--color-secondary)',
                            borderColor: 'var(--color-dark)',
                        }}
                    >
                        <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--color-dark)' }}>
                            Admission Details
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: 'CET Score', value: admissionDetails.cetScore },
                                { label: 'Percentile', value: `${admissionDetails.percentile}%` },
                                { label: 'Category', value: admissionDetails.category },
                                { label: 'Branch', value: admissionDetails.branch },
                            ].map((item) => (
                                <div key={item.label}>
                                    <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                                        {item.label}
                                    </label>
                                    <div
                                        className="px-4 py-3 rounded-md text-sm font-medium"
                                        style={{
                                            backgroundColor: 'var(--color-primary)',
                                            color: 'var(--color-dark)',
                                            border: '2px solid var(--status-locked)',
                                        }}
                                    >
                                        {item.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information - Editable */}
                    <div
                        className="rounded-lg p-6 mb-6 border-2 shadow-md"
                        style={{
                            backgroundColor: 'var(--color-secondary)',
                            borderColor: 'var(--color-dark)',
                        }}
                    >
                        <h2 className="text-lg font-bold mb-5" style={{ color: 'var(--color-dark)' }}>
                            Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={contact.phone}
                                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200"
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        border: '2px solid var(--color-dark)',
                                        color: 'var(--color-dark)',
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={contact.email}
                                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200"
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        border: '2px solid var(--color-dark)',
                                        color: 'var(--color-dark)',
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-accent)' }}>
                                    Address
                                </label>
                                <textarea
                                    value={contact.address}
                                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200 resize-none"
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        border: '2px solid var(--color-dark)',
                                        color: 'var(--color-dark)',
                                    }}
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-6 flex items-center gap-4">
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-3 rounded-md text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2"
                                style={{
                                    backgroundColor: saving ? 'var(--status-locked)' : 'var(--color-accent)',
                                    color: 'white',
                                    border: '2px solid var(--color-dark)',
                                }}
                            >
                                {saving ? (
                                    <>
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save Changes'
                                )}
                            </button>
                            {saved && (
                                <span className="text-sm font-semibold" style={{ color: 'var(--status-done)' }}>
                                    <Icon name="check" size={14} color="var(--status-done)" /> Changes saved successfully
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stage Navigation */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                color: 'var(--color-dark)',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            <Icon name="arrow-left" size={14} /> Back to Dashboard
                        </Link>
                        <Link
                            href="/documents"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            Next: Documents <Icon name="arrow-right" size={14} color="white" />
                        </Link>
                    </div>
                </div>
            </div>
        </StudentSidebar>
    );
}
