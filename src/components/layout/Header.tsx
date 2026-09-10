import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../features/authentication/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../theme';
import {
  IconSun,
  IconMoon,
  IconSearch,
  IconBell,
  IconMenu2,
  IconLogout,
} from '@tabler/icons-react';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, toggleThemeMode } = useThemeMode();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username
    : 'Clinical Staff';
  const avatarInitial = (displayName || 'U').charAt(0).toUpperCase();

  return (
    <header
      className={`h-16 border-b fixed top-0 right-0 left-0 lg:left-64 z-20 px-4 sm:px-6 flex items-center justify-between transition-colors duration-200 backdrop-blur-md ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white/95 border-slate-200 text-slate-900'
      }`}
    >
      {/* Left side: Mobile Toggle + Global Search */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className={`p-2 rounded-lg lg:hidden transition-colors ${
            isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-label="Open Navigation Menu"
        >
          <IconMenu2 size={20} />
        </button>

        <div className="w-56 sm:w-80 md:w-96 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch size={16} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
          </span>
          <input
            type="text"
            placeholder="Search patients, doctors, records... (Press /)"
            className={`w-full pl-9 pr-4 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-slate-100 placeholder-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Light / Dark Mode Toggle Button */}
        <button
          type="button"
          onClick={toggleThemeMode}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className={`p-2 rounded-xl border transition-all duration-150 cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700 hover:text-amber-200'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-blue-600'
          }`}
          aria-label="Toggle Theme"
        >
          {isDark ? <IconSun size={18} stroke={2} /> : <IconMoon size={18} stroke={2} />}
        </button>

        {/* Notifications Bell */}
        <button
          type="button"
          className={`p-2 rounded-xl border relative transition-colors cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          aria-label="Notifications"
        >
          <IconBell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        </button>

        {/* User Profile Pill */}
        <div
          className={`flex items-center gap-2.5 pl-2 sm:pl-3 border-l ${
            isDark ? 'border-slate-800' : 'border-slate-200'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
            {avatarInitial}
          </div>

          <div className="hidden md:block text-left">
            <h4 className={`text-xs font-semibold leading-tight truncate max-w-[120px] ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {displayName}
            </h4>
            <span className={`text-[10px] font-medium leading-none ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {user?.role || 'Clinician'}
            </span>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isDark
                ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-950/30'
                : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
            }`}
            aria-label="Log out"
          >
            <IconLogout size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};
