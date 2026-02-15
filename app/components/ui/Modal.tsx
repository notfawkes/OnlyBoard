'use client';

import { useEffect, useRef } from 'react';
import Icon from './Icon';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={(e) => {
                if (e.target === overlayRef.current) onClose();
            }}
        >
            <div
                className="rounded-lg w-full max-w-lg shadow-2xl animate-in"
                style={{
                    backgroundColor: 'var(--color-primary)',
                    border: '2px solid var(--color-dark)',
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between p-5 border-b-2"
                    style={{ borderColor: 'var(--color-dark)' }}
                >
                    <h3 className="text-lg font-bold" style={{ color: 'var(--color-dark)' }}>
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold transition-colors duration-200 cursor-pointer"
                        style={{
                            color: 'var(--color-dark)',
                            backgroundColor: 'var(--color-secondary)',
                        }}
                    >
                        <Icon name="close" size={16} color="var(--color-dark)" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">{children}</div>
            </div>
        </div>
    );
}
