import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MedicationTypeChart = ({ medications }) => {
  const chartData = useMemo(() => {
    const counts = medications.reduce((acc, med) => {
      acc[med.type] = (acc[med.type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(counts),
      datasets: [{
        data: Object.values(counts),
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#17a2b8', '#6c757d'],
        hoverOffset: 4,
      }],
    };
  }, [medications]);

  return <Pie data={chartData} />;
};

export default MedicationTypeChart;