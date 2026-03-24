import { cn } from "../../lib/utils";
import { Calendar, DollarSign, Users, Tag, TrendingUp, Clock } from "lucide-react";
import { ProgressBar } from "../ProgressBar";

export function ProjectDetailHeader({ project }) {
  // Format currency helper
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Status color mapping with dark mode support
  const getStatusStyles = (status) => {
    const statusMap = {
      "Active": "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800",
      "In Progress": "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
      "Completed": "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
      "On Hold": "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
      "Planning": "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
    };
    return statusMap[status] || statusMap["Active"];
  };

  // Priority color mapping with dark mode support
  const getPriorityStyles = (priority) => {
    const priorityMap = {
      critical: "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800",
      high: "bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800",
      medium: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
      low: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700",
    };
    return priorityMap[priority] || priorityMap["medium"];
  };

  // Calculate budget percentage for visual indicator
  const budgetPercentage = (project.budget.spent / project.budget.total) * 100;
  const isBudgetOver = budgetPercentage > 90;
  const isBudgetExceeded = budgetPercentage > 100;

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
      {/* Left Section - Project Info */}
      <div className="flex-1 min-w-0">
        {/* Title Row */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-2">
            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full transition-colors",
                getStatusStyles(project.status)
              )}
            >
              {project.status}
            </span>

            <span
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-full transition-colors",
                getPriorityStyles(project.priority)
              )}
            >
              {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mb-4">
          {project.description}
        </p>

        {/* Meta Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Members */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Team Members</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {project.members.length} members
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Timeline</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {project.startDate} → {project.deadline}
              </p>
            </div>
          </div>

          {/* Budget */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-500">Budget</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(project.budget.spent)} / {formatCurrency(project.budget.total)}
              </p>
              {!isBudgetExceeded && (
                <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      isBudgetOver ? "bg-orange-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Sprint Info */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-500">Current Sprint</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                Sprint {project.sprintInfo.current}/{project.sprintInfo.total}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            <Tag className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600" />
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right Section - Progress Card */}
      <div className="lg:min-w-[220px] bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
        <div className="text-center">
          {/* Progress Percentage */}
          <div className="relative inline-flex items-center justify-center mb-3">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-gray-200 dark:text-gray-800"
              />
              <circle
                cx="40"
                cy="40"
                r="34"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 34}`}
                strokeDashoffset={`${2 * Math.PI * 34 * (1 - project.progress / 100)}`}
                className="text-blue-600 dark:text-blue-500 transition-all duration-500 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-2xl font-bold text-gray-900 dark:text-white">
              {project.progress}%
            </span>
          </div>

          {/* Progress Bar Alternative (for quick glance) */}
          <ProgressBar
            value={project.progress}
            gradient={project.gradient}
            size="md"
            className="mb-3"
          />

          {/* Additional Stats */}
          <div className="flex justify-between items-center text-xs mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-left">
              <p className="text-gray-500 dark:text-gray-500">Completed</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {project.progress}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 dark:text-gray-500">Remaining</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {100 - project.progress}%
              </p>
            </div>
          </div>

          {/* Sprint Badge */}
          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <Clock className="w-3 h-3" />
              <span>
                Sprint {project.sprintInfo.current} of {project.sprintInfo.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}