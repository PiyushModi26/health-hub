import React, { useMemo } from 'react';

const MedicationList = ({ medications, onDelete, onEdit, isReadOnly = false }) => {
  const sortedMeds = useMemo(() => {
    return [...medications].sort((a, b) => a.time.localeCompare(b.time));
  }, [medications]);

  if (medications.length === 0) {
    return <div className="empty-state">No medications scheduled.</div>;
  }

  return (
    <ul className="medication-list">
      {sortedMeds.map(med => (
        <li key={med.id} className="medication-item">
          <div className="medication-info">
            <span className="medication-time">{med.time}</span>
            <div className="medication-details">
              <h4>{med.name}</h4>
              <p>{med.dosage} &bull; {med.type}</p>
            </div>
          </div>
          {!isReadOnly && (
            <div className="medication-actions">
              <button onClick={() => onEdit(med)} className="edit-btn">Edit</button>
              <button onClick={() => onDelete(med.id)} className="remove-btn">Remove</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MedicationList;