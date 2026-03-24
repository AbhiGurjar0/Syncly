// components/Navbar.jsx
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Search,
  Mail,
  HelpCircle
} from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  
  const isDark = theme === 'dark';

  const notifications = [
    { id: 1, text: 'New task assigned to you', time: '5 min ago', read: false, icon: 'task' },
    { id: 2, text: 'Meeting in 30 minutes', time: '1 hour ago', read: false, icon: 'meeting' },
    { id: 3, text: 'Project deadline approaching', time: '2 hours ago', read: true, icon: 'deadline' },
    { id: 4, text: 'Team member commented on your task', time: '3 hours ago', read: true, icon: 'comment' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'task': return '📋';
      case 'meeting': return '📅';
      case 'deadline': return '⏰';
      default: return '💬';
    }
  };

  const getThemeClasses = () => {
    if (isDark) {
      return {
        navbar: 'bg-gray-900 border-gray-800',
        text: 'text-gray-200',
        textSecondary: 'text-gray-400',
        button: 'hover:bg-gray-800 text-gray-400',
        dropdown: 'bg-gray-800 border-gray-700',
        dropdownItem: 'hover:bg-gray-700 text-gray-300',
        searchInput: 'bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-500',
        badge: 'bg-indigo-500',
      };
    }
    return {
      navbar: 'bg-white border-gray-200',
      text: 'text-gray-800',
      textSecondary: 'text-gray-500',
      button: 'hover:bg-gray-100 text-gray-600',
      dropdown: 'bg-white border-gray-200',
      dropdownItem: 'hover:bg-gray-50 text-gray-700',
      searchInput: 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500',
      badge: 'bg-indigo-600',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <>
      <nav className={`${themeClasses.navbar} border-b h-16 flex items-center justify-between px-6 shadow-sm`}>
        {/* Left Section */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className={`p-2 rounded-lg transition-colors ${themeClasses.button} lg:hidden`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textSecondary}`} />
              <input
                type="text"
                placeholder="Search tasks, meetings, team members..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${themeClasses.searchInput}`}
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2 rounded-lg transition-colors ${themeClasses.button} md:hidden`}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${themeClasses.button}`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Help Button */}
          <button
            className={`p-2 rounded-lg transition-colors ${themeClasses.button} hidden sm:block`}
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg transition-colors relative ${themeClasses.button}`}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className={`absolute top-1 right-1 w-4 h-4 ${themeClasses.badge} text-white text-xs rounded-full flex items-center justify-center`}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-96 rounded-xl shadow-lg border z-50 ${themeClasses.dropdown}`}>
                <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`font-semibold ${themeClasses.text}`}>Notifications</h3>
                    <button className="text-sm text-indigo-500 hover:text-indigo-600">
                      Mark all as read
                    </button>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-4 border-b ${isDark ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'} cursor-pointer transition-colors ${!notif.read && (isDark ? 'bg-gray-800' : 'bg-indigo-50')}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{getNotificationIcon(notif.icon)}</div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${themeClasses.text}`}>{notif.text}</p>
                          <p className={`text-xs mt-1 ${themeClasses.textSecondary}`}>{notif.time}</p>
                        </div>
                        {!notif.read && (
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`p-3 text-center border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button className="text-sm text-indigo-500 hover:text-indigo-600 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${themeClasses.button}`}
            >
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <div className="hidden md:block text-left">
                <p className={`text-sm font-semibold ${themeClasses.text}`}>John Doe</p>
                <p className={`text-xs ${themeClasses.textSecondary}`}>john@taskflow.com</p>
              </div>
              <ChevronDown className={`w-4 h-4 ${themeClasses.textSecondary} hidden md:block`} />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-lg border z-50 ${themeClasses.dropdown}`}>
                <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">JD</span>
                    </div>
                    <div>
                      <p className={`font-semibold ${themeClasses.text}`}>John Doe</p>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>john.doe@taskflow.com</p>
                      <p className={`text-xs ${themeClasses.textSecondary}`}>Product Designer</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link to="/profile" className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${themeClasses.dropdownItem}`}>
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/settings" className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${themeClasses.dropdownItem}`}>
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </Link>
                  <Link to="/inbox" className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${themeClasses.dropdownItem}`}>
                    <Mail className="w-4 h-4" />
                    <span>Inbox</span>
                    <span className="ml-auto text-xs bg-indigo-500 text-white px-2 py-0.5 rounded-full">3</span>
                  </Link>
                </div>
                
                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} py-2`}>
                  <button className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-red-600 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}>
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className={`md:hidden p-4 border-b ${themeClasses.navbar}`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${themeClasses.textSecondary}`} />
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${themeClasses.searchInput}`}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Backdrop for dropdowns */}
      {(showNotifications || showProfileMenu) && (
        <div className="fixed inset-0 z-40" onClick={() => {
          setShowNotifications(false);
          setShowProfileMenu(false);
        }}></div>
      )}
    </>
  );
};

export default Navbar;