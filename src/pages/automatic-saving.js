import React, { useState } from "react";
import styles from "../styles/AutomaticSaving.module.css";

const AutomaticSaving = () => {
  // ✅ Define state variables outside handleSubmit
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Saving ${amount} ${frequency}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to CashVault</h1>
      </header>
      <div className={styles.card}>
        <h2 className={styles.title}>Automatic Saving</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Amount Input */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              placeholder="Enter Amount"
              required
            />
          </div>

          {/* Frequency Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Frequency</label>
            <div className={styles.buttonGroup}>
              {["daily", "weekly", "monthly"].map((option) => (
                <button
                  type="button"
                  key={option}
                  className={`${styles.toggleButton} ${
                    frequency === option ? styles.active : ""
                  }`}
                  onClick={() => setFrequency(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Set Automatic Saving
          </button>
        </form>
      </div>
      <footer className={styles.footer}>
        All Rights Reserved
      </footer>
    </div>
  );
};

export default AutomaticSaving;
