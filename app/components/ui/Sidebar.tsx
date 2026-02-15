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
                backgroundColor: 'var(--color-dark)',
                borderColor: 'var(--color-dark)',
            }}
        >
            {/* Logo */}
            <div className="p-6 flex items-center gap-3 border-b border-gray-700">
                <Image
                    src="/logo/logo_dark_full.png"
                    alt="OnBoard Logo"
                    width={200}
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
                            className="w-full flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 cursor-pointer"
                            style={{
                                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                                color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                                borderLeft: isActive ? '4px solid white' : '4px solid transparent',
                            }}
                        >
                            <Icon name={item.icon} size={18} color={isActive ? 'white' : 'rgba(255,255,255,0.7)'} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 space-y-3">
                {onLogout && (
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-200"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.7)',
                            border: '1px solid rgba(255,255,255,0.2)',
                        }}
                    >
                        <Icon name="arrow-left" size={14} color="rgba(255,255,255,0.7)" />
                        Logout
                    </button>
                )}
                <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Admin Panel v1.0
                </p>
            </div>
        </aside>
    );
}
