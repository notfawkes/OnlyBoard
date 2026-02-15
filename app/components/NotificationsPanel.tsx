import { Notification } from '../types/dashboard';
import Icon from './ui/Icon';

interface NotificationsPanelProps {
    notifications: Notification[];
}

export default function NotificationsPanel({ notifications }: NotificationsPanelProps) {
    const getNotificationIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <Icon name="check" size={12} color="white" />;
            case 'warning':
                return <Icon name="warning" size={12} color="white" />;
            case 'info':
                return <Icon name="info" size={12} color="white" />;
            default:
                return <Icon name="info" size={12} color="white" />;
        }
    };

    const getNotificationColor = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'var(--status-done)';
            case 'warning':
                return 'var(--status-in-progress)';
            case 'info':
                return '#3b82f6';
            default:
                return '#3b82f6';
        }
    };

    return (
        <div
            className="rounded-lg p-6 shadow-md border-2 transition-all duration-300 hover:shadow-lg"
            style={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-accent)'
            }}
        >
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
                Important Notifications
            </h3>
            <ul className="space-y-3">
                {notifications.map((notification) => (
                    <li
                        key={notification.id}
                        className="flex items-start gap-3 p-3 rounded-md transition-all duration-200 hover:translate-x-1"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ backgroundColor: getNotificationColor(notification.type) }}
                        >
                            {getNotificationIcon(notification.type)}
                        </div>
                        <span className="text-sm" style={{ color: 'var(--color-dark)' }}>
                            {notification.message}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
