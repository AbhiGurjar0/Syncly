import { cn } from "../../lib/utils";
import {
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const statusIcons = {
  done: CheckCircle2,
  in_progress: Clock,
  in_review: AlertCircle,
  todo: Circle,
};

const statusLabels = {
  done: "Done",
  in_progress: "In Progress",
  in_review: "In Review",
  todo: "To Do",
};

const statusStyles = {
  done: "text-green-600 bg-green-100",
  in_progress: "text-blue-600 bg-blue-100",
  in_review: "text-yellow-600 bg-yellow-100",
  todo: "text-gray-500 bg-gray-100",
};

const priorityStyles = {
  critical: "bg-red-100 text-red-600",
  high: "bg-yellow-100 text-yellow-600",
  medium: "bg-blue-100 text-blue-600",
  low: "bg-gray-100 text-gray-500",
};

const filters = ["All", "To Do", "In Progress", "In Review", "Done"];

const filterMap = {
  All: null,
  "To Do": "todo",
  "In Progress": "in_progress",
  "In Review": "in_review",
  Done: "done",
};

export function ProjectTasksTab({ project }) {
  const [filter, setFilter] = useState("All");

  const filtered = filterMap[filter]
    ? project.tasks.filter((t) => t.status === filterMap[filter])
    : project.tasks;

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-500 hover:bg-gray-100 shadow"
            )}
          >
            {f}
            <span className="ml-1.5 opacity-70">
              (
              {filterMap[f]
                ? project.tasks.filter(
                    (t) => t.status === filterMap[f]
                  ).length
                : project.tasks.length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.map((task) => {
          const StatusIcon = statusIcons[task.status];
          const completedSubs = task.subtasks.filter(
            (s) => s.done
          ).length;

          return (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                    statusStyles[task.status]
                  )}
                >
                  <StatusIcon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold text-black group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {task.description}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0",
                        priorityStyles[task.priority]
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-600">
                        {task.assigneeAvatar}
                      </div>
                      <span className="text-xs text-gray-500">
                        {task.assignee}
                      </span>
                    </div>

                    <span className="text-xs text-gray-500">
                      Due {task.dueDate}
                    </span>

                    {task.subtasks.length > 0 && (
                      <span className="text-xs text-gray-500">
                        <CheckCircle2 className="w-3 h-3 inline mr-0.5" />
                        {completedSubs}/{task.subtasks.length}
                      </span>
                    )}

                    <span className="text-xs text-gray-500 flex items-center gap-0.5">
                      <MessageSquare className="w-3 h-3" />
                      {task.comments}
                    </span>

                    <span className="text-xs text-gray-500 flex items-center gap-0.5">
                      <Paperclip className="w-3 h-3" />
                      {task.attachments}
                    </span>

                    <div className="flex gap-1 ml-auto">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subtasks */}
                  {task.subtasks.length > 0 && (
                    <div className="mt-3 pl-1 space-y-1.5">
                      {task.subtasks.map((sub, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={cn(
                              "w-3.5 h-3.5 rounded border flex items-center justify-center",
                              sub.done
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300"
                            )}
                          >
                            {sub.done && (
                              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                            )}
                          </div>

                          <span
                            className={cn(
                              "text-xs",
                              sub.done
                                ? "text-gray-400 line-through"
                                : "text-black"
                            )}
                          >
                            {sub.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}