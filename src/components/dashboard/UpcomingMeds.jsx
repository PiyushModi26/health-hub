import React, { useState, useEffect } from 'react';
const UpcomingMeds = ({ medications }) => {
  const [upcomingMeds, setUpcomingMeds] = useState([]);

  useEffect(() => {
    const checkUpcomingMeds = () => {
      const now = new Date();
      const nextTwoHours = new Date(now.getTime() + 2 * 60 * 60 * 1000);

      const upcoming = medications.filter(med => {
        if (!med.time) return false;

        const medTime = new Date();
        const [hours, minutes] = med.time.split(':');
        medTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        return medTime > now && medTime <= nextTwoHours;
      });
      setUpcomingMeds(upcoming);
    };

    checkUpcomingMeds();
    const interval = setInterval(checkUpcomingMeds, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [medications]);

  if (upcomingMeds.length === 0) {
    return null;
  }

  return (
    <div className="upcoming-meds-notification">
      <h3>🕒 Upcoming in Next 2 Hours</h3>
      <div className="upcoming-meds-list">
        {upcomingMeds.map(med => (
          <div key={med.id} className="upcoming-med-card">
              <div className="med-details">
              <h4>{med.name}</h4>
              <p><strong>Time:</strong> {med.time}</p>
              <p><strong>Dosage:</strong> {med.dosage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingMeds;