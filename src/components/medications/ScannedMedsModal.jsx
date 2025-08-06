import React, { useState, useEffect } from 'react';
import './ScannedMedsModal.css';

const ScannedMedsModal = ({ initialMeds, onBulkAdd, onClose }) => {
  const [editableMeds, setEditableMeds] = useState([]);

  useEffect(() => {
    // When modal opens, add default type and time to each scanned med
    const medsWithDefaults = initialMeds.map(med => ({
      ...med,
      type: 'Tablet', // Default type
      time: '08:00',   // Default time
    }));
    setEditableMeds(medsWithDefaults);
  }, [initialMeds]);

  const handleInputChange = (index, field, value) => {
    const updatedMeds = [...editableMeds];
    updatedMeds[index] = { ...updatedMeds[index], [field]: value };
    setEditableMeds(updatedMeds);
  };

  const handleConfirmAdd = () => {
    onBulkAdd(editableMeds);
    onClose();
  };

  return (
    <div className="scanned-meds-container">
      <p>Review the scanned medications. You can adjust the details before adding them.</p>
      <div className="scanned-meds-list">
        {editableMeds.map((med, index) => (
          <div key={index} className="scanned-med-item">
            {/* The four form groups will now neatly fall into the 2x2 grid */}
            <div className="form-group">
              <label>Medication Name</label>
              <input
                type="text"
                value={med.name || ''}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Dosage</label>
              <input
                type="text"
                value={med.dosage || ''}
                onChange={(e) => handleInputChange(index, 'dosage', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select value={med.type} onChange={e => handleInputChange(index, 'type', e.target.value)}>
                <option>Tablet</option>
                <option>Capsule</option>
                <option>Syrup</option>
                <option>Injection</option>
                <option>Inhaler</option>
                <option>Cream</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={med.time}
                onChange={e => handleInputChange(index, 'time', e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="modal-actions">
        <button onClick={handleConfirmAdd} className="add-btn">
          Add All to Schedule
        </button>
      </div>
    </div>
  );
};

export default ScannedMedsModal;