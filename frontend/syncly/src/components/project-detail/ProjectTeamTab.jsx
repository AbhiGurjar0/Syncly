import { cn } from "../../lib/utils";
import { ProgressBar } from "../ProgressBar";
import { Mail } from "lucide-react";

const statusColors = {
  online: "bg-green-500",
  away: "bg-yellow-500",
  offline: "bg-gray-400",
};

export function ProjectTeamTab({ project }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {project.members.map((member) => {
        const taskPercent =
          member.tasksAssigned > 0
            ? Math.round(
                (member.tasksCompleted /
                  member.tasksAssigned) *
                  100
              )
            : 0;

        return (
          <div
            key={member.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                  {member.avatar}
                </div>

                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white",
                    statusColors[member.status]
                  )}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-black">
                  {member.name}
                </h4>

                <p className="text-xs text-gray-500">
                  {member.role}
                </p>

                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <Mail className="w-3 h-3" />
                  <span>{member.email}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-gray-100 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-black">
                  {member.tasksCompleted}
                </p>
                <p className="text-[10px] text-gray-500">
                  Completed
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-black">
                  {member.tasksAssigned}
                </p>
                <p className="text-[10px] text-gray-500">
                  Assigned
                </p>
              </div>

              <div className="bg-gray-100 rounded-lg p-2.5 text-center">
                <p className="text-lg font-bold text-black">
                  {member.hoursLogged}
                </p>
                <p className="text-[10px] text-gray-500">
                  Hours
                </p>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Task completion</span>
                <span>{taskPercent}%</span>
              </div>

              <ProgressBar
                value={taskPercent}
                gradient={
                  taskPercent > 80
                    ? "gradient-success"
                    : taskPercent > 50
                    ? "gradient-primary"
                    : "gradient-warning"
                }
                size="sm"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}