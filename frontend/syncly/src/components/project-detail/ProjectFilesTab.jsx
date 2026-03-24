import { Download, Eye } from "lucide-react";

export function ProjectFilesTab({ project }) {
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-semibold text-black">Project Files</h3>
        <span className="text-xs text-gray-500">
          {project.files.length} files
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {project.files.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-100 transition-colors group"
          >
            <span className="text-2xl">{file.icon}</span>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-black group-hover:text-blue-600 transition-colors truncate">
                {file.name}
              </p>

              <p className="text-xs text-gray-500">
                {file.size} • Uploaded by {file.uploadedBy} on{" "}
                {file.uploadedAt}
              </p>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                <Eye className="w-4 h-4" />
              </button>

              <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}