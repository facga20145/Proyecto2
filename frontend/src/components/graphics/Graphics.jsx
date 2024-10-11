import React from 'react';
import DailyIncomeChart from './DailyIncomeChart';
import AccountsCreatedChart from './AccountsCreatedChart';
import ScholarshipAccountsChart from './ScholarshipAccountsChart';
import IncomeSummaryChart from './IncomeSummaryChart';
import './Graphics.css';

const Graphics = () => {
  const dailyIncomeData = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    values: [500, 600, 400, 700, 800, 450, 350],
  };

  const accountsData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    values: [5, 10, 15, 20, 25],
  };

  const scholarshipData = {
    values: [40, 60], // 40% con beca, 60% sin beca
  };

  const incomeData = {
    values: [5000, 20000, 80000, 150000],
  };

  return (
    <div className="graphics-dashboard">
      <h2>Panel de Gráficos</h2>
      <div className="chart-row">
        <div className="chart-card">
          <DailyIncomeChart dailyIncomeData={dailyIncomeData} />
        </div>
        <div className="chart-card">
          <AccountsCreatedChart accountsData={accountsData} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-card">
          <ScholarshipAccountsChart scholarshipData={scholarshipData} />
        </div>
        <div className="chart-card">
          <IncomeSummaryChart incomeData={incomeData} />
        </div>
      </div>
    </div>
  );
};

export default Graphics;
