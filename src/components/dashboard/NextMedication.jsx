import React, { useMemo } from 'react';
import defaultMedImage from '../../assets/logo.png'; 

const NextMedication = ({ medications }) => {
  const nextMed = useMemo(() => {
    if (!medications || medications.length === 0) return null;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const upcomingDoses = medications
      .map(med => {
        const [hours, minutes] = med.time.split(':');
        const medTime = new Date(today);
        medTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        // If time has passed today, check for tomorrow's dose
        if (medTime < now) {
          medTime.setDate(medTime.getDate() + 1);
        }
        return { ...med, scheduledTime: medTime };
      })
      .sort((a, b) => a.scheduledTime - b.scheduledTime);

    return upcomingDoses[0];
  }, [medications]);

  if (!nextMed) {
    return (
      <div className="next-med-widget">
        <h3>✨ Next Dose</h3>
        <p>No upcoming medications found.</p>
      </div>
    );
  }

  // Format the time for display (e.g., Today at 08:00 PM, or Tomorrow at 09:00 AM)
  const isToday = nextMed.scheduledTime.getDate() === new Date().getDate();
  const timeString = nextMed.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="next-med-widget">
      <h3>Next Dose</h3>
      <div className="next-med-card" style={{"padding-left":"30px"}}>
        
        <div className="next-med-details">
          <h4>{nextMed.name}</h4>
          <p className="next-med-time-highlight">
            {isToday ? 'Today' : 'Tomorrow'} at {timeString}
          </p>
          <p>{nextMed.dosage} &bull; {nextMed.type}</p>
        </div>
      </div>
    </div>
  );
};

export default NextMedication;