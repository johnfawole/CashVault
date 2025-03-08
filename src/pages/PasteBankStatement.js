import React, { useState } from 'react';
import CustomPieChart from '../components/PieCharts';
import styles from '../styles/PasteBankStatement.module.css';

const PasteBankStatement = () => {
  const [bankStatement, setBankStatement] = useState('');
  const [sentData, setSentData] = useState(null);
  const [receivedData, setReceivedData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/paste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transactions: bankStatement }),
    });

    if (response.ok) {
      const data = await response.json();
      setSentData(data.sent);
      setReceivedData(data.received);
    } else {
      const errorText = await response.text();
      console.error('Error:', errorText);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Paste Your Bank Statement</h1>
      </header>
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <textarea
            value={bankStatement}
            onChange={(e) => setBankStatement(e.target.value)}
            className={styles.textarea}
            placeholder="Paste your bank statement here..."
            required
          />
          <button type="submit" className={styles.submitButton}>
            Visualize
          </button>
        </form>
        <div className={styles.chartsContainer}>
          {sentData && (
            <div className={styles.chartBox}>
              <CustomPieChart title="Money Sent (Expenses)" data={sentData} />
            </div>
          )}
          {receivedData && (
            <div className={styles.chartBox}>
              <CustomPieChart title="Money Received (Income)" data={receivedData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasteBankStatement;