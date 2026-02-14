'use client';

import { useState } from 'react';

export default function AIAssistantButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl z-50"
            style={{
                backgroundColor: 'var(--color-accent)',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => alert('AI Assistant feature coming soon!')}
            aria-label="AI Assistant"
        >
            <span className="text-3xl">🤖</span>
        </button>
    );
}
