import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http, createConfig, injected } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";

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

// export const config = createConfig({
//   chains: [mainnet,sepolia],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//   },
// });

export const config = getDefaultConfig({
  appName: "Opriva Terminal",
  projectId: "82a516766258f6d15f17e56cb3858b2b",
  chains: [mainnet],
  ssr: false,
  transports: {
    [mainnet.id]: http(),
  },
});
