import { ProgressBar } from "../ProgressBar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  ListTodo,
  TrendingUp,
  DollarSign,
} from "lucide-react";

export function ProjectOverviewTab({ project }) {
  const tasksByStatus = {
    done: project.tasks.filter((t) => t.status === "done").length,
    in_progress: project.tasks.filter((t) => t.status === "in_progress").length,
    in_review: project.tasks.filter((t) => t.status === "in_review").length,
    todo: project.tasks.filter((t) => t.status === "todo").length,
  };

  const burndownData = project.sprintInfo.burndown.map((v, i) => ({
    sprint: `S${i + 1}`,
    remaining: v,
  }));

  const budgetPercent = Math.round(
    (project.budget.spent / project.budget.total) * 100
  );

  const quickStats = [
    {
      label: "Completed",
      value: tasksByStatus.done,
      icon: CheckCircle2,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "In Progress",
      value: tasksByStatus.in_progress,
      icon: Clock,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "In Review",
      value: tasksByStatus.in_review,
      icon: AlertCircle,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      label: "To Do",
      value: tasksByStatus.todo,
      icon: ListTodo,
      color: "text-gray-500 bg-gray-100",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-4 shadow"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-black">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Burndown Chart */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h3 className="font-semibold text-black">
              Sprint Burndown
            </h3>
          </div>
          <div className="p-6 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burndownData}>
                <XAxis dataKey="sprint" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="remaining"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={{ fill: "#6366f1", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <h3 className="font-semibold text-black">
              Budget Overview
            </h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm text-gray-500">Spent</p>
                <p className="text-3xl font-bold text-black">
                  ${project.budget.spent.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-lg font-semibold text-gray-500">
                  ${project.budget.total.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>{budgetPercent}% used</span>
                <span>
                  $
                  {(project.budget.total - project.budget.spent).toLocaleString()}{" "}
                  remaining
                </span>
              </div>

              <ProgressBar
                value={project.budget.spent}
                max={project.budget.total}
                gradient={
                  budgetPercent > 90
                    ? "gradient-danger"
                    : budgetPercent > 70
                    ? "gradient-warning"
                    : "gradient-success"
                }
                size="md"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Velocity</p>
                <p className="text-lg font-bold text-black">
                  {project.sprintInfo.velocity}
                </p>
                <p className="text-[10px] text-gray-500">
                  pts/sprint
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Sprint</p>
                <p className="text-lg font-bold text-black">
                  {project.sprintInfo.current}/
                  {project.sprintInfo.total}
                </p>
                <p className="text-[10px] text-gray-500">
                  current
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Team</p>
                <p className="text-lg font-bold text-black">
                  {project.members.length}
                </p>
                <p className="text-[10px] text-gray-500">
                  members
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-xl shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="font-semibold text-black">
            Milestone Progress
          </h3>
        </div>

        <div className="p-6 space-y-4">
          {project.milestones.map((m) => (
            <div key={m.id} className="flex items-center gap-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  m.status === "completed"
                    ? "bg-green-500"
                    : m.status === "in_progress"
                    ? "bg-blue-500"
                    : m.status === "overdue"
                    ? "bg-red-500"
                    : "bg-gray-300"
                }`}
              />

              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium text-black">
                    {m.title}
                  </p>
                  <span className="text-xs text-gray-500">
                    {m.completedTasks}/{m.tasks} tasks
                  </span>
                </div>

                <ProgressBar
                  value={m.progress}
                  size="sm"
                  gradient={
                    m.status === "completed"
                      ? "gradient-success"
                      : m.status === "overdue"
                      ? "gradient-danger"
                      : "gradient-primary"
                  }
                />
              </div>

              <span className="text-xs text-gray-500 w-20 text-right">
                {m.dueDate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}