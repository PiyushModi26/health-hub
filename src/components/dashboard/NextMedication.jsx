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
        <div>
            <h2 className="widget-header">✨ Next Dose</h2>
            <p style={{marginTop: '1.5rem'}}>No upcoming medications found.</p>
        </div>
    );
  }

  const isToday = nextMed.scheduledTime.getDate() === new Date().getDate();
  const timeString = nextMed.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
        <h2 className="widget-header">✨ Next Dose</h2>
        <div className="next-med-card">
        
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