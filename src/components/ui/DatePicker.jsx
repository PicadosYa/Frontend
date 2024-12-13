import React, { useEffect, useState } from 'react';
import { formatISO } from 'date-fns';

export const DatePicker = ({ mode = 'single', selected, onSelect }) => {
  const [date, setDate] = useState(selected);

  //console.log(date.toLocaleString({ye}).split(',')[0].replaceAll('/', '-'));
  
  const handleDateChange = (newDate) => {
    setDate(newDate);
    onSelect(newDate);
  };

  return (
    <div className="relative">
      <input 
        type="date" 
        value={date instanceof Date ? formatISO(date, { representation: 'date' }) : date}
        onChange={(e) => handleDateChange(new Date(e.target.value+ 'T01:00:00'))}
        className="bg-neutral-700 text-white p-2 rounded-lg"
      />
    </div>
  );
};


export const RangeDatePicker = ({ selected, onSelect }) => {
  const [dateRange, setDateRange] = useState({
    from: selected?.from || new Date(),
    to: selected?.to || new Date()
  });

  const handleFromDateChange = (newFromDate) => {
    const updatedRange = { ...dateRange, from: newFromDate };
    setDateRange(updatedRange);
    onSelect(updatedRange);
  };

  const handleToDateChange = (newToDate) => {
    const updatedRange = { ...dateRange, to: newToDate };
    setDateRange(updatedRange);
    onSelect(updatedRange);
  };

  useEffect(() => {
    setDateRange(selected);
  }, [selected]);

  return (
    <div className="flex space-x-2">
      <input 
        type="date" 
        value={dateRange.from.toISOString().split('T')[0]}
        onChange={(e) => handleFromDateChange(new Date(e.target.value + 'T01:00:00'))}
        className="bg-neutral-700 text-white p-2 rounded-lg"
      />
      <input 
        type="date" 
        value={dateRange.to.toISOString().split('T')[0]}
        onChange={(e) => handleToDateChange(new Date(e.target.value+ 'T01:00:00'))}
        className="bg-neutral-700 text-white p-2 rounded-lg"
      />
    </div>
  );
};
