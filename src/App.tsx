import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { BottomNavbar } from "./components/layout/BottomNavbar";
import { StakingCard } from "./components/staking/StakingCard";
import { StatsGrid } from "./components/stats/StatsGrid";
import { LoadingScreen } from "./components/loading/LoadingScreen";
import { AdvertisingForm } from "./components/advertising/AdvertisingForm";
import { DAODashboard } from "./components/dao/DAODashboard";
import { StatsDashboard } from "./components/stats/StatsDashboard";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygon, optimism, arbitrum, base, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const mainnet: any = {
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://endpoints.omniatech.io/v1/eth/mainnet/public"],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19_258_213,
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14_353_601,
    },
  },
};

const config = getDefaultConfig({
  appName: "Opriva Terminal",
  projectId: "82a516766258f6d15f17e56cb3858b2b",
  chains: [mainnet],
  // chains: [mainnet, sepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<
    "stake" | "advertise" | "dao" | "stats"
  >("stake");

  useEffect(() => {
    const createStars = () => {
      const container = document.body;
      for (let i = 0; i < 50; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        container.appendChild(star);
      }

      const planets = [
        { size: 100, top: "20%", left: "80%" },
        { size: 150, top: "60%", left: "10%" },
        { size: 80, top: "40%", left: "60%" },
      ];

      planets.forEach((config) => {
        const planet = document.createElement("div");
        planet.className = "planet";
        planet.style.width = `${config.size}px`;
        planet.style.height = `${config.size}px`;
        planet.style.top = config.top;
        planet.style.left = config.left;
        planet.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(planet);
      });
    };

    if (!isLoading) {
      createStars();
    }

    return () => {
      const stars = document.querySelectorAll(".star");
      const planets = document.querySelectorAll(".planet");
      stars.forEach((star) => star.remove());
      planets.forEach((planet) => planet.remove());
    };
  }, [isLoading]);

  const renderContent = () => {
    switch (activeSection) {
      case "advertise":
        return <AdvertisingForm />;
      case "dao":
        return <DAODashboard />;
      case "stats":
        return <StatsDashboard />;
      case "stake":
        return (
          <>
            <div className="mb-12">
              <StatsGrid />
            </div>
            <div className="flex justify-center w-full">
              <StakingCard />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            {isLoading ? (
              <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
            ) : (
              <div className="min-h-screen w-full pb-16">
                <Navbar />
                <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                  {renderContent()}
                </main>
                <BottomNavbar
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                />
              </div>
            )}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
