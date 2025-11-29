
import React from 'react';
import type { WeekPlan } from '../types';

interface WeekCardProps {
  week: WeekPlan;
}

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan-400 flex-shrink-0"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);


const WeekCard: React.FC<WeekCardProps> = ({ week }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors duration-300 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4 text-slate-100">
        <span className="text-cyan-400 font-bold">Semana {week.week}:</span> {week.title}
      </h3>
      <ul className="space-y-3 text-slate-300 flex-grow">
        {week.topics.map((topic, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckIcon />
            <span>{topic}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeekCard;
