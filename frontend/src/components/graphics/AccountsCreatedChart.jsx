import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AccountsCreatedChart = ({ accountsData }) => {
  const data = {
    labels: accountsData.labels, // Fechas o periodos
    datasets: [
      {
        label: 'Cuentas Creadas',
        data: accountsData.values, // Cuentas creadas por período
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h3>Cuentas Creadas</h3>
      <Line data={data} />
    </div>
  );
};

export default AccountsCreatedChart;
