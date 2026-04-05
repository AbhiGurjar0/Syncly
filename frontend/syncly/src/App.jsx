// App.jsx - Main Application
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/workSpace/WorkSpace";
import ProjectDetail from "./pages/project/ProjectDetail";
import Auth from "./pages/auth/auth";
import RequireAuth from "./collabspace/auth/RequireAuth";
import CollabSpaceAuth from "./collabspace/auth/CollabSpaceAuth";
import CollabSpaceDashboard from "./collabspace/pages/CollabSpaceDashboard";
import CollabSpaceProjectDetails from "./collabspace/pages/CollabSpaceProjectDetails";
import OrbitDashboard from "./components/Dashboard";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<OrbitDashboard />} />
                <Route path="/project/:id" element={<ProjectDetail />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/collabspace/login" element={<CollabSpaceAuth />} />
                <Route
                  path="/collabspace"
                  element={
                    <RequireAuth>
                      <CollabSpaceDashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/collabspace/project/:id"
                  element={
                    <RequireAuth>
                      <CollabSpaceProjectDetails />
                    </RequireAuth>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
