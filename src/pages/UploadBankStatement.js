import React, { useState } from 'react';
import styles from '../styles/AutomaticSaving.module.css';

const UploadBankStatement = () => {
  const [chartData, setChartData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('bankStatement', file);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((spendingData) => {
          setChartData(generateChartData(spendingData));
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Upload Bank Statement</h1>
        <input type="file" onChange={handleFileUpload} className={styles.input} />
        {chartData && <div>{/* Render chart with chartData */}</div>}
      </div>
    </div>
  );
};

export default UploadBankStatement;