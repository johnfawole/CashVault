import React from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';
import imageStyles from '../styles/Images.module.css';
import Link from 'next/link';
import ConnectWallet from "../components/ConnectWallet";


const LandingPage = () => {
  return (
    <div>
      <Header />
      <ConnectWallet />
      <div className={styles.landingSection}>
        <div className={styles.imageContainer}>
          <img src="/images/landing-image.png"
               alt="Landing Visual"
               className={styles.landingImage}
          />
        </div>
        
        <div className={styles.textContainer}>
          <h1>Get Smarter with Money; Become Richer...</h1>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        <h1>Your companion in getting richer and living the life of your dreams</h1>
        <h4>CashVault is your application for managing all things saving, budgeting, and investment</h4>
        <button className={styles.ctaButton}>Sign Up Here</button>
      </div>

      <div className={`${styles.mainContent} ${styles.bgLightGreen}`}>
        <button className={styles.ctaButton}>Savings</button>

        <div className={`${styles.featureSection} ${styles.bgLightGreen}`}>
          <div className={styles.featureBox}>
            <Link href="/automatic-saving">
              <h3>Automatic Saving</h3>
            </Link>
            <p>Put your savings on autopilot; set the frequency and your wallet will regularly deposit your savings on CashVault.</p>
          </div>

          <div className={styles.featureBox}>
            <Link href="/manual-saving">
              <h3>Save Manually</h3>
            </Link>
            <p>
              You don't like auto-saving? Then save on the go with the CashVault manual saving.
            </p>
          </div>

          <div className={styles.featureBox}>
            <Link href="/lockup">
              <h3>Lock-up Funds</h3>
            </Link>
            <p>
              Sometimes, it's better to just lock funds away if you know you want to be more disciplined with your finances.
            </p>
          </div>
        </div>
      </div>

      <div className={`${styles.mainContent} ${styles.bgDarkTeal}`}>
        <button className={styles.ctaButton}>Investment</button>

        <div className={`${styles.featureSection} ${styles.bgDarkTeal}`}>
          <img src="/images/DCA.jpg" alt="DCA Trades" className={imageStyles.featureImage} />
          <div className={styles.featureBox}>
          <Link href="/dca">
            <h3>DCA Into Trades</h3>
          </Link>
            <p>Set a schedule where you will always buy profitable crypto tokens and hold. Then sell when the prices immensely increased</p>
          </div>
        </div>
      </div>

      <div className={`${styles.mainContent} ${styles.bgLightGreen}`}>
        <button className={styles.ctaButton}>Budgeting</button>
        <div className={`${styles.featureSection} ${styles.bgLightGreen}`}>
        <img src="/images/chart.png" alt="Chart" className={imageStyles.budgetingImage} />
          <div className={styles.featureBox}>
            <Link href="/PasteBankStatement">
              <h3>Expense & Income Tracking</h3>
            </Link>
            <div className={imageStyles.budgetingContent}>
              <p>
                Sit back to examine how your money has been coming and going.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.mainContent} ${styles.bgFineBlack}`}>
        <div className={styles.scrollSection}>
          <img src="/images/scroll.png" alt="Scroll" className={styles.scrollImage} />
          <div>
            <h1>Built on Scroll(currently in testnet)</h1>
            <h2>CashVault is a personal finance application bringing the world to the Open Economy on Scroll</h2>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;