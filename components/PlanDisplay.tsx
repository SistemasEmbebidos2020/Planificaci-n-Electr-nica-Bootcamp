
import React from 'react';
import type { MonthPlan } from '../types';
import WeekCard from './WeekCard';

interface PlanDisplayProps {
  plan: MonthPlan[];
}

const getIconForMonth = (month: number) => {
  if (month === 1) return '⚡️'; // Analog
  if (month === 2) return '🔢'; // Digital
  if (month === 3) return '🤖'; // ESP32
  return '📚';
};

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  return (
    <div className="space-y-12">
      {plan.map((monthData) => (
        <section key={monthData.month} className="bg-slate-800/70 p-6 rounded-2xl shadow-xl border border-slate-700">
          <h2 className="text-3xl font-bold mb-6 text-teal-400 flex items-center gap-4">
            <span className="text-4xl">{getIconForMonth(monthData.month)}</span>
            <span>Mes {monthData.month}: {monthData.title}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthData.weeks.map((weekData) => (
              <WeekCard key={weekData.week} week={weekData} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PlanDisplay;
