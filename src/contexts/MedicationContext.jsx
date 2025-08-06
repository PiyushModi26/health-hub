import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MedicationContext = createContext(null);

export const MedicationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define storageKey based on the current user
  const storageKey = currentUser ? `medications_${currentUser.id}` : null;

  // Load medications from localStorage when the component mounts or user changes
  useEffect(() => {
    if (storageKey) {
      const storedMeds = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setMedications(storedMeds);
    }
    setLoading(false);
  }, [storageKey]);

  // Central function to update state and localStorage
  const updateMedications = (newMeds) => {
    setMedications(newMeds);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newMeds));
    }
  };

  // CRUD Functions
  const addMedication = (medToAdd) => {
    updateMedications([...medications, medToAdd]);
  };

  const updateMedication = (updatedMed) => {
    const updatedMeds = medications.map(m => (m.id === updatedMed.id ? updatedMed : m));
    updateMedications(updatedMeds);
  };

  const deleteMedication = (idToDelete) => {
    if (window.confirm('Are you sure you want to remove this medication?')) {
      const updatedMeds = medications.filter(m => m.id !== idToDelete);
      updateMedications(updatedMeds);
    }
  };

  const value = {
    medications,
    loading,
    addMedication,
    updateMedication,
    deleteMedication,
  };

  return (
    <MedicationContext.Provider value={value}>
      {!loading && children}
    </MedicationContext.Provider>
  );
};

// Custom hook to easily use the context
export const useMedication = () => {
  return useContext(MedicationContext);
};