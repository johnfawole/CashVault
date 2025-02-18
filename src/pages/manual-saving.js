import React, { useState } from "react";
import styles from "../styles/AutomaticSaving.module.css";


const ManualSaving = () => {
    const [amount, setAmount] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving ${amount} manually");
    };
    
    return (
        <div className = {styles.container}>
      <header className={styles.header}>
        <h1>Welcome to CashVault</h1>
      </header>                
            <div className = {styles.card}>
                <h2 className={styles.title}>Manual Saving</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Amount Input */}
                    <div className = {styles.inputGroup}>
                        <label className={styles.label}>Amount</label>

                            <input
                                type = "number"
                                value = {amount}
                                onChange={(e)=> setAmount(e.target.value)}
                                className={styles.input}
                                placeholder="$ Enter Amount"
                                required
                            />

                        {/* Submit Button*/}
                        <button type = "submit" className={styles.submitButton}>
                            Save Now
                        </button>
                    </div>
                </form>
            </div>
        <footer className={styles.footer}>
        All Rights Reserved
      </footer>
        </div>
    );
};

export default ManualSaving;