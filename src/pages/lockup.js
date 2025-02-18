import React, {useState} from "react";
import styles from "../styles/AutomaticSaving.module.css"

const LockupFunds = () => {

    const [amount, setAmount] = useState("");
    const [months, setMonths] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("locking ${amount} for ${months}")
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Welcome to CashVault</h1>
            </header>

            <div className={styles.card}>
                <h2 className={styles.title}>Lockup Funds</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Amount Input */}
                    <div className={styles.inputGroup}>
                    <label className = {styles.label}>Amount</label>
                    <input
                        type = "number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={styles.input}
                        placeholder="$ Enter Amount"
                        required
                    />
                    
                    </div>

                    
                    {/* Months Selection */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Number of Months</label>
                        <input 
                            type = "number"
                            value = {months}
                            onChange={(e) => setMonths(e.target.value)}
                            className={styles.input}
                            placeholder="= Enter the number of months"
                            min = "1"
                            max = "12"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button type = "submit" className={styles.submitButton}>
                        Lockup Funds
                    </button>
                </form>
            </div>
            <footer className={styles.footer}>
                All Rights Reserved
            </footer>
        </div>
    );
};


export default LockupFunds;