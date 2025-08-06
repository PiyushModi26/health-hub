import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import MedicationTypeChart from '../components/reports/MedicationTypeChart';
import MedicationScheduleChart from '../components/reports/MedicationScheduleChart';

const ReportsPage = () => {
  const [medications, setMedications] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const storageKey = `medications_${currentUser.id}`;
    const storedMeds = JSON.parse(localStorage.getItem(storageKey) || '[]');
    setMedications(storedMeds);
  }, [currentUser.id]);

  return (
    <>
      <h2>📊 Health Reports</h2>
      {medications.length === 0 ? (
        <div className="empty-state">No medication data available to generate reports.</div>
      ) : (
        <div className="reports-grid">
          <div className="chart-container">
            <h3>Medication Type Breakdown</h3>
            <MedicationTypeChart medications={medications} />
          </div>
          <div className="chart-container">
            <h3>Medication Schedule Distribution</h3>
            <MedicationScheduleChart medications={medications} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportsPage;