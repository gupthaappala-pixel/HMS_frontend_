import React from 'react';
import { useThemeMode } from '../../theme';

interface LoadingStateProps {
  rows?: number;
  type?: 'table' | 'cards' | 'details';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  rows = 5,
  type = 'table',
  className = '',
}) => {
  const { isDark } = useThemeMode();

  const pulseClass = isDark ? 'bg-slate-700/60' : 'bg-slate-200';

  if (type === 'cards') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`p-5 rounded-xl border animate-pulse space-y-3 ${
              isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className={`h-3 w-20 rounded ${pulseClass}`} />
              <div className={`h-8 w-8 rounded-lg ${pulseClass}`} />
            </div>
            <div className={`h-7 w-28 rounded ${pulseClass}`} />
            <div className={`h-3 w-32 rounded ${pulseClass}`} />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div
        className={`p-6 rounded-xl border animate-pulse space-y-5 ${
          isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        } ${className}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full ${pulseClass}`} />
          <div className="space-y-2">
            <div className={`h-5 w-40 rounded ${pulseClass}`} />
            <div className={`h-3 w-24 rounded ${pulseClass}`} />
          </div>
        </div>
        <div className="space-y-3 pt-4 border-t border-slate-700/40">
          <div className={`h-4 w-full rounded ${pulseClass}`} />
          <div className={`h-4 w-5/6 rounded ${pulseClass}`} />
          <div className={`h-4 w-4/6 rounded ${pulseClass}`} />
        </div>
      </div>
    );
  }

  // Default table skeleton
  return (
    <div
      className={`rounded-xl border overflow-hidden animate-pulse ${
        isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
      } ${className}`}
    >
      <div className={`h-11 border-b ${isDark ? 'bg-slate-900/40 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
      <div className="divide-y divide-slate-700/20 p-2 space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2 px-3">
            <div className={`h-4 w-1/4 rounded ${pulseClass}`} />
            <div className={`h-4 w-1/3 rounded ${pulseClass}`} />
            <div className={`h-4 w-1/6 rounded ${pulseClass}`} />
            <div className={`h-4 w-1/6 rounded ${pulseClass}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
