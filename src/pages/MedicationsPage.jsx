import React, { useState } from 'react';
import { useMedication } from '../contexts/MedicationContext';
import MedicationList from '../components/dashboard/MedicationList';
import MedicationForm from '../components/dashboard/MedicationForm';

const MedicationsPage = () => {
  const { medications, addMedication, updateMedication, deleteMedication } = useMedication();
  const [editingMedication, setEditingMedication] = useState(null);

  return (
    // The main title has been removed from this container
    <div className="dashboard-grid">
      <div className="medication-schedule">
        <div className="dashboard-header">
          <h3>Full Medication List</h3>
        </div>
        <MedicationList
          medications={medications}
          onDelete={deleteMedication}
          onEdit={setEditingMedication}
        />
      </div>
      <MedicationForm
        onAdd={addMedication}
        onUpdate={updateMedication}
        editingMedication={editingMedication}
        setEditingMedication={setEditingMedication}
      />
    </div>
  );
};

export default MedicationsPage;