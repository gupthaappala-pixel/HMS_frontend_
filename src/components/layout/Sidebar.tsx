import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeMode } from '../../theme';
import { navigationConfig, bottomNavigationConfig, NavItemConfig } from '../../config/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useThemeMode();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleNav = (path: string) => {
    navigate(path);
    if (onCloseMobile) onCloseMobile();
  };

  const renderNavItem = (item: NavItemConfig) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));

    return (
      <button
        key={item.path}
        type="button"
        onClick={() => handleNav(item.path)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all duration-150 group cursor-pointer ${
          isActive
            ? isDark
              ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
              : 'bg-blue-50 text-blue-700 font-bold border border-blue-100/80 shadow-xs'
            : isDark
            ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`transition-colors ${
              isActive
                ? isDark
                  ? 'text-blue-400'
                  : 'text-blue-600'
                : isDark
                ? 'text-slate-400 group-hover:text-slate-200'
                : 'text-slate-400 group-hover:text-slate-700'
            }`}
          >
            <Icon size={19} stroke={isActive ? 2.2 : 1.8} />
          </span>
          <span className="truncate">{item.label}</span>
        </div>

        {item.badge && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              isActive
                ? isDark
                  ? 'bg-blue-500/30 text-blue-300'
                  : 'bg-blue-600 text-white'
                : isDark
                ? 'bg-slate-800 text-slate-400'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {item.badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`w-64 border-r flex flex-col fixed inset-y-0 left-0 z-30 transition-colors duration-200 ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      {/* Brand Header */}
      <div
        className={`h-16 flex items-center justify-between px-5 border-b transition-colors ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 flex items-center justify-center text-white font-extrabold text-base shadow-sm shadow-blue-600/30">
            ✚
          </div>
          <div>
            <h1 className={`font-bold text-sm tracking-tight leading-none ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              CareCloud HMS
            </h1>
            <span className="text-[10px] font-semibold tracking-wider text-teal-600 dark:text-teal-400 uppercase">
              Clinical OS
            </span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
            Main Menu
          </span>
        </div>
        {navigationConfig.map((item) => renderNavItem(item))}
      </div>

      {/* Bottom Section */}
      <div
        className={`p-3 border-t space-y-1 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50/50'
        }`}
      >
        {bottomNavigationConfig.map((item) => renderNavItem(item))}

        {/* User Mini Profile */}
        <div
          className={`mt-2 p-2.5 rounded-xl border flex items-center gap-2.5 transition-colors ${
            isDark ? 'bg-slate-800/80 border-slate-700/60' : 'bg-white border-slate-200/80 shadow-2xs'
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
            {(user?.firstName || user?.username || 'U').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className={`text-xs font-semibold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              {[user?.firstName, user?.lastName].filter(Boolean).join(' ') || user?.username || 'Staff'}
            </p>
            <p className={`text-[10px] font-medium truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {user?.role || 'Clinician'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
