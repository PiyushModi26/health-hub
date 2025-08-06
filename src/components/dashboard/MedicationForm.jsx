import React, { useState, useEffect } from 'react';
import AIScanner from './AIScanner';

const MedicationForm = ({ onAdd, onUpdate, editingMedication, setEditingMedication }) => {
  const initialFormState = { name: '', dosage: '', type: 'Tablet', time: '08:00' };
  const [med, setMed] = useState(initialFormState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingMedication) {
      setMed(editingMedication);
      setError(''); // Clear any previous errors when editing
    } else {
      setMed(initialFormState);
    }
  }, [editingMedication]);

  const handleAIScan = (scannedData) => {
    setMed(prev => ({
      ...prev,
      name: scannedData.name || '',
      dosage: scannedData.dosage || ''
    }));
    setError('AI results populated. Please select a Type and Time, then click Add.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!med.name || !med.dosage || !med.time) {
      setError('All fields are required.');
      return;
    }
    setError('');

    if (editingMedication) {
      onUpdate(med);
    } else {
      onAdd({ ...med, id: Date.now() });
    }
    setMed(initialFormState); // Reset form after submission
  };
  
  const handleCancelEdit = () => {
    setEditingMedication(null);
    setError('');
  };

  return (
    <div className="medication-form-container">
      <h3>{editingMedication ? 'Edit Medication' : 'Add New Medication'}</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label>Medication Name</label>
          <input type="text" value={med.name} onChange={e => setMed({ ...med, name: e.target.value })} placeholder="e.g., Paracetamol" />
        </div>
        <div className="form-group">
          <label>Dosage</label>
          <input type="text" value={med.dosage} onChange={e => setMed({ ...med, dosage: e.target.value })} placeholder="e.g., 500mg" />
        </div>
        <div className="form-group">
          <label>Type</label>
          <select value={med.type} onChange={e => setMed({ ...med, type: e.target.value })}>
            <option>Tablet</option>
            <option>Capsule</option>
            <option>Syrup</option>
            <option>Injection</option>
            <option>Inhaler</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Time</label>
          <input type="time" value={med.time} onChange={e => setMed({ ...med, time: e.target.value })} />
        </div>
        
        {editingMedication ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button type="submit" className="update-btn">Update Medication</button>
            <button type="button" onClick={handleCancelEdit} className="add-btn" style={{backgroundColor: 'var(--secondary-color)'}}>Cancel Edit</button>
          </div>
        ) : (
          <button type="submit" className="add-btn">Add Medication</button>
        )}
      </form>

      {!editingMedication && <AIScanner onScanComplete={handleAIScan} setFormError={setError} />}
    </div>
  );
};

export default MedicationForm;