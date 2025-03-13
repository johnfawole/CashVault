import { useState, useEffect } from "react";
import Web3 from "web3";
import styles from '../styles/Home.module.css';

export default function ConnectWallet() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum || !window.ethereum.isMetaMask) {
      alert("MetaMask not detected. Please install MetaMask.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <button
        onClick={connectWallet}
        className={styles.connectButton}
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect to MetaMask"}
      </button>

      {account && (
        <div className="text-sm bg-gray-100 px-4 py-2 rounded-lg shadow-inner">
          ✅ Connected: <span className="font-mono">{account}</span>
        </div>
      )}
    </div>
  );
}
