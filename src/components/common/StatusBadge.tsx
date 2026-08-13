import React from 'react';

export type StatusType = 'Completed' | 'Active' | 'Pending' | 'Waiting' | 'Processing' | 'In Consultation' | 'Cancelled' | 'Report Ready' | 'Low Stock' | 'Out of Stock' | 'Available';

interface StatusBadgeProps {
  status: StatusType | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();

  let styleClass = 'badge-status-pending';

  if (['completed', 'active', 'available', 'report ready', 'completed'].includes(normalized)) {
    styleClass = 'badge-status-completed';
  } else if (['processing', 'in consultation', 'under consultation'].includes(normalized)) {
    styleClass = 'badge-status-processing';
  } else if (['cancelled', 'out of stock'].includes(normalized)) {
    styleClass = 'badge-status-cancelled';
  } else if (['pending', 'waiting', 'low stock'].includes(normalized)) {
    styleClass = 'badge-status-pending';
  }

  return (
    <span className={`badge-status ${styleClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75"></span>
      {status}
    </span>
  );
};
