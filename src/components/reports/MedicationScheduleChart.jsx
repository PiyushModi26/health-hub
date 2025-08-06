import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MedicationScheduleChart = ({ medications }) => {
    const chartData = useMemo(() => {
    const countsByTime = medications.reduce((acc, med) => {
        acc[med.time] = (acc[med.time] || 0) + 1;
        return acc;
    }, {});

    const sortedTimes = Object.keys(countsByTime).sort();

    return {
        labels: sortedTimes,
        datasets: [{
            label: 'Number of Medications',
            data: sortedTimes.map(time => countsByTime[time]),
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
        }],
    };
  }, [medications]);

  const options = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: true, text: 'Count of Medications at Scheduled Times' },
    },
    scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 } }
    }
  }

  return <Bar options={options} data={chartData} />;
};

export default MedicationScheduleChart;