import React, { useState } from 'react';
import CustomPieChart from '../components/PieCharts';
import styles from '../styles/PasteBankStatement.module.css';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from 'recharts';

const PasteBankStatement = () => {
  const [bankStatement, setBankStatement] = useState('');
  const [sentData, setSentData] = useState(null);
  const [receivedData, setReceivedData] = useState(null);
  const [chartData, setChartData] = useState([]);

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

      const allNames = Array.from(
        new Set([
          ...data.sent.map((d) => d.name),
          ...data.received.map((d) => d.name),
        ])
      );

      const combined = allNames.map((name) => {
        const incomeEntry = data.received.find((d) => d.name === name);
        const expenseEntry = data.sent.find((d) => d.name === name);
        return {
          name,
          income: incomeEntry?.value || 0,
          expense: expenseEntry?.value || 0,
        };
      });

      setChartData(combined);
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

        {/* Pie Charts */}
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

        {/* Bar Chart with Clean Labels */}
        {chartData.length > 0 && (
          <div className={styles.barChartContainer}>
            <h2>Income vs Expenses Breakdown</h2>
            <div style={{ overflowX: 'auto' }}>
              <ResponsiveContainer width={chartData.length * 90} height={300}>
                <BarChart
                  data={chartData}
                  barCategoryGap="5%"
                  barGap={0}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    interval={0}
                    height={50}
                    tick={({ x, y, payload }) => {
                      const text = payload.value;
                      const truncated = text.length > 10 ? text.slice(0, 10) + '…' : text;
                      return (
                        <g transform={`translate(${x},${y + 20})`}>
                          <title>{text}</title>
                          <text textAnchor="middle" fill="#666" fontSize={12}>
                            {truncated}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <Tooltip
                    formatter={(value) =>
                      `₦${value.toLocaleString(undefined, {
                        minimumFractionDigits: 0,
                      })}`
                    }
                  />
                  <Legend />
                  <Bar dataKey="income" fill="#4caf50" name="Income" barSize={40}>
                    <LabelList
                      dataKey="income"
                      position="top"
                      content={({ x, y, value }) => {
                        if (!value) return null;
                        const label = `₦${value.toLocaleString()}`;
                        return (
                          <text x={x + 15} y={y - 5} fill="#000" fontSize={12} textAnchor="middle">
                            {label}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                  <Bar dataKey="expense" fill="#ff4d4d" name="Expenses" barSize={40}>
                    <LabelList
                      dataKey="expense"
                      position="top"
                      content={({ x, y, value }) => {
                        if (!value) return null;
                        const label = `₦${value.toLocaleString()}`;
                        return (
                          <text x={x + 15} y={y - 5} fill="#000" fontSize={12} textAnchor="middle">
                            {label}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasteBankStatement;
