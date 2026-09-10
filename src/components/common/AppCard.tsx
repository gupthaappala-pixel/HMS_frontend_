import React from 'react';
import { useThemeMode } from '../../theme';

interface AppCardProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const AppCard: React.FC<AppCardProps> = ({
  title,
  subtitle,
  icon,
  headerAction,
  children,
  className = '',
  noPadding = false,
}) => {
  const { isDark } = useThemeMode();

  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700/80 shadow-sm'
          : 'bg-white border-slate-200/90 shadow-sm shadow-slate-100'
      } ${className}`}
    >
      {(title || headerAction) && (
        <div
          className={`flex items-center justify-between px-5 py-4 border-b ${
            isDark ? 'border-slate-700/80' : 'border-slate-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {icon && (
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className={`text-sm font-semibold leading-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`text-xs mt-0.5 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction && <div className="flex items-center gap-2">{headerAction}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  );
};
