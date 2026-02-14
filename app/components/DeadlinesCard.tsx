import { Deadline } from '../types/dashboard';

interface DeadlinesCardProps {
    deadlines: Deadline[];
}

export default function DeadlinesCard({ deadlines }: DeadlinesCardProps) {
    return (
        <div
            className="rounded-lg p-6 shadow-md border-2 transition-all duration-300 hover:shadow-lg"
            style={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-accent)'
            }}
        >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
                Upcoming Deadlines
            </h3>
            <ul className="space-y-3">
                {deadlines.map((deadline) => (
                    <li
                        key={deadline.id}
                        className="p-3 rounded-md transition-all duration-200 hover:translate-x-1"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                                {deadline.date}
                            </span>
                        </div>
                        <p className="text-sm mt-1" style={{ color: 'var(--color-dark)' }}>
                            {deadline.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
