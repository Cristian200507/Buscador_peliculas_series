import React from "react";

export default function SortSelect({ ordering, onChange }) {
  return (
    <div className="sort">
      <label>Ordenar por año: </label>
      <select value={ordering} onChange={e => onChange(e.target.value)}>
        <option value="-year">Más reciente (desc)</option>
        <option value="year">Más antiguo (asc)</option>
      </select>
    </div>
  );
}
