"use client";

import { Step } from '../types/dashboard';
import { HoverButton } from './HoverButton';

interface TextProgressStepperProps {
    steps: Step[];
}

export default function TextProgressStepper({ steps }: TextProgressStepperProps) {
    const getStatusStyle = (status: Step['status']) => {
        switch (status) {
            case 'done':
                return {
                    color: 'var(--status-done)',
                    border: '2px solid var(--status-done)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)'
                };
            case 'in-progress':
                return {
                    color: 'var(--color-accent)',
                    border: '2px solid var(--color-accent)',
                    backgroundColor: 'rgba(255, 109, 31, 0.1)'
                };
            case 'locked':
                return {
                    color: 'var(--status-locked)',
                    border: '2px solid var(--status-locked)',
                    backgroundColor: 'rgba(156, 163, 175, 0.1)'
                };
        }
    };

    return (
        <div className="flex items-center justify-center gap-4 flex-wrap">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4">
                    <HoverButton
                        className="transition-all duration-300 hover:scale-110 text-lg font-semibold px-8 py-3"
                        style={getStatusStyle(step.status)}
                    >
                        {step.label}
                    </HoverButton>

                    {index < steps.length - 1 && (
                        <span
                            className="text-2xl font-bold"
                            style={{ color: 'var(--color-dark)' }}
                        >
                            →
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
