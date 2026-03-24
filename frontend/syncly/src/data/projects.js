// projectsData.js

export const Project = [
  {
    id: 2,
    name: "Mobile App Redesign",
    description:
      "Complete overhaul of the mobile application UI/UX with new design system...",
    team: "Design Team",
    progress: 78,
    status: "On Track",
    statusColor: "bg-success/10 text-success",
    deadline: "Mar 30, 2026",
    startDate: "Jan 15, 2026",
    budget: { total: 85000, spent: 62400, currency: "USD" },
    priority: "high",
    category: "Product Development",
    client: "Internal",
    gradient: "gradient-primary",
    tags: ["Mobile", "UI/UX", "React Native", "Design System"],
    sprintInfo: {
      current: 6,
      total: 8,
      velocity: 34,
      burndown: [120, 105, 92, 78, 65, 48],
    },

    members: [
      {
        id: "1",
        name: "Jamie Doe",
        avatar: "JD",
        role: "Lead Designer",
        email: "jamie@company.com",
        status: "online",
        tasksCompleted: 18,
        tasksAssigned: 22,
        hoursLogged: 186,
      },
    ],

    tasks: [
      {
        id: "t1",
        title: "Design new navigation flow",
        description: "Create intuitive bottom navigation",
        status: "done",
        priority: "critical",
        assignee: "Jamie Doe",
        assigneeAvatar: "JD",
        dueDate: "Feb 20, 2026",
        tags: ["Design", "Navigation"],
        subtasks: [
          { title: "User research", done: true },
          { title: "Wireframes", done: true },
        ],
        comments: 12,
        attachments: 5,
        createdAt: "Jan 18, 2026",
      },
    ],

    milestones: [
      {
        id: "m1",
        title: "Research & Discovery",
        description: "User research",
        dueDate: "Feb 01, 2026",
        status: "completed",
        progress: 100,
        tasks: 8,
        completedTasks: 8,
      },
    ],

    files: [
      {
        id: "f1",
        name: "Design-System.fig",
        type: "figma",
        size: "24.5 MB",
        uploadedBy: "Jamie Doe",
        uploadedAt: "Feb 15, 2026",
        icon: "🎨",
      },
    ],

    risks: [
      {
        id: "r1",
        title: "Timeline slippage",
        severity: "high",
        status: "mitigating",
        owner: "Mike Ross",
        description: "Scope creep risk",
      },
    ],

    activities: [
      {
        id: "a1",
        user: "Sara Kim",
        avatar: "SK",
        action: "completed task",
        target: "Header Redesign",
        time: "5 min ago",
        type: "task",
      },
    ],
  },
];