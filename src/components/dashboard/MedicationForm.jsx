import React, { useState, useEffect } from 'react';
import AIScanner from './AIScanner';
import Modal from '../common/Modal';
import ScannedMedsModal from '../medications/ScannedMedsModal';

// Receive the 'onBulkAdd' prop from the parent page
const MedicationForm = ({ onAdd, onBulkAdd, onUpdate, editingMedication, setEditingMedication }) => {
  const initialFormState = { name: '', dosage: '', type: 'Tablet', time: '08:00' };
  const [med, setMed] = useState(initialFormState);
  const [error, setError] = useState('');
  
  // State to manage the modal for AI results
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scannedMeds, setScannedMeds] = useState([]);

  useEffect(() => {
    if (editingMedication) {
      setMed(editingMedication);
      setError(''); 
    } else {
      setMed(initialFormState);
    }
  }, [editingMedication]);

  // Called when AI scan is successful
  const handleScanSuccess = (medsArray) => {
    setScannedMeds(medsArray);
    setIsModalOpen(true);
  };

  // --- THIS IS THE CORRECTED FUNCTION ---
  // It now prepares all meds and calls the single 'onBulkAdd' function
  const handleBulkAdd = (medsToAdd) => {
    // 1. Create a new array where each medication has a unique ID
    const medsWithIds = medsToAdd.map(med => ({
      ...med,
      id: Date.now() + Math.random(), 
    }));
    
    // 2. Call the single function to add the entire array to the state
    onBulkAdd(medsWithIds); 
    
    // 3. Close the modal
    setIsModalOpen(false);
  };
  
  // Handles the submission of the MANUAL form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!med.name || !med.dosage || !med.time) {
      setError('Medication Name, Dosage, and Time are required.');
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
    // Use a React Fragment to return multiple top-level elements
    <>
      {/* Container for the form and AI scanner */}
      <div className="medication-form-container">
        
        {/* --- Section 1: AI Scanner (Only shows when not editing) --- */}
        {!editingMedication && (
          <>
            <AIScanner onScanSuccess={handleScanSuccess} setFormError={setError} />
            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />
          </>
        )}

        {/* --- Section 2: Manual Entry Form (Always available) --- */}
        <h3>{editingMedication ? 'Edit Medication' : 'Add New Medication'}</h3>
        <form onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Medication Name</label>
            <input
              type="text"
              value={med.name}
              onChange={e => setMed({ ...med, name: e.target.value })}
              placeholder="e.g., Paracetamol"
              required
            />
          </div>

          <div className="form-group">
            <label>Dosage</label>
            <input
              type="text"
              value={med.dosage}
              onChange={e => setMed({ ...med, dosage: e.target.value })}
              placeholder="e.g., 500mg"
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select value={med.type} onChange={e => setMed({ ...med, type: e.target.value })}>
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
              onChange={e => setMed({ ...med, time: e.target.value })}
              required
            />
          </div>
          
          {editingMedication ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button type="submit" className="update-btn">Update Medication</button>
              <button type="button" onClick={handleCancelEdit} className="add-btn" style={{ backgroundColor: 'var(--secondary-color)' }}>Cancel Edit</button>
            </div>
          ) : (
            <button type="submit" className="add-btn">Add Medication</button>
          )}
        </form>
      </div>

      {/* --- Section 3: The Modal (Hidden by default) --- */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Scanned Prescription Results"
      >
        <ScannedMedsModal
          initialMeds={scannedMeds}
          onBulkAdd={handleBulkAdd}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default MedicationForm;