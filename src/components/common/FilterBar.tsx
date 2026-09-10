import React from 'react';
import { useThemeMode } from '../../theme';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterBarProps {
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  selectedValue,
  onSelect,
  className = '',
}) => {
  const { isDark } = useThemeMode();

  return (
    <div className={`flex items-center gap-1.5 flex-wrap overflow-x-auto py-1 ${className}`}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border cursor-pointer ${
              isSelected
                ? isDark
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                  : 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : isDark
                ? 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700/60 hover:text-slate-100'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected
                    ? isDark
                      ? 'bg-blue-800/80 text-blue-100'
                      : 'bg-blue-700 text-white'
                    : isDark
                    ? 'bg-slate-700 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
