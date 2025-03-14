import React, { useState, useEffect } from "react";
import Web3 from "web3";
import styles from "../styles/AutomaticSaving.module.css";
import ConnectWallet from "../components/ConnectWallet";

const DCAIntoTrades = () => {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("weekly");
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.request({ method: "eth_requestAccounts" }).then(accounts => {
        setAccount(accounts[0]);
      });
    } else {
      alert("Please install MetaMask to use this feature.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!web3 || !account) {
      alert("Please connect to MetaMask.");
      return;
    }

    const contractAddress = "0x276a3411A3440b2A0A216dCD6d4e63f67b1c502e"; // Replace with your contract address
    const contractABI = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "interval",
            "type": "uint256"
          }
        ],
        "name": "setDollarCostAveraging",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "withdrawLockedFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      // Add other functions and events as needed
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    const intervalMapping = {
      weekly: 7 * 24 * 60 * 60, // 7 days in seconds
      monthly: 30 * 24 * 60 * 60 // 30 days in seconds
    };

    try {
      await contract.methods.setDollarCostAveraging(
        web3.utils.toWei(amount, "ether"),
        intervalMapping[frequency]
      ).send({
        from: account,
        value: web3.utils.toWei(amount, "ether"),
      });
      console.log(`Set DCA of ${amount} ETH ${frequency}`);
    } catch (error) {
      console.error("Error setting DCA:", error);
    }
  };

  const handleWithdraw = async () => {
    if (!web3 || !account) {
      alert("Please connect to MetaMask.");
      return;
    }

    const contractAddress = "0x276a3411A3440b2A0A216dCD6d4e63f67b1c502e"; // Replace with your contract address
    const contractABI = [
      {
        "inputs": [],
        "name": "withdrawLockedFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      // Add other functions and events as needed
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      await contract.methods.withdrawLockedFunds().send({
        from: account,
      });
      console.log("Withdrew locked funds");
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
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
              placeholder="Enter Amount"
              required
            />
          </div>

          {/* Frequency Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Frequency</label>
            <div className={styles.buttonGroup}>
              {["weekly", "monthly"].map((option) => (
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