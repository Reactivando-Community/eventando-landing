'use client';

import { useState } from 'react';

export default function AgendaFilter({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'Todas', color: 'bg-dark-600' },
    { id: 'keynote', label: 'Keynotes', color: 'bg-gradient-to-r from-primary-600 to-primary-700' },
    { id: 'parallel', label: 'Sessões Paralelas', color: 'bg-gradient-to-r from-green-600 to-teal-600' },
    { id: 'break', label: 'Intervalos', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'opening', label: 'Abertura', color: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    { id: 'closing', label: 'Encerramento', color: 'bg-gradient-to-r from-indigo-600 to-purple-600' }
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeFilter === filter.id
              ? `${filter.color} text-white shadow-lg`
              : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
