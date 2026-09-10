import React from 'react';
import { useThemeMode } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'subtle' | 'danger' | 'success';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

export const AppButton: React.FC<AppButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  className = '',
  children,
  ...props
}) => {
  const { isDark } = useThemeMode();

  const sizeClasses: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1 text-xs gap-1.5 rounded-md',
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5 rounded-lg',
    md: 'px-4 py-2 text-xs sm:text-sm font-semibold gap-2 rounded-lg',
    lg: 'px-5 py-2.5 text-sm sm:text-base font-semibold gap-2.5 rounded-xl',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: isDark
      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm shadow-blue-900/30 active:bg-blue-700'
      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 active:bg-blue-800',
    secondary: isDark
      ? 'bg-teal-600 hover:bg-teal-500 text-white shadow-sm active:bg-teal-700'
      : 'bg-teal-700 hover:bg-teal-800 text-white shadow-sm active:bg-teal-900',
    outline: isDark
      ? 'border border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600 active:bg-slate-700'
      : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:bg-slate-100',
    subtle: isDark
      ? 'text-slate-300 hover:bg-slate-800 active:bg-slate-700'
      : 'text-slate-600 hover:bg-slate-100 active:bg-slate-200',
    danger: isDark
      ? 'bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 active:bg-rose-600/40'
      : 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 active:bg-rose-200',
    success: isDark
      ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 active:bg-emerald-600/40'
      : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 active:bg-emerald-200',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
