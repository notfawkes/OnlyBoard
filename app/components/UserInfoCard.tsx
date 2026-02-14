import { UserInfo } from '../types/dashboard';

interface UserInfoCardProps {
    userInfo: UserInfo;
}

export default function UserInfoCard({ userInfo }: UserInfoCardProps) {
    return (
        <div
            className="rounded-lg p-6 shadow-md border-2 transition-all duration-300 hover:shadow-lg"
            style={{
                backgroundColor: 'var(--color-secondary)',
                borderColor: 'var(--color-accent)'
            }}
        >
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--color-dark)' }}>
                Welcome {userInfo.name}
            </h2>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>
                        Branch:
                    </span>
                    <span className="text-sm" style={{ color: 'var(--color-dark)' }}>
                        {userInfo.branch}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>
                        Category:
                    </span>
                    <span className="text-sm" style={{ color: 'var(--color-dark)' }}>
                        {userInfo.category}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm" style={{ color: 'var(--color-accent)' }}>
                        UID:
                    </span>
                    <span className="text-sm font-mono" style={{ color: 'var(--color-dark)' }}>
                        {userInfo.uid}
                    </span>
                </div>
                <div className="mt-4 pt-4 border-t-2" style={{ borderColor: 'var(--color-accent)' }}>
                    <div
                        className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                            backgroundColor: 'var(--status-in-progress)',
                            color: 'white'
                        }}
                    >
                        Current Stage: {userInfo.currentStage}
                    </div>
                </div>
            </div>
        </div>
    );
}
