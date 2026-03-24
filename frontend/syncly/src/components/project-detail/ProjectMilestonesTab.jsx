import { cn } from "../../lib/utils";
import { ProgressBar } from "../ProgressBar";
import { CheckCircle2, Clock, AlertCircle, Circle } from "lucide-react";

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-500",
    line: "bg-green-500",
  },
  in_progress: {
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-500",
    line: "bg-blue-500",
  },
  upcoming: {
    icon: Circle,
    color: "text-gray-400",
    bg: "bg-gray-300",
    line: "bg-gray-200",
  },
  overdue: {
    icon: AlertCircle,
    color: "text-red-600",
    bg: "bg-red-500",
    line: "bg-red-500",
  },
};

export function ProjectMilestonesTab({ project }) {
  return (
    <div className="space-y-0">
      {project.milestones.map((m, i) => {
        const config = statusConfig[m.status];
        const Icon = config.icon;
        const isLast = i === project.milestones.length - 1;

        return (
          <div key={m.id} className="flex gap-4">
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0",
                  m.status === "completed"
                    ? "border-green-500 bg-green-100"
                    : m.status === "in_progress"
                    ? "border-blue-500 bg-blue-100"
                    : m.status === "overdue"
                    ? "border-red-500 bg-red-100"
                    : "border-gray-300 bg-gray-100"
                )}
              >
                <Icon className={cn("w-5 h-5", config.color)} />
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 min-h-[40px]",
                    config.line
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow p-5 mb-4 flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-black">
                    {m.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {m.description}
                  </p>
                </div>

                <div className="text-right shrink-0 ml-4">
                  <span
                    className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      m.status === "completed" &&
                        "bg-green-100 text-green-600",
                      m.status === "in_progress" &&
                        "bg-blue-100 text-blue-600",
                      m.status === "upcoming" &&
                        "bg-gray-100 text-gray-500",
                      m.status === "overdue" &&
                        "bg-red-100 text-red-600"
                    )}
                  >
                    {m.status
                      .replace("_", " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </span>

                  <p className="text-xs text-gray-500 mt-1">
                    Due {m.dueDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex-1">
                  <ProgressBar
                    value={m.progress}
                    gradient={
                      m.status === "completed"
                        ? "gradient-success"
                        : m.status === "overdue"
                        ? "gradient-danger"
                        : "gradient-primary"
                    }
                    size="sm"
                  />
                </div>

                <span className="text-xs font-mono text-gray-500">
                  {m.progress}%
                </span>

                <span className="text-xs text-gray-500">
                  {m.completedTasks}/{m.tasks} tasks
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}