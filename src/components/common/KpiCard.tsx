import React from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, subtext, icon, trend }) => {
  let trendColor = 'text-slate-500';
  if (trend === 'up') trendColor = 'text-emerald-600';
  if (trend === 'down') trendColor = 'text-rose-600';

  return (
    <div className="hms-card p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h3>
        {subtext && <p className={`text-xs mt-1.5 font-medium ${trendColor}`}>{subtext}</p>}
      </div>
      <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xl shrink-0">
        {icon}
      </div>
    </div>
  );
};
