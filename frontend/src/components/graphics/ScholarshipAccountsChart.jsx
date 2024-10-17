import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ScholarshipAccountsChart = ({ scholarshipData }) => {
  const data = {
    labels: ['Con Beca', 'Sin Beca'],
    datasets: [
      {
        label: 'Cuentas con Beca',
        data: scholarshipData.values, // Número de cuentas con y sin beca
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div>
      <h3>Cuentas con Beca</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default ScholarshipAccountsChart;
