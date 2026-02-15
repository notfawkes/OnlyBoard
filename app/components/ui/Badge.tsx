'use client';

interface BadgeProps {
    label: string;
    variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'accent';
    size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeProps['variant'], { bg: string; color: string }> = {
    success: { bg: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-done)' },
    warning: { bg: 'rgba(245, 158, 11, 0.15)', color: 'var(--status-in-progress)' },
    error: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
    info: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
    neutral: { bg: 'rgba(156, 163, 175, 0.15)', color: 'var(--status-locked)' },
    accent: { bg: 'rgba(255, 109, 31, 0.15)', color: 'var(--color-accent)' },
};

export default function Badge({ label, variant, size = 'sm' }: BadgeProps) {
    const style = variantStyles[variant];
    return (
        <span
            className={`inline-flex items-center font-semibold rounded-full ${size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-sm'}`}
            style={{
                backgroundColor: style.bg,
                color: style.color,
                border: `1.5px solid ${style.color}`,
            }}
        >
            {label}
        </span>
    );
}
