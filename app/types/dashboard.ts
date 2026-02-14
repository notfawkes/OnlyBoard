// Dashboard Data Types

export interface UserInfo {
  name: string;
  branch: string;
  category: string;
  uid: string;
  currentStage: string;
}

export interface Step {
  id: string;
  label: string;
  status: 'done' | 'in-progress' | 'locked';
}

export interface Task {
  id: string;
  title: string;
}

export interface Deadline {
  id: string;
  date: string;
  description: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

export interface DashboardData {
  userInfo: UserInfo;
  steps: Step[];
  pendingTasks: Task[];
  deadlines: Deadline[];
  notifications: Notification[];
}
