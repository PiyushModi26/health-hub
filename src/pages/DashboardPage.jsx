import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MedicationList from '../components/dashboard/MedicationList';
import MedicationForm from '../components/dashboard/MedicationForm';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [medications, setMedications] = useState([]);
  const [editingMedication, setEditingMedication] = useState(null);

  // Memoize storageKey to prevent re-renders
  const storageKey = `medications_${currentUser.id}`;

  // Load medications from localStorage
  useEffect(() => {
    const storedMeds = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setMedications(storedMeds);
  }, [storageKey]);

  // Abstract function to update both state and localStorage
  const updateMedications = (newMeds) => {
    setMedications(newMeds);
    localStorage.setItem(storageKey, JSON.stringify(newMeds));
  };

  const handleAddMed = (medToAdd) => {
    updateMedications([...medications, medToAdd]);
  };

  const handleUpdateMed = (updatedMed) => {
    const updatedMeds = medications.map(m => (m.id === updatedMed.id ? updatedMed : m));
    updateMedications(updatedMeds);
    setEditingMedication(null); // Exit editing mode
  };

  const handleDeleteMed = (idToDelete) => {
    if (window.confirm('Are you sure you want to remove this medication?')) {
      const updatedMeds = medications.filter(m => m.id !== idToDelete);
      updateMedications(updatedMeds);
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="medication-schedule">
        <div className="dashboard-header">
          <h2>🗓️ Your Medication Schedule</h2>
        </div>
        <MedicationList
          medications={medications}
          onDelete={handleDeleteMed}
          onEdit={setEditingMedication}
        />
      </div>
      <MedicationForm
        onAdd={handleAddMed}
        onUpdate={handleUpdateMed}
        editingMedication={editingMedication}
        setEditingMedication={setEditingMedication}
      />
    </div>
  );
};

export default DashboardPage;