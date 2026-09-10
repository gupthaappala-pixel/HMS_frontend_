import React from 'react';
import { useThemeMode } from '../../theme';
import { AppButton } from './AppButton';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  const { isDark } = useThemeMode();

  return (
    <div
      className={`rounded-xl border p-8 sm:p-12 text-center flex flex-col items-center justify-center transition-colors ${
        isDark ? 'bg-slate-800/40 border-slate-700/60' : 'bg-slate-50/70 border-slate-200/80'
      } ${className}`}
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-inner ${
          isDark ? 'bg-slate-800 text-slate-400 border border-slate-700' : 'bg-white text-slate-400 border border-slate-200'
        }`}
      >
        {icon || '📋'}
      </div>
      <h3 className={`text-base font-semibold mb-1 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        {title}
      </h3>
      {description && (
        <p className={`text-xs sm:text-sm max-w-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <AppButton variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </AppButton>
      )}
    </div>
  );
};
