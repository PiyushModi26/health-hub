import React, { useState, useEffect } from 'react';
import AIScanner from './AIScanner';
import Modal from '../common/modal'; // Import the new modal
import ScannedMedsModal from '../medications/ScannedMedsModal'; // Import the modal content

const MedicationForm = ({ onAdd, onUpdate, editingMedication, setEditingMedication }) => {
  const initialFormState = { name: '', dosage: '', type: 'Tablet', time: '08:00' };
  const [med, setMed] = useState(initialFormState);
  const [error, setError] = useState('');
  
  // New state to manage the modal
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

  // This function is now called when the AI scan is successful
  const handleScanSuccess = (medsArray) => {
    setScannedMeds(medsArray); // Store the scanned meds
    setIsModalOpen(true); // Open the modal
  };

  // This function is called from the modal to add all meds
  const handleBulkAdd = (medsToAdd) => {
    medsToAdd.forEach(med => {
      // Create a full medication object for each item
      const newMed = {
        id: Date.now() + Math.random(), // Add randomness to ID for bulk adds
        name: med.name,
        dosage: med.dosage,
        time: '08:00', // Default time, user can change later
        type: 'Tablet' // Default type
      };
      onAdd(newMed);
    });
  };
  
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
    <>
      <div className="medication-form-container">
        {!editingMedication && (
          <AIScanner onScanSuccess={handleScanSuccess} setFormError={setError} />
        )}

        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />

        <h3>{editingMedication ? 'Edit Medication' : 'Add New Medication'}</h3>
        <form onSubmit={handleSubmit}>
          {/* ... The existing form JSX remains the same ... */}
          {/* (Name, Dosage, Type, Time inputs and buttons) */}
        </form>
      </div>

      {/* The Modal for displaying scanned results */}
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