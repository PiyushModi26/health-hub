import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const MedicationContext = createContext(null);

export const MedicationProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  const storageKey = currentUser ? `medications_${currentUser.id}` : null;

  useEffect(() => {
    if (storageKey) {
      const storedMeds = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setMedications(storedMeds);
    }
    setLoading(false);
  }, [storageKey]);

  const updateMedications = (newMeds) => {
    setMedications(newMeds);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newMeds));
    }
  };

  const addMedication = (medToAdd) => {
    updateMedications([...medications, medToAdd]);
  };

  const addMultipleMedications = (medsArray) => {
    updateMedications([...medications, ...medsArray]);
  };

  const updateMedication = (updatedMed) => {
    const updatedMeds = medications.map(m => (m.id === updatedMed.id ? updatedMed : m));
    updateMedications(updatedMeds);
  };

  const deleteMedication = (idToDelete) => {
    // ... delete logic ...
  };

  const value = {
    medications,
    loading,
    addMedication, // For single manual adds
    addMultipleMedications, // For bulk AI adds
    updateMedication,
    deleteMedication,
  };

  return (
    <MedicationContext.Provider value={value}>
      {!loading && children}
    </MedicationContext.Provider>
  );
};

export const useMedication = () => {
  return useContext(MedicationContext);
};