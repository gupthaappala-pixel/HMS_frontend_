import React from 'react';
import { useThemeMode } from '../../theme';

interface PageContainerProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  actions,
  children,
  className = '',
}) => {
  const { isDark } = useThemeMode();

  return (
    <div className={`space-y-6 pb-12 ${className}`}>
      {/* Top Header & Actions if provided */}
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            {title && (
              <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {title}
              </h1>
            )}
            {description && (
              <p className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
        </div>
      )}

      {/* Page Content */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};
