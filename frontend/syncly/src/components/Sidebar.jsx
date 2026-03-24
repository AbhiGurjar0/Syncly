// components/Sidebar.jsx
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  CheckSquare, 
  MessageSquare, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  Clock,
  ChevronRight,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const Sidebar = ({ collapsed = false, onCollapse }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/team-updates', icon: MessageSquare, label: 'Team Updates' },
    { path: '/meetings', icon: Calendar, label: 'Meetings' },
    { path: '/members', icon: Users, label: 'Members' },
  ];

  const isActive = (path) => location.pathname === path;

  // Dynamic styling based on theme and collapsed state
  const getThemeClasses = () => {
    if (isDark) {
      return {
        sidebar: 'bg-gray-900 border-gray-800',
        logo: 'from-indigo-500 to-purple-600',
        logoText: 'from-white to-gray-300',
        navItem: {
          active: 'bg-indigo-500/10 text-indigo-400',
          inactive: 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
        },
        divider: 'border-gray-800',
        deadlineCard: 'bg-gray-800/50 border-gray-700',
        deadlineText: 'text-gray-300',
        deadlineLabel: 'text-gray-400',
        progressBg: 'bg-gray-700',
        progressFill: 'bg-indigo-500',
        bottomSection: 'border-gray-800',
        settingsBtn: 'text-gray-400 hover:bg-gray-800 hover:text-gray-200',
        logoutBtn: 'text-red-400 hover:bg-red-500/10',
        tooltip: 'bg-gray-800 text-gray-200 border border-gray-700',
      };
    }
    return {
      sidebar: 'bg-white border-gray-200',
      logo: 'from-indigo-600 to-indigo-400',
      logoText: 'from-gray-800 to-gray-600',
      navItem: {
        active: 'bg-indigo-50 text-indigo-700',
        inactive: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      },
      divider: 'border-gray-200',
      deadlineCard: 'bg-gray-50 border-gray-200',
      deadlineText: 'text-gray-600',
      deadlineLabel: 'text-gray-500',
      progressBg: 'bg-gray-200',
      progressFill: 'bg-indigo-600',
      bottomSection: 'border-gray-200',
      settingsBtn: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      logoutBtn: 'text-red-600 hover:bg-red-50',
      tooltip: 'bg-gray-900 text-white',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <aside 
      className={`${themeClasses.sidebar} border-r flex flex-col transition-all duration-300 relative ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={onCollapse}
        className={`absolute -right-3 top-20 z-20 p-1.5 rounded-full border shadow-md transition-all duration-300 ${
          isDark 
            ? 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}
      >
        <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Logo Section */}
      <div className={`p-6 ${collapsed ? 'px-4' : ''} border-b ${themeClasses.divider}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-br ${themeClasses.logo} rounded-xl flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-xl">⚡</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className={`font-bold text-xl bg-gradient-to-r ${themeClasses.logoText} bg-clip-text text-transparent`}>
                TaskFlow
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">Workspace</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-8 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                    active 
                      ? themeClasses.navItem.active 
                      : themeClasses.navItem.inactive
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.label}</span>}
                  {collapsed && (
                    <div className={`absolute left-full ml-2 px-2 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg ${themeClasses.tooltip}`}>
                      {item.label}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Deadline Tracker */}
        <div className="mt-8">
          <div className={`rounded-2xl p-4 ${themeClasses.deadlineCard} border transition-all duration-200`}>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-500" />
              {!collapsed && (
                <span className={`text-xs font-semibold uppercase tracking-wider ${themeClasses.deadlineLabel}`}>
                  Deadline Tracker
                </span>
              )}
            </div>
            
            {!collapsed ? (
              <>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className={themeClasses.deadlineText}>Q1 Sprint Goals</span>
                    <span className="font-semibold text-indigo-500 dark:text-indigo-400">68%</span>
                  </div>
                  <div className={`${themeClasses.progressBg} rounded-full h-2 overflow-hidden`}>
                    <div 
                      className={`${themeClasses.progressFill} h-full rounded-full transition-all duration-500`} 
                      style={{ width: '68%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className={themeClasses.deadlineText}>Due this week</span>
                    <span className="font-semibold text-red-500 dark:text-red-400">3 tasks</span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-500/10 dark:bg-red-500/20 rounded-lg p-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-medium text-red-600 dark:text-red-400">
                      Urgent: Design review tomorrow
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs">
                    <span className={themeClasses.deadlineLabel}>On track</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">+12%</span>
                  </div>
                  <TrendingUp className="w-3 h-3 text-green-500 mt-1" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <Clock className="w-6 h-6 text-amber-500" />
                <div className={`w-full ${themeClasses.progressBg} rounded-full h-1 mt-2`}>
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className={`px-3 pb-6 pt-4 border-t ${themeClasses.bottomSection}`}>
        <ul className="space-y-2">
          <li>
            <Link
              to="/settings"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                isActive('/settings') 
                  ? (isDark ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900')
                  : themeClasses.settingsBtn
              }`}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Settings</span>}
              {collapsed && (
                <div className={`absolute left-full ml-2 px-2 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg ${themeClasses.tooltip}`}>
                  Settings
                </div>
              )}
            </Link>
          </li>
          <li>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to logout?')) {
                  console.log('Logging out...');
                }
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${themeClasses.logoutBtn}`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>Logout</span>}
              {collapsed && (
                <div className={`absolute left-full ml-2 px-2 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg ${themeClasses.tooltip}`}>
                  Logout
                </div>
              )}
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;