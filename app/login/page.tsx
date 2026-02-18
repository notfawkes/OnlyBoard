'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Icon from '../components/ui/Icon';
import { useApp } from '../context/AppContext';

type Role = 'student' | 'admin' | null;

export default function LoginPage() {
    const router = useRouter();
    const { login } = useApp();
    const [selectedRole, setSelectedRole] = useState<Role>(null);
    const [form, setForm] = useState({ identifier: '', password: '' });
    const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const validate = () => {
        const newErrors: typeof errors = {};
        if (!form.identifier.trim()) newErrors.identifier = selectedRole === 'admin' ? 'Admin ID is required' : 'Student ID or Name is required';
        if (!form.password.trim()) newErrors.password = 'Password is required';
        else if (form.password.length < 4) newErrors.password = 'Password must be at least 4 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError('');
        if (!validate()) return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 800));

        const error = login(form.identifier, form.password, selectedRole!);
        setLoading(false);

        if (error) {
            setApiError(error);
            return;
        }

        router.push(selectedRole === 'admin' ? '/admin' : '/dashboard');
    };

    // Role selection screen
    if (!selectedRole) {
        return (
            <div
                className="min-h-screen flex items-center justify-center p-4"
                style={{ backgroundColor: 'var(--color-primary)' }}
            >
                <div className="w-full max-w-lg">
                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <Image
                            src="/logo/logo_dark_full.png"
                            alt="OnBoard Logo"
                            width={260}
                            height={65}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <h1
                        className="text-xl font-bold text-center mb-2"
                        style={{ color: 'var(--color-dark)' }}
                    >
                        Welcome to the Onboarding Portal
                    </h1>
                    <p
                        className="text-sm text-center mb-10"
                        style={{ color: 'var(--status-locked)' }}
                    >
                        Select your role to continue
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Student Card */}
                        <button
                            onClick={() => setSelectedRole('student')}
                            className="rounded-lg p-8 border-2 shadow-md flex flex-col items-center gap-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                borderColor: 'var(--color-dark)',
                            }}
                        >
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--color-accent)',
                                    border: '3px solid var(--color-dark)',
                                }}
                            >
                                <Icon name="graduation" size={36} color="white" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-dark)' }}>
                                    Student
                                </h3>
                                <p className="text-xs" style={{ color: 'var(--status-locked)' }}>
                                    Access your onboarding dashboard, documents, and fees
                                </p>
                            </div>
                        </button>

                        {/* Admin Card */}
                        <button
                            onClick={() => setSelectedRole('admin')}
                            className="rounded-lg p-8 border-2 shadow-md flex flex-col items-center gap-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.03] group"
                            style={{
                                backgroundColor: 'var(--color-secondary)',
                                borderColor: 'var(--color-dark)',
                            }}
                        >
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--color-dark)',
                                    border: '3px solid var(--color-dark)',
                                }}
                            >
                                <Icon name="shield" size={36} color="white" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--color-dark)' }}>
                                    Admin
                                </h3>
                                <p className="text-xs" style={{ color: 'var(--status-locked)' }}>
                                    Manage students, verify documents, and approve stages
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Login form
    const isAdmin = selectedRole === 'admin';

    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: 'var(--color-primary)' }}
        >
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image
                        src="/logo/logo_dark_full.png"
                        alt="OnBoard Logo"
                        width={220}
                        height={55}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Role badge */}
                <div className="flex justify-center mb-6">
                    <span
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
                        style={{
                            backgroundColor: isAdmin ? 'var(--color-dark)' : 'var(--color-accent)',
                            color: 'white',
                        }}
                    >
                        <Icon name={isAdmin ? 'shield' : 'graduation'} size={16} color="white" />
                        {isAdmin ? 'Admin Login' : 'Student Login'}
                    </span>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-lg p-8 border-2 shadow-lg"
                    style={{
                        backgroundColor: 'var(--color-secondary)',
                        borderColor: 'var(--color-dark)',
                    }}
                >
                    {/* API Error */}
                    {apiError && (
                        <div
                            className="rounded-md p-3 mb-5 text-sm font-medium border-2"
                            style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                                borderColor: '#ef4444',
                                color: '#ef4444',
                            }}
                        >
                            <Icon name="warning" size={14} color="#ef4444" /> {apiError}
                        </div>
                    )}

                    {/* Credentials hint */}
                    <div
                        className="rounded-md p-3 mb-5 text-xs border"
                        style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.06)',
                            borderColor: 'rgba(59, 130, 246, 0.2)',
                            color: 'var(--color-dark)',
                        }}
                    >
                        <Icon name="info" size={12} /> {isAdmin
                            ? 'Use admin / admin to login'
                            : 'Use username: Bala Sudalaimuthu /password: Bala to login'}
                    </div>

                    {/* Identifier */}
                    <div className="mb-4">
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-accent)' }}>
                            {isAdmin ? 'Admin ID' : 'Student Name / UID'}
                        </label>
                        <input
                            type="text"
                            value={form.identifier}
                            onChange={(e) => setForm({ ...form, identifier: e.target.value })}
                            placeholder={isAdmin ? 'Enter admin ID' : 'e.g. Bala Sudalaimuthu'}
                            className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                border: `2px solid ${errors.identifier ? '#ef4444' : 'var(--color-dark)'}`,
                                color: 'var(--color-dark)',
                            }}
                        />
                        {errors.identifier && (
                            <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.identifier}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-accent)' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder={isAdmin ? 'Enter admin password' : 'Your first name'}
                            className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all duration-200"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                border: `2px solid ${errors.password ? '#ef4444' : 'var(--color-dark)'}`,
                                color: 'var(--color-dark)',
                            }}
                        />
                        {errors.password && (
                            <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.password}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-md text-sm font-bold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                        style={{
                            backgroundColor: loading ? 'var(--status-locked)' : isAdmin ? 'var(--color-dark)' : 'var(--color-accent)',
                            color: 'white',
                            border: '2px solid var(--color-dark)',
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Logging in...
                            </>
                        ) : (
                            'Login'
                        )}
                    </button>

                    {/* Switch role */}
                    <div className="mt-5 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedRole(null);
                                setForm({ identifier: '', password: '' });
                                setErrors({});
                                setApiError('');
                            }}
                            className="text-xs font-medium cursor-pointer transition-colors"
                            style={{ color: 'var(--color-accent)', background: 'none', border: 'none' }}
                        >
                            ← Switch Role
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
