import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../features/authentication/redux/authSlice';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-20 px-6 flex items-center justify-between">
      {/* Global Search Bar */}
      <div className="w-96 relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search patients, doctors, records..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notifications Bell */}
        <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg relative transition-colors">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>

        {/* User Profile Pill */}
        {(() => {
          const displayName = user
            ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username
            : 'User Admin';
          const avatarInitial = displayName.charAt(0).toUpperCase();

          return (
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700">
                {avatarInitial}
              </div>
              <div className="hidden md:block text-left">
                <h4 className="text-xs font-semibold text-slate-900 leading-tight">{displayName}</h4>
                <span className="text-[10px] font-medium text-slate-500 leading-none">{user?.role || 'Staff Member'}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="ml-2 text-xs text-slate-400 hover:text-rose-600 font-semibold transition-colors"
              >
                Logout
              </button>
            </div>
          );
        })()}
      </div>
    </header>
  );
};
