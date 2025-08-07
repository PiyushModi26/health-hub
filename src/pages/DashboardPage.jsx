import React from 'react';
import { useMedication } from '../contexts/MedicationContext';
import MedicationList from '../components/dashboard/MedicationList';
import NextMedication from '../components/dashboard/NextMedication';
import AiHealthTip from '../components/dashboard/AiHealthTip';
import './DashboardPage.css'; 

const DashboardPage = () => {
  const { medications, loading } = useMedication();

  if (loading) {
    return <div style={{textAlign: 'center', padding: '2rem'}}>Loading your dashboard...</div>;
  }

  return (
    <div className="new-dashboard-layout">
      <div className="dashboard-main-content">
        <div className="widget next-med-widget">
            <NextMedication medications={medications} />
        </div>
        <div className="widget full-schedule-widget">
            <h2 className="widget-header">
                <span role="img" aria-label="calendar">🗓️</span> Full Medication Schedule
            </h2>
            <MedicationList
                medications={medications}
                isReadOnly={true}
            />
        </div>
      </div>
      <div className="dashboard-sidebar">
        <div className="widget">
            <AiHealthTip />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;