import React from 'react';
import { Priority } from '../../types';

interface FilterSidebarProps {
  filterPriority: string;
  setFilterPriority: (priority: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filterPriority, setFilterPriority }) => {
  const filters = [
    { key: 'ALL', label: '✓ All Tasks', icon: '✓', color: 'indigo' },
    { key: Priority.LOW, label: 'Low Priority', icon: '🟢', color: 'emerald' },
    { key: Priority.MEDIUM, label: 'Medium Priority', icon: '🟡', color: 'amber' },
    { key: Priority.HIGH, label: 'High Priority', icon: '🔴', color: 'rose' },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-slate-50 to-white border-l border-slate-200 flex flex-col h-full overflow-y-auto shadow-lg shadow-slate-100/50 relative z-0">
      {/* Header */}
      <div className="sticky top-0 px-6 py-5 border-b border-slate-200 bg-white">
        <h3 className="text-lg font-black text-slate-900 tracking-tight">Task Filters</h3>
        <p className="text-xs text-slate-500 mt-1 font-medium">Filter tasks by priority</p>
      </div>

      {/* Filter Options */}
      <div className="p-5 space-y-3 flex-1">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setFilterPriority(filter.key)}
            className={`w-full px-4 py-4 rounded-xl text-sm font-bold transition-all text-left flex items-center gap-3 active:scale-95 ${
              filterPriority === filter.key
                ? `bg-gradient-to-r ${
                    filter.color === 'indigo' ? 'from-indigo-600 to-indigo-700' :
                    filter.color === 'emerald' ? 'from-emerald-600 to-emerald-700' :
                    filter.color === 'amber' ? 'from-amber-600 to-amber-700' :
                    'from-rose-600 to-rose-700'
                  } text-white shadow-lg ${
                    filter.color === 'indigo' ? 'shadow-indigo-200' :
                    filter.color === 'emerald' ? 'shadow-emerald-200' :
                    filter.color === 'amber' ? 'shadow-amber-200' :
                    'shadow-rose-200'
                  } border-0`
                : `bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 group`
            }`}
          >
            <span className={`text-xl transition-transform ${filterPriority === filter.key ? 'scale-120' : 'group-hover:scale-110'}`}>{filter.icon}</span>
            <div className="flex-1">
              <span>{filter.label}</span>
            </div>
            {filterPriority === filter.key && (
              <svg className="w-5 h-5 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="px-6 py-5 border-t border-slate-200 bg-gradient-to-b from-transparent to-slate-50/50">
        <div className="bg-indigo-50 rounded-lg border border-indigo-200 p-4">
          <p className="text-xs font-bold text-indigo-900 mb-2">💡 Filter Tip</p>
          <p className="text-xs text-indigo-700 leading-relaxed">Click any priority to filter tasks instantly. Select "All Tasks" to see everything.</p>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
