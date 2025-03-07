import React, { useState, useEffect } from "react";
import styles from "../styles/AutomaticSaving.module.css";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const UploadBankStatement = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    // Reset chart data when new file is selected
    setChartData(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("bankStatement", selectedFile);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setChartData(data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert("Upload failed: " + errorData.error);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    } finally {
      setIsLoading(false);
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
        <div className={styles.uploadSection}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileSelect}
            className={styles.input}
          />
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className={styles.uploadButton}
          >
            {isLoading ? "Uploading..." : "Upload Statement"}
          </button>
        </div>
        {selectedFile && (
          <p className={styles.selectedFile}>
            Selected file: {selectedFile.name}
          </p>
        )}
        {chartData && (
          <div className={styles.chartContainer}>
            <Pie data={chartData} />
          </div>
        )}
      </div>
      <footer className={styles.footer}>All Rights Reserved</footer>
    </div>
  );
};

export default UploadBankStatement;
