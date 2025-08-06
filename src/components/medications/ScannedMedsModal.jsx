import React, { useState, useEffect } from 'react';
import './ScannedMedsModal.css'; // We'll create this CSS file next

const ScannedMedsModal = ({ initialMeds, onBulkAdd, onClose }) => {
  const [editableMeds, setEditableMeds] = useState([]);

  // When the modal opens, populate the state with the scanned meds
  useEffect(() => {
    setEditableMeds(initialMeds);
  }, [initialMeds]);

  // Handle changes to the name or dosage of a specific medication in the list
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
      <p>Review the scanned medications below. You can make changes before adding them to your schedule.</p>
      <div className="scanned-meds-list">
        {editableMeds.map((med, index) => (
          <div key={index} className="scanned-med-item">
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