'use client';

import { dashboardData } from '../data/dashboardData';
import TextProgressStepper from '../components/TextProgressStepper';

export default function DashboardPage() {
  const { userInfo, steps, pendingTasks, deadlines, notifications } = dashboardData;
  const nextDeadline = deadlines[0];

  return (
    <div
      className="w-full min-h-screen p-12"
      style={{
        backgroundColor: 'var(--color-secondary)',
        border: '3px solid var(--color-dark)'
      }}
    >
      {/* Grid Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(5, 1fr)',
          gap: '8px',
          height: 'calc(100vh - 96px)',
          width: '100%'
        }}
      >
        {/* div1 - User Info */}
        <div
          className="rounded-lg p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-center"
          style={{
            gridColumn: 'span 2 / span 2',
            gridRow: 'span 4 / span 4',
            border: '2px solid var(--color-dark)',
            backgroundColor: 'var(--color-primary)',
            overflow: 'auto'
          }}
        >
          <h2 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-dark)' }}>
            Welcome {userInfo.name}
          </h2>
          <div className="space-y-4 text-2xl" style={{ color: 'var(--color-dark)' }}>
            <p><strong>Branch:</strong> {userInfo.branch}</p>
            <p><strong>Category:</strong> {userInfo.category}</p>
            <p><strong>UID:</strong> {userInfo.uid}</p>
          </div>
        </div>

        {/* div2 - Next Deadline */}
        <div
          className="rounded-lg p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center"
          style={{
            gridColumn: 'span 4 / span 4',
            gridColumnStart: 3,
            border: '2px solid var(--color-dark)',
            backgroundColor: 'var(--color-primary)'
          }}
        >
          <h3 className="text-4xl font-bold" style={{ color: 'var(--color-dark)' }}>
            Next Deadline: <span style={{ color: 'var(--color-accent)' }}>{nextDeadline.date}</span>
          </h3>
        </div>

        {/* div3 - Pending Tasks */}
        <div
          className="rounded-lg p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col"
          style={{
            gridColumn: 'span 2 / span 2',
            gridRow: 'span 3 / span 3',
            gridColumnStart: 3,
            gridRowStart: 2,
            border: '2px solid var(--color-dark)',
            backgroundColor: 'var(--color-primary)',
            overflow: 'auto'
          }}
        >
          <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-dark)' }}>
            Pending Tasks
          </h3>
          <div className="space-y-4 text-2xl flex-1 flex flex-col justify-center" style={{ color: 'var(--color-dark)' }}>
            {pendingTasks.map((task) => (
              <p
                key={task.id}
                className="transition-all duration-200 hover:translate-x-1 flex items-center gap-3"
                style={{ cursor: 'pointer' }}
              >
                <span className="text-3xl" style={{ color: 'var(--color-accent)' }}>•</span>
                {task.title}
              </p>
            ))}
          </div>
        </div>

        {/* div4 - Important Notifications */}
        <div
          className="rounded-lg p-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col"
          style={{
            gridColumn: 'span 2 / span 2',
            gridRow: 'span 3 / span 3',
            gridColumnStart: 5,
            gridRowStart: 2,
            border: '2px solid var(--color-dark)',
            backgroundColor: 'var(--color-primary)',
            overflow: 'auto'
          }}
        >
          <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-dark)' }}>
            Important Notifications
          </h3>
          <div className="space-y-4 text-xl flex-1 flex flex-col justify-center" style={{ color: 'var(--color-dark)' }}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="transition-all duration-200 hover:translate-x-1"
                style={{ cursor: 'pointer' }}
              >
                <p>{notification.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* div5 - Timeline/Progress Stepper */}
        <div
          className="rounded-lg p-8 transition-all duration-300 hover:shadow-lg flex items-center justify-center"
          style={{
            gridColumn: 'span 6 / span 6',
            gridRowStart: 5,
            border: '2px solid var(--color-dark)',
            backgroundColor: 'var(--color-primary)'
          }}
        >
          <TextProgressStepper steps={steps} />
        </div>
      </div>
    </div>
  );
}