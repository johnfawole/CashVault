import React, { useState } from "react";
import styles from "../styles/AutomaticSaving.module.css";
import ConnectWallet from "../components/ConnectWallet";

const DCAIntoTrades = () => {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Buying ETH with ${amount} on a ${frequency} basis`);
    // Add logic to interact with the smart contract to execute DCA trades
  };

  const handleWithdraw = () => {
    console.log("Withdrawing funds");
    // Add logic to interact with the smart contract to withdraw funds
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to CashVault</h1>
      </header>
      <ConnectWallet />

      <div className={styles.card}>
        <h2 className={styles.title}>Dollar-Cost Averaging (DCA) Into Trades</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Amount Input */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              placeholder="$ Enter Amount"
              required
            />
          </div>

          {/* Frequency Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className={styles.input}
              required
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Execute DCA
          </button>
        </form>

        {/* Withdraw Button */}
        <button onClick={handleWithdraw} className={styles.withdrawButton}>
          Withdraw Funds
        </button>
      </div>
      <footer className={styles.footer}>
        All Rights Reserved
      </footer>
    </div>
  );
};

export default DCAIntoTrades;