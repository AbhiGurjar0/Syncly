import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProjectDetailHeader } from "../../components/project-detail/ProjectDetailHeader";
import { ProjectOverviewTab } from "../../components/project-detail/ProjectOverviewTab";
import { ProjectTasksTab } from "../../components/project-detail/ProjectTasksTab";
import { ProjectMilestonesTab } from "../../components/project-detail/ProjectMilestonesTab";
import { ProjectTeamTab } from "../../components/project-detail/ProjectTeamTab";
import { ProjectFilesTab } from "../../components/project-detail/ProjectFilesTab";
import { ProjectActivityTab } from "../../components/project-detail/ProjectActivityTab";
import { ProjectRisksTab } from "../../components/project-detail/ProjectRisksTab.jsx";
import { cn } from "../../lib/utils";
import { ArrowLeft, Moon, Sun, LayoutDashboard } from "lucide-react";
import { Project } from "../../data/projects";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks" },
  { id: "milestones", label: "Milestones" },
  { id: "team", label: "Team" },
  { id: "files", label: "Files" },
  { id: "risks", label: "Risks" },
  { id: "activity", label: "Activity" },
];

const ProjectDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const project = Project.find((p) => p.id == id);

  if (!project) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Project not found
          </p>
          <Link
            to="/"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-10 transition-colors duration-300">
          <div className="px-6 pt-4 pb-0">
            <div className="flex items-center justify-between mb-3">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </button>
            </div>

            <ProjectDetailHeader project={project} />

            {/* Tabs */}
            <div className="flex gap-1 mt-4 -mb-px overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all border-b-2 whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-950"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            {activeTab === "overview" && (
              <ProjectOverviewTab project={project} />
            )}
            {activeTab === "tasks" && <ProjectTasksTab project={project} />}
            {activeTab === "milestones" && (
              <ProjectMilestonesTab project={project} />
            )}
            {activeTab === "team" && <ProjectTeamTab project={project} />}
            {activeTab === "files" && <ProjectFilesTab project={project} />}
            {activeTab === "risks" && <ProjectRisksTab project={project} />}
            {activeTab === "activity" && (
              <ProjectActivityTab project={project} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectDetail;
