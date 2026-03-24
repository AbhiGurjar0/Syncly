import { cn } from "../../lib/utils";
import {
  CheckCircle2,
  MessageSquare,
  FileText,
  Flag,
  UserPlus,
  RefreshCw,
  Clock,
  Filter,
} from "lucide-react";
import { useState } from "react";

const typeIcons = {
  task: CheckCircle2,
  comment: MessageSquare,
  file: FileText,
  milestone: Flag,
  member: UserPlus,
  status: RefreshCw,
};

const typeColors = {
  task: "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/60",
  comment: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60",
  file: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60",
  milestone: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/60",
  member: "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-950/60",
  status: "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/60",
};

const typeLabels = {
  task: "Task Update",
  comment: "Comment",
  file: "File Upload",
  milestone: "Milestone",
  member: "Team Member",
  status: "Status Change",
};

export function ProjectActivityTab({ project }) {
  const [filterType, setFilterType] = useState<string>("all");
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  // Get unique activity types for filter
  const activityTypes = ["all", ...new Set(project.activities.map(a => a.type))];

  // Filter activities based on selected type
  const filteredActivities = filterType === "all" 
    ? project.activities 
    : project.activities.filter(a => a.type === filterType);

  // Format time helper
  const formatTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
      {/* Header with Filter */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
              Activity Timeline
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Track all project updates and team interactions
            </p>
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent cursor-pointer transition-colors"
            >
              {activityTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Activities" : typeLabels[type] || type}
                </option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => {
            const Icon = typeIcons[activity.type];
            const isExpanded = expandedActivity === activity.id;

            return (
              <div
                key={activity.id}
                className={cn(
                  "group transition-all duration-200",
                  "hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer"
                )}
                onClick={() => setExpandedActivity(isExpanded ? null : activity.id)}
              >
                <div className="flex items-start gap-3 px-6 py-4">
                  {/* Icon Badge */}
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
                      typeColors[activity.type],
                      "group-hover:scale-105"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0">
                    {activity.avatar || activity.user?.charAt(0).toUpperCase()}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-sm text-gray-900 dark:text-white">
                        <span className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {activity.user}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 mx-1.5">•</span>
                        <span className="text-gray-600 dark:text-gray-300">
                          {activity.action}
                        </span>
                        {activity.target && (
                          <>
                            <span className="text-gray-500 dark:text-gray-400 mx-1.5">•</span>
                            <span className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                              {activity.target}
                            </span>
                          </>
                        )}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatTime(activity.time)}</span>
                      </div>
                    </div>

                    {/* Optional Description/Details */}
                    {activity.description && (
                      <p className={cn(
                        "text-sm text-gray-600 dark:text-gray-400 mt-1.5 transition-all",
                        !isExpanded && "line-clamp-2"
                      )}>
                        {activity.description}
                      </p>
                    )}

                    {/* Expand/Collapse Indicator */}
                    {activity.description && activity.description.length > 100 && (
                      <button
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedActivity(isExpanded ? null : activity.id);
                        }}
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-gray-400 dark:text-gray-600" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No activities found
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filterType === "all" 
                ? "No activities have been recorded for this project yet." 
                : `No ${typeLabels[filterType]?.toLowerCase() || filterType} activities found.`}
            </p>
          </div>
        )}
      </div>

      {/* Footer with Activity Count */}
      {filteredActivities.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/30 rounded-b-xl">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Showing {filteredActivities.length} of {project.activities.length} activities
            {filterType !== "all" && ` • Filtered by ${typeLabels[filterType]?.toLowerCase() || filterType}`}
          </p>
        </div>
      )}
    </div>
  );
}