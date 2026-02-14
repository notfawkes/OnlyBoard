import { Step } from '../types/dashboard';

interface ProgressStepperProps {
    steps: Step[];
}

export default function ProgressStepper({ steps }: ProgressStepperProps) {
    const getStatusColor = (status: Step['status']) => {
        switch (status) {
            case 'done':
                return 'var(--status-done)';
            case 'in-progress':
                return 'var(--status-in-progress)';
            case 'locked':
                return 'var(--status-locked)';
            default:
                return 'var(--status-locked)';
        }
    };

    return (
        <div className="flex items-center justify-center gap-2 flex-wrap">
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-sm transition-all duration-300"
                            style={{ backgroundColor: getStatusColor(step.status) }}
                        >
                            {step.status === 'done' ? '✓' : index + 1}
                        </div>
                        <span className="mt-2 text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div
                            className="w-8 h-1 mx-2 mb-6 transition-all duration-300"
                            style={{
                                backgroundColor:
                                    step.status === 'done' ? 'var(--status-done)' : 'var(--status-locked)'
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
