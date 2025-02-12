import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className ={styles.landingSection}>
        <div className = {styles.imageContainer}>
          <img src = "/images/landing-image.png"
               alt = "Landing Visual"
               className={styles.landingImage}
          />
        </div>
        
          <div className={styles.textContainer}>
            <h1>Get Smarter with Money; Become Richer...</h1>
        </div>
      </div>
        <div className={styles.mainContent}>
          <h1> Your companion in getting richer and living the life of your dreams</h1>
          <h4>CashVault is your application for managing all things saving, budgeting, and investment</h4>
          <button className={styles.ctaButton}>Sign Up Here</button>
        </div>

        <div className={styles.mainContent}>
          <button className={styles.ctaButton}>Savings</button>
        </div>

        <div className={styles.featureSection}>
          <div className={styles.featureBox}>
            <Link href = "/automatic-saving" className = {styles.featureBox}>
            <h3>Automatic Saving</h3>
            <p>Put your savings on autopilot; set the frequency and your wallet will regularly deposit your savings on CashVault.</p>
            </Link>
          </div>

          <div className={styles.featureBox}>
            <h3>Save Manually</h3>
            <p>
              You don't like auto-saving? Then save on the go with the CashVault manual saving.
            </p>
          </div>

          <div className ={styles.featureBox}>
            <h3>Lock-up Funds</h3>
            <p>
              Sometimes, it's better to just lock funds away if you know you want to be more diciplined with your finances.
            </p>
          </div>
        </div>

        <div className={styles.mainContent}>
          <button className={styles.ctaButton}>Investment</button>
        </div>

        <div className={styles.featureSection}>
          <div className={styles.featureBox}>
            <h3>DCA Into Trades</h3>
            <p>Set a schedule where you will always buy profitable crypto tokens and hold. Then sell when the prices immensely increased</p>
          </div>

          <div className={styles.featureBox}>
            <h3>Liquidity Provision</h3>
            <p>
              Become a liquidity provider in top Web3 protocols and get rewarded for it.
            </p>
          </div>

          <div className ={styles.featureBox}>
            <h3>CashVault Investment</h3>
            <p>
              You wannna invest, but not really sure how to? Lock your funds with CashVault to trade for you.
            </p>
          </div>
        </div>



        <div className={styles.mainContent}>
          <button className={styles.ctaButton}>Budgeting</button>
        </div>

        <div className={styles.featureSection}>
          <div className={styles.featureBox}>
            <h3>Set Spending Limits</h3>
            <p>Build healthier financial habits by gauging all your major spendings</p>
          </div>

          <div className={styles.featureBox}>
            <h3>Expense & Income Tracking</h3>
            <p>
              Sit back to examine how your money has been coming and going.
            </p>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default LandingPage;