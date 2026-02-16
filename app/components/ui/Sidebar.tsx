'use client';

import Image from 'next/image';
import Icon from './Icon';
import type { IconName } from './Icon';

interface SidebarItem {
    id: string;
    label: string;
    icon: IconName;
}

interface SidebarProps {
    items: SidebarItem[];
    activeId: string;
    onSelect: (id: string) => void;
    onLogout?: () => void;
}

export default function Sidebar({ items, activeId, onSelect, onLogout }: SidebarProps) {
    return (
        <aside
            className="w-64 min-h-screen flex flex-col border-r-2"
            style={{
                backgroundColor: '#F2EBD9',
                borderColor: 'var(--color-dark)',
            }}
        >
            {/* Logo */}
            <div className="p-6 border-b-2" style={{ borderColor: 'var(--color-dark)' }}>
                <Image
                    src="/logo/logo_dark_full.png"
                    alt="OnBoard Logo"
                    width={180}
                    height={50}
                    className="object-contain"
                />
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-4">
                {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            className="w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 cursor-pointer relative"
                            style={{
                                backgroundColor: isActive ? 'rgba(255, 109, 31, 0.08)' : 'transparent',
                                color: isActive ? 'var(--color-accent)' : 'var(--color-dark)',
                            }}
                        >
                            {/* Active indicator */}
                            {isActive && (
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full"
                                    style={{ backgroundColor: 'var(--color-accent)' }}
                                />
                            )}
                            <Icon name={item.icon} size={18} color={isActive ? 'var(--color-accent)' : 'var(--color-dark)'} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-5 border-t-2" style={{ borderColor: 'var(--color-dark)' }}>
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200"
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--color-dark)',
                            border: '1.5px solid var(--color-dark)',
                        }}
                    >
                        <Icon name="arrow-left" size={14} color="var(--color-dark)" />
                        Logout
                    </button>
                )}
                <p className="mt-4 text-xs text-center font-medium" style={{ color: 'var(--status-locked)' }}>
                    Admin Panel v1.0
                </p>
            </div>
        </aside>
    );
}
