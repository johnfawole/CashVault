import React, { useState, useEffect } from "react";
import Web3 from "web3";
import styles from "../styles/AutomaticSaving.module.css";
import ConnectWallet from "../components/ConnectWallet";

const LockupFunds = () => {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState(1);
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
            "name": "months",
            "type": "uint256"
          }
        ],
        "name": "lockupFunds",
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
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "user",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "unlockTime",
            "type": "uint256"
          }
        ],
        "name": "LockedUp",
        "type": "event"
      },
      // Add other functions and events as needed
    ];

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      await contract.methods.lockupFunds(months).send({
        from: account,
        value: web3.utils.toWei(amount, "ether"),
      });
      console.log(`Locked ${amount} ETH for ${months} months`);
    } catch (error) {
      console.error("Error locking funds:", error);
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
        <h2 className={styles.title}>Lockup Funds</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Amount Input */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Amount (ETH)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={styles.input}
              placeholder="Enter Amount in ETH"
              required
            />
          </div>

          {/* Months Selection */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Number of Months</label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className={styles.input}
              placeholder="Enter the number of months"
              min="1"
              max="12"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className={styles.submitButton}>
            Lockup Funds
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

export default LockupFunds;