import React, { useState } from 'react';

export default function FilterPopup({ show, onClose, onApply }) {
  if (!show) return null;

  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    date: '',
    hour: '',
    sex: '',
    availability: ''
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  return (
    <div className="filter-popup">
      <label>
        Min Price:
        <input name="minPrice" type="number" min="1" placeholder="e.g. 10" onChange={handleChange} />
      </label>
      <label>
        Max Price:
        <input name="maxPrice" type="number" min="1" placeholder="e.g. 100" onChange={handleChange} />
      </label>
      <label>
        Date:
        <input name="date" type="date" onChange={handleChange} />
      </label>
      <label>
        Hour:
        <input name="hour" type="time" onChange={handleChange} />
      </label>
      <label>
        Driver Sex:
        <select name="sex" onChange={handleChange}>
          <option value="">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Availability:
        <select name="availability" onChange={handleChange}>
          <option value="">Any</option>
          <option value="open">Open</option>
          <option value="full">Full</option>
        </select>
      </label>
      <button className="apply-filter" onClick={handleApply}>Apply</button>
    </div>
  );
}
