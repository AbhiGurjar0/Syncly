import { cn } from "../../lib/utils";
import {
  Shield,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";

const severityConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-red-600 bg-red-100",
    badge: "bg-red-100 text-red-600",
  },
  high: {
    icon: AlertTriangle,
    color: "text-yellow-600 bg-yellow-100",
    badge: "bg-yellow-100 text-yellow-600",
  },
  medium: {
    icon: Info,
    color: "text-blue-600 bg-blue-100",
    badge: "bg-blue-100 text-blue-600",
  },
  low: {
    icon: Shield,
    color: "text-gray-500 bg-gray-100",
    badge: "bg-gray-100 text-gray-500",
  },
};

const statusBadge = {
  open: "bg-red-100 text-red-600",
  mitigating: "bg-yellow-100 text-yellow-600",
  resolved: "bg-green-100 text-green-600",
};

export function ProjectRisksTab({ project }) {
  return (
    <div className="space-y-3">
      {project.risks.map((risk) => {
        const config = severityConfig[risk.severity];
        const Icon = config.icon;

        return (
          <div
            key={risk.id}
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  config.color
                )}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-semibold text-black">
                    {risk.title}
                  </h4>

                  <div className="flex gap-2 shrink-0">
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        config.badge
                      )}
                    >
                      {risk.severity}
                    </span>

                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                        statusBadge[risk.status]
                      )}
                    >
                      {risk.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  {risk.description}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Owner:{" "}
                  <span className="font-medium text-black">
                    {risk.owner}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}