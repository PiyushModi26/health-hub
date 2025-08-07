import React, { useState, useEffect } from 'react';
import AIScanner from './AIScanner';
import Modal from '../common/Modal';
import ScannedMedsModal from '../medications/ScannedMedsModal';

const MedicationForm = ({ onAdd, onBulkAdd, onUpdate, editingMedication, setEditingMedication }) => {
  const initialFormState = { name: '', dosage: '', type: 'Tablet', time: '08:00', imageUrl: '' };
  const [med, setMed] = useState(initialFormState);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedMeds, setScannedMeds] = useState([]);

  useEffect(() => {
    if (editingMedication) {
      setMed({ ...initialFormState, ...editingMedication });
      setError('');
    } else {
      setMed(initialFormState);
    }
  }, [editingMedication]);

  const handleScanSuccess = (medsArray) => {
    setScannedMeds(medsArray);
    setIsModalOpen(true);
  };

  const handleBulkAdd = (medsToAdd) => {
    const medsWithIds = medsToAdd.map(med => ({
      ...med,
      id: Date.now() + Math.random(), 
    }));
    onBulkAdd(medsWithIds); 
    setIsModalOpen(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!med.name || !med.dosage || !med.time) {
      setError('Name, Dosage, and Time are required.');
      return;
    }
    setError('');
    if (editingMedication) {
      onUpdate(med);
    } else {
      onAdd({ ...med, id: Date.now() });
    }
    setMed(initialFormState);
  };

  const handleCancelEdit = () => {
    setEditingMedication(null);
  };

  return (
    <>
      <div className="medication-form-container">
        {!editingMedication && (
            <AIScanner onScanSuccess={handleScanSuccess} setFormError={setError} />
        )}
        <h3 style={{marginTop: '2rem'}}>{editingMedication ? 'Edit Medication' : 'Add New Medication'}</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Medication Name</label>
            <input type="text" value={med.name} onChange={e => setMed({ ...med, name: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Dosage</label>
            <input type="text" value={med.dosage} onChange={e => setMed({ ...med, dosage: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Type</label>
            <select value={med.type} onChange={e => setMed({ ...med, type: e.target.value })}>
              <option>Tablet</option> <option>Capsule</option> <option>Syrup</option>
              <option>Injection</option> <option>Inhaler</option> <option>Cream</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Time</label>
            <input type="time" value={med.time} onChange={e => setMed({ ...med, time: e.target.value })} required />
          </div>
           <div className="form-group">
            <label>Image URL (Optional)</label>
            <input type="text" value={med.imageUrl} onChange={e => setMed({ ...med, imageUrl: e.target.value })} />
          </div>
          {editingMedication ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="submit" className="update-btn">Update</button>
              <button type="button" onClick={handleCancelEdit} style={{backgroundColor: 'var(--secondary-color)'}}>Cancel</button>
            </div>
          ) : (
            <button type="submit" className="add-btn">Add Medication</button>
          )}
        </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Scanned Results">
        <ScannedMedsModal initialMeds={scannedMeds} onBulkAdd={handleBulkAdd} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default MedicationForm;