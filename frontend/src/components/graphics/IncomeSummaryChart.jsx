import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeSummaryChart = ({ incomeData }) => {
  const data = {
    labels: ['Semanal', 'Mensual', '6 Meses', 'Anual'],
    datasets: [
      {
        label: 'Ingresos',
        data: incomeData.values, // Valores de ingresos para cada período
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h3>Ingresos Totales</h3>
      <Bar data={data} />
    </div>
  );
};

export default IncomeSummaryChart;
