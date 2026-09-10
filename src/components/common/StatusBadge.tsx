import React from 'react';
import { useThemeMode } from '../../theme';

export type StatusType =
  | 'Completed'
  | 'Active'
  | 'Pending'
  | 'Waiting'
  | 'Processing'
  | 'In Consultation'
  | 'Under Consultation'
  | 'Cancelled'
  | 'Report Ready'
  | 'Low Stock'
  | 'Out of Stock'
  | 'Available'
  | 'Scheduled'
  | 'Confirmed'
  | 'Paid'
  | 'Unpaid'
  | 'Partially Paid'
  | 'Overdue'
  | 'Dispensed'
  | 'GREEN_ZONE'
  | 'YELLOW_ZONE'
  | 'RED_ZONE'
  | 'Normal'
  | 'Attention'
  | 'Critical'
  | string;

interface StatusBadgeProps {
  status: StatusType;
  size?: 'xs' | 'sm' | 'md';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  showDot = true,
}) => {
  const { isDark } = useThemeMode();
  const normalized = (status || '').toLowerCase().trim();

  let label = status;
  let colorStyle = {
    bg: isDark ? 'bg-slate-700/60' : 'bg-slate-100',
    text: isDark ? 'text-slate-300' : 'text-slate-700',
    border: isDark ? 'border-slate-600/40' : 'border-slate-200',
    dot: isDark ? 'bg-slate-400' : 'bg-slate-500',
  };

  // Success / Green / Completed / Available
  if (
    [
      'completed',
      'active',
      'available',
      'report ready',
      'paid',
      'dispensed',
      'confirmed',
      'green_zone',
      'green',
      'normal',
    ].includes(normalized)
  ) {
    if (normalized === 'green_zone') label = '🟢 Normal Zone';
    colorStyle = {
      bg: isDark ? 'bg-emerald-950/40' : 'bg-emerald-50',
      text: isDark ? 'text-emerald-400' : 'text-emerald-700',
      border: isDark ? 'border-emerald-800/40' : 'border-emerald-200',
      dot: 'bg-emerald-500',
    };
  }
  // Warning / Yellow / Pending / Attention
  else if (
    [
      'pending',
      'waiting',
      'low stock',
      'partially paid',
      'yellow_zone',
      'yellow',
      'attention',
      'scheduled',
    ].includes(normalized)
  ) {
    if (normalized === 'yellow_zone') label = '🟡 Attention Zone';
    colorStyle = {
      bg: isDark ? 'bg-amber-950/40' : 'bg-amber-50',
      text: isDark ? 'text-amber-400' : 'text-amber-700',
      border: isDark ? 'border-amber-800/40' : 'border-amber-200',
      dot: 'bg-amber-500',
    };
  }
  // Info / Blue / Processing / In Consultation
  else if (
    [
      'processing',
      'in consultation',
      'under consultation',
      'in progress',
      'consulting',
    ].includes(normalized)
  ) {
    colorStyle = {
      bg: isDark ? 'bg-blue-950/40' : 'bg-blue-50',
      text: isDark ? 'text-blue-400' : 'text-blue-700',
      border: isDark ? 'border-blue-800/40' : 'border-blue-200',
      dot: 'bg-blue-500',
    };
  }
  // Danger / Red / Critical / Cancelled / Out of Stock / Unpaid / Overdue
  else if (
    [
      'cancelled',
      'out of stock',
      'unpaid',
      'overdue',
      'red_zone',
      'red',
      'critical',
    ].includes(normalized)
  ) {
    if (normalized === 'red_zone') label = '🔴 Critical Zone';
    colorStyle = {
      bg: isDark ? 'bg-rose-950/40' : 'bg-rose-50',
      text: isDark ? 'text-rose-400' : 'text-rose-700',
      border: isDark ? 'border-rose-800/40' : 'border-rose-200',
      dot: 'bg-rose-500',
    };
  }

  const sizeClass =
    size === 'xs'
      ? 'px-2 py-0.5 text-[10px]'
      : size === 'md'
      ? 'px-3 py-1 text-xs sm:text-sm'
      : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${sizeClass} ${colorStyle.bg} ${colorStyle.text} ${colorStyle.border}`}
    >
      {showDot && !label.startsWith('🟢') && !label.startsWith('🟡') && !label.startsWith('🔴') && (
        <span className={`w-1.5 h-1.5 rounded-full ${colorStyle.dot}`} />
      )}
      <span>{label}</span>
    </span>
  );
};
