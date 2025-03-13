import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect } from "@thirdweb-dev/react";

const activeChain = "ethereum"; // Change this to your desired network

export const Web3Provider = ({ children }) => {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect()
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};
