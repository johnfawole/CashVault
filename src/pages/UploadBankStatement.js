import React, { useState, useEffect } from 'react';
import styles from '../styles/AutomaticSaving.module.css';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const UploadBankStatement = () => {
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('bankStatement', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setChartData(data);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (Chart.instances.length > 0) {
        Chart.instances.forEach((chart) => chart.destroy());
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to CashVault</h1>
      </header>
      <div className={styles.card}>
        <h2 className={styles.title}>Upload Your Bank Statement</h2>
        <input type="file" accept="application/pdf" onChange={handleFileUpload} className={styles.input} />
        {chartData && (
          <div>
            <Pie data={chartData} />
          </div>
        )}
      </div>
      <footer className={styles.footer}>
        All Rights Reserved
      </footer>
    </div>
  );
};

export default UploadBankStatement;