import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyIncomeChart = ({ dailyIncomeData }) => {
  const data = {
    labels: dailyIncomeData.labels, // Etiquetas de los días
    datasets: [
      {
        label: 'Ingresos Diarios',
        data: dailyIncomeData.values, // Valores de ingresos por día
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h3>Ingresos Diarios</h3>
      <Bar data={data} />
    </div>
  );
};

export default DailyIncomeChart;
