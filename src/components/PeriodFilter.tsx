import React from 'react';

export type PeriodType = 'day' | 'month' | 'year' | 'custom';

interface PeriodFilterProps {
  periodType: PeriodType;
  onPeriodChange: (period: PeriodType) => void;
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({
  periodType,
  onPeriodChange,
  startDate,
  endDate,
  onDateChange
}) => {
  const handlePeriodChange = (period: PeriodType) => {
    onPeriodChange(period);
    
    const now = new Date();
    let newStartDate: Date;
    let newEndDate: Date;

    switch (period) {
      case 'day':
        newStartDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        newEndDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        break;
      case 'month':
        newStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
        newEndDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        break;
      case 'year':
        newStartDate = new Date(now.getFullYear(), 0, 1);
        newEndDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
        break;
      default:
        return; // Para 'custom', não alteramos as datas
    }

    onDateChange(newStartDate, newEndDate);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Filtros de período */}
        <div className="flex gap-2">
          <button
            onClick={() => handlePeriodChange('day')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              periodType === 'day'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            Hoje
          </button>
          <button
            onClick={() => handlePeriodChange('month')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              periodType === 'month'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            Este Mês
          </button>
          <button
            onClick={() => handlePeriodChange('year')}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              periodType === 'year'
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
            }`}
          >
            Este Ano
          </button>
        </div>

        {/* Filtros de data customizada */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Período personalizado:</span>
          <input
            type="date"
            value={formatDate(startDate)}
            onChange={(e) => {
              const newStartDate = new Date(e.target.value);
              onDateChange(newStartDate, endDate);
              onPeriodChange('custom');
            }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span className="text-sm text-gray-600">até</span>
          <input
            type="date"
            value={formatDate(endDate)}
            onChange={(e) => {
              const newEndDate = new Date(e.target.value);
              onDateChange(startDate, newEndDate);
              onPeriodChange('custom');
            }}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodFilter; 