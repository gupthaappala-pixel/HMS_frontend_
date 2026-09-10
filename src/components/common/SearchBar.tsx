import React from 'react';
import { useThemeMode } from '../../theme';
import { IconSearch, IconX } from '@tabler/icons-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  width?: string;
  onClear?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  width = 'w-full max-w-md',
  onClear,
}) => {
  const { isDark } = useThemeMode();

  return (
    <div className={`relative ${width} ${className}`}>
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IconSearch size={16} className={isDark ? 'text-slate-500' : 'text-slate-400'} />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-9 pr-8 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 border focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
          isDark
            ? 'bg-slate-900/80 border-slate-700 text-slate-100 placeholder-slate-500'
            : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className={`absolute inset-y-0 right-0 pr-2.5 flex items-center transition-colors ${
            isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <IconX size={14} />
        </button>
      )}
    </div>
  );
};
