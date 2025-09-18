export interface Task {
  id: number;
  title: string;
  time: string;
  duration: string;
  type: string;
  priority: string;
  date: Date;
}

export const defaultTasks: Task[] = [
  {
    id: 1,
    title: "Team standup meeting",
    time: "9:00 AM",
    duration: "30 min",
    type: "meeting",
    priority: "High",
    date: new Date(2024, 0, 15)
  },
  {
    id: 2,
    title: "Review Q4 budget analysis",
    time: "2:00 PM", 
    duration: "2 hours",
    type: "task",
    priority: "High",
    date: new Date(2024, 0, 15)
  },
  {
    id: 3,
    title: "Client presentation prep",
    time: "10:00 AM",
    duration: "1 hour",
    type: "task", 
    priority: "Medium",
    date: new Date(2024, 0, 16)
  },
  {
    id: 4,
    title: "Project review meeting",
    time: "3:00 PM",
    duration: "45 min",
    type: "meeting",
    priority: "Medium",
    date: new Date(2024, 0, 17)
  }
];