import React, { useState } from "react";
import styles from "../styles/AutomaticSaving.module.css";
import ConnectWallet from "../components/ConnectWallet";

const ManualSaving = () => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Saving ${amount} manually`);
        // Add logic to interact with the smart contract to save funds manually
    };

    const handleWithdraw = () => {
        console.log("Withdrawing saved funds");
        // Add logic to interact with the smart contract to withdraw saved funds
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Welcome to CashVault</h1>
            </header>
            <ConnectWallet />
            <div className={styles.card}>
                <h2 className={styles.title}>Manual Saving</h2>
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

                    {/* Submit Button */}
                    <button type="submit" className={styles.submitButton}>
                        Save Now
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

export default ManualSaving;