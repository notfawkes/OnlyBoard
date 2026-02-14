import { Task } from '../types/dashboard';

interface PendingTasksCardProps {
    tasks: Task[];
}

export default function PendingTasksCard({ tasks }: PendingTasksCardProps) {
    return (
        <div
            className="rounded-lg p-6 shadow-md border-2 transition-all duration-300 hover:shadow-lg"
            style={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-accent)'
            }}
        >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
                Pending Tasks
            </h3>
            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:translate-x-1"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: 'var(--color-accent)' }}
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                            {task.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
