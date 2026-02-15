'use client';

import Link from 'next/link';
import StudentSidebar from '../components/StudentSidebar';
import Icon from '../components/ui/Icon';
import { useApp } from '../context/AppContext';
import type { AdminStudentStatus } from '../types/types';

// Order of stages
const stageOrder: AdminStudentStatus[] = ['profile', 'documents', 'fees', 'lms', 'completed'];
const stageLabels: Record<string, string> = {
  profile: 'Profile',
  documents: 'Documents',
  fees: 'Fees',
  lms: 'LMS',
  completed: 'Completed',
};

const stepRoutes: Record<string, string> = {
  profile: '/profile',
  documents: '/documents',
  fees: '/fees',
  lms: '/lms',
};

// Deadlines & notifications (static for now)
const deadlines = [
  { id: 'deadline-1', date: 'Feb 17, 2026', description: 'Document Submission' },
  { id: 'deadline-2', date: 'Feb 20, 2026', description: 'Fee Payment' },
  { id: 'deadline-3', date: 'Feb 25, 2026', description: 'LMS Registration' },
];

export default function DashboardPage() {
  const { currentUser, students } = useApp();
  const student = students.find((s) => s.id === currentUser?.id);
  const currentStage = student?.stage || 'profile';

  const userName = currentUser?.name?.split(' ')[0] || 'Student';
  const userBranch = student?.branch || 'N/A';
  const userCategory = student?.category || 'N/A';
  const userUid = currentUser?.uid || 'N/A';

  // Build steps dynamically from current stage
  const steps = stageOrder.map((stageId) => {
    const currentIdx = stageOrder.indexOf(currentStage);
    const stepIdx = stageOrder.indexOf(stageId);
    let status: 'done' | 'in-progress' | 'locked';
    if (stepIdx < currentIdx) status = 'done';
    else if (stepIdx === currentIdx) status = 'in-progress';
    else status = 'locked';
    return { id: stageId, label: stageLabels[stageId], status };
  });

  // Derive pending tasks from stage
  const pendingTasks: { id: string; title: string }[] = [];
  if (currentStage === 'profile') pendingTasks.push({ id: 't1', title: 'Complete your profile information' });
  if (currentStage === 'documents') {
    pendingTasks.push({ id: 't2', title: 'Upload remaining documents' });
    pendingTasks.push({ id: 't3', title: 'Wait for document verification' });
  }
  if (currentStage === 'fees') pendingTasks.push({ id: 't4', title: 'Generate and pay fee receipt' });
  if (currentStage === 'lms') pendingTasks.push({ id: 't5', title: 'Access LMS platforms' });
  if (currentStage === 'completed') pendingTasks.push({ id: 't6', title: 'All steps completed!' });

  // Derive notifications
  const notifications = [
    ...(stageOrder.indexOf(currentStage) > 0 ? [{ id: 'n1', message: 'Previous stage verified ✓', type: 'success' as const }] : []),
    { id: 'n2', message: `Current stage: ${stageLabels[currentStage]}`, type: 'info' as const },
    ...(currentStage === 'documents' ? [{ id: 'n3', message: 'Document deadline approaching', type: 'warning' as const }] : []),
  ];

  const nextDeadline = deadlines[0];

  return (
    <StudentSidebar>
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
              Welcome {userName}
            </h2>
            <div className="space-y-4 text-2xl" style={{ color: 'var(--color-dark)' }}>
              <p><strong>Branch:</strong> {userBranch}</p>
              <p><strong>Category:</strong> {userCategory}</p>
              <p><strong>UID:</strong> {userUid}</p>
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

          {/* div5 - Timeline/Progress Stepper (clickable) */}
          <div
            className="rounded-lg p-8 transition-all duration-300 hover:shadow-lg flex flex-col items-center justify-center gap-4"
            style={{
              gridColumn: 'span 6 / span 6',
              gridRowStart: 5,
              border: '2px solid var(--color-dark)',
              backgroundColor: 'var(--color-primary)'
            }}
          >
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4">
                  {stepRoutes[step.id] ? (
                    <Link
                      href={stepRoutes[step.id]}
                      className="transition-all duration-300 hover:scale-110 text-lg font-semibold px-8 py-3 rounded-lg no-underline"
                      style={{
                        color: step.status === 'done' ? 'var(--status-done)' : step.status === 'in-progress' ? 'var(--color-accent)' : 'var(--status-locked)',
                        border: `2px solid ${step.status === 'done' ? 'var(--status-done)' : step.status === 'in-progress' ? 'var(--color-accent)' : 'var(--status-locked)'}`,
                        backgroundColor: step.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : step.status === 'in-progress' ? 'rgba(255, 109, 31, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                      }}
                    >
                      {step.label}
                    </Link>
                  ) : (
                    <span
                      className="text-lg font-semibold px-8 py-3 rounded-lg"
                      style={{
                        color: step.status === 'done' ? 'var(--status-done)' : step.status === 'in-progress' ? 'var(--color-accent)' : 'var(--status-locked)',
                        border: `2px solid ${step.status === 'done' ? 'var(--status-done)' : step.status === 'in-progress' ? 'var(--color-accent)' : 'var(--status-locked)'}`,
                        backgroundColor: step.status === 'done' ? 'rgba(16, 185, 129, 0.1)' : step.status === 'in-progress' ? 'rgba(255, 109, 31, 0.1)' : 'rgba(156, 163, 175, 0.1)',
                      }}
                    >
                      {step.label}
                    </span>
                  )}
                  {index < steps.length - 1 && (
                    <span className="text-2xl font-bold">
                      <Icon name="arrow-right" size={24} color="var(--color-dark)" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StudentSidebar>
  );
}