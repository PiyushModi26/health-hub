import React from 'react';
import { useMedication } from '../contexts/MedicationContext';
import MedicationList from '../components/dashboard/MedicationList';
import NextMedication from '../components/dashboard/NextMedication';
import AiHealthTip from '../components/dashboard/AiHealthTip'; // Re-importing the AI component
import './DashboardPage.css';

const DashboardPage = () => {
  const { medications, loading } = useMedication();

  if (loading) {
    return <div>Loading your dashboard...</div>;
  }

  return (
    // This layout will create the two columns
    <div className="new-dashboard-layout">
      
      {/* --- Main Content (Left Column) --- */}
      <div className="dashboard-main-content">
        <NextMedication medications={medications} />
        <div className="full-schedule-widget">
          <div className="dashboard-header">
            <h2>🗓️ Full Medication Schedule</h2>
          </div>
          <MedicationList
            medications={medications}
            isReadOnly={true}
          />
        </div>
      </div>

      {/* --- Sidebar (Right Column) --- */}
      <div className="dashboard-sidebar">
        <AiHealthTip />
      </div>
      
    </div>
  );
};

export default DashboardPage;