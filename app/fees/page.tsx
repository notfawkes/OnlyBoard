'use client';

import { useState } from 'react';
import Link from 'next/link';
import { feeData } from '../data/mockData';
import type { FeeStatus } from '../types/types';
import Badge from '../components/ui/Badge';
import Icon from '../components/ui/Icon';
import StudentSidebar from '../components/StudentSidebar';

const feeStatusVariant: Record<FeeStatus, { variant: 'warning' | 'accent' | 'success'; label: string }> = {
    pending: { variant: 'warning', label: 'Pending' },
    generated: { variant: 'accent', label: 'Generated' },
    confirmed: { variant: 'success', label: 'Confirmed' },
};

export default function FeesPage() {
    const [data, setData] = useState(feeData);
    const [generating, setGenerating] = useState(false);

    const handleGenerate = async () => {
        setGenerating(true);
        await new Promise((r) => setTimeout(r, 2000));
        setData((prev) => ({
            ...prev,
            status: 'generated' as FeeStatus,
            receiptUrl: '#receipt-download',
        }));
        setGenerating(false);
    };

    const sv = feeStatusVariant[data.status];

    return (
        <StudentSidebar>
            <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-primary)' }}>
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--color-dark)' }}>
                            <Icon name="money" size={24} /> Fees
                        </h1>
                        <Badge label={sv.label} variant={sv.variant} size="md" />
                    </div>

                    {/* Info Banner */}
                    <div
                        className="rounded-lg p-4 mb-6 border-2"
                        style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            borderColor: '#3b82f6',
                        }}
                    >
                        <p className="text-sm" style={{ color: 'var(--color-dark)' }}>
                            <Icon name="info" size={16} /> Fee receipt must be generated and then confirmed by the admin office. Once confirmed, you can download the final receipt and proceed to the next stage.
                        </p>
                    </div>

                    {/* Fee Breakdown */}
                    <div
                        className="rounded-lg border-2 shadow-md mb-6 overflow-hidden"
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-dark)' }}
                    >
                        <div
                            className="px-6 py-4 border-b-2"
                            style={{ borderColor: 'var(--color-dark)' }}
                        >
                            <h2 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>
                                Fee Breakdown
                            </h2>
                        </div>

                        <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                            {data.lineItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between px-6 py-4"
                                >
                                    <span
                                        className="text-sm font-medium"
                                        style={{ color: item.isDeduction ? 'var(--status-done)' : 'var(--color-dark)' }}
                                    >
                                        {item.isDeduction ? <><Icon name="arrow-left" size={12} color="var(--status-done)" /> </> : ''}{item.label}
                                    </span>
                                    <span
                                        className="text-sm font-bold font-mono"
                                        style={{ color: item.isDeduction ? 'var(--status-done)' : 'var(--color-dark)' }}
                                    >
                                        {item.isDeduction ? '- ' : ''}₹{Math.abs(item.amount).toLocaleString('en-IN')}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Total */}
                        <div
                            className="flex items-center justify-between px-6 py-5 border-t-2"
                            style={{
                                borderColor: 'var(--color-dark)',
                                backgroundColor: 'var(--color-primary)',
                            }}
                        >
                            <span className="text-base font-bold" style={{ color: 'var(--color-dark)' }}>
                                Total Payable
                            </span>
                            <span className="text-xl font-bold font-mono" style={{ color: 'var(--color-accent)' }}>
                                ₹{data.totalAmount.toLocaleString('en-IN')}
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div
                        className="rounded-lg p-6 border-2 shadow-md mb-6"
                        style={{ backgroundColor: 'var(--color-secondary)', borderColor: 'var(--color-dark)' }}
                    >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <button
                                onClick={handleGenerate}
                                disabled={generating || data.status !== 'pending'}
                                className="px-6 py-3 rounded-md text-sm font-bold transition-all duration-300 cursor-pointer flex items-center gap-2"
                                style={{
                                    backgroundColor: data.status !== 'pending' ? 'var(--status-locked)' : generating ? 'var(--status-locked)' : 'var(--color-accent)',
                                    color: 'white',
                                    border: '2px solid var(--color-dark)',
                                    opacity: data.status !== 'pending' ? 0.6 : 1,
                                }}
                            >
                                {generating ? (
                                    <>
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Generating...
                                    </>
                                ) : data.status !== 'pending' ? (
                                    <><Icon name="check" size={14} color="white" /> Receipt Generated</>
                                ) : (
                                    'Generate Fee Receipt'
                                )}
                            </button>

                            {data.receiptUrl ? (
                                <a
                                    href={data.receiptUrl}
                                    className="px-6 py-3 rounded-md text-sm font-bold transition-all duration-200 inline-flex items-center gap-2"
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'var(--color-accent)',
                                        border: '2px solid var(--color-accent)',
                                    }}
                                >
                                    <Icon name="upload" size={14} /> Download Receipt
                                </a>
                            ) : (
                                <span
                                    className="px-6 py-3 rounded-md text-sm font-medium"
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'var(--status-locked)',
                                        border: '2px solid var(--status-locked)',
                                    }}
                                >
                                    <Icon name="upload" size={14} /> Download Receipt
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Stage Navigation */}
                    <div className="flex items-center justify-between">
                        <Link
                            href="/documents"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-medium transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                color: 'var(--color-dark)',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            <Icon name="arrow-left" size={14} /> Back to Documents
                        </Link>
                        <Link
                            href="/lms"
                            className="flex items-center gap-2 px-5 py-3 rounded-md text-sm font-bold transition-all duration-200 no-underline"
                            style={{
                                backgroundColor: 'var(--color-accent)',
                                color: 'white',
                                border: '2px solid var(--color-dark)',
                            }}
                        >
                            Next: LMS <Icon name="arrow-right" size={14} color="white" />
                        </Link>
                    </div>
                </div>
            </div>
        </StudentSidebar>
    );
}
