import React from 'react';

export interface TimelineStep {
  title: string;
  time?: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

interface TimelineProps {
  steps: TimelineStep[];
}

export const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
      {steps.map((step, idx) => {
        let dotStyle = 'bg-slate-200 border-white text-slate-400';
        if (step.status === 'completed') dotStyle = 'bg-emerald-500 border-emerald-100 text-white';
        if (step.status === 'current') dotStyle = 'bg-sky-500 border-sky-100 text-white ring-4 ring-sky-50';

        return (
          <div key={idx} className="relative flex items-start group">
            <div
              className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${dotStyle}`}
            >
              {step.status === 'completed' ? '✓' : idx + 1}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
                {step.time && <span className="text-xs text-slate-400 font-medium">{step.time}</span>}
              </div>
              {step.description && <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
