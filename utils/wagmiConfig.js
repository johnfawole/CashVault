import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';

const { NEXT_PUBLIC_WEB3MODAL_PROJECT_ID } = process.env;

// Configure chains and providers
const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'CashVault',
  projectId: NEXT_PUBLIC_WEB3MODAL_PROJECT_ID,
  chains
});

// Create Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

export { chains };
