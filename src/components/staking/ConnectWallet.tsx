import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { useWalletContext } from '../../context/WalletContext';

export const ConnectWallet = () => {
  const [showModal, setShowModal] = useState(false);
  const { connectWallet } = useWalletContext();

  const handleConnect = () => {
    setShowModal(true);
  };

  const handleWalletConnect = async () => {
    await connectWallet();
    setShowModal(false);
  };

  return (
    <>
      <div className="glass-effect rounded-xl p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-[#8396FA]/10">
            <Wallet size={32} className="text-[#8396FA]" />
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Connect Wallet</h3>
        <p className="text-gray-400 mb-6">
          Connect your wallet to start staking OPRV tokens
        </p>
        <button
          onClick={handleConnect}
          className="w-full py-3 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-all text-white font-medium neon-border"
        >
          Connect Wallet
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative glass-effect rounded-xl p-6 max-w-sm w-full mx-4 transform transition-all">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Connect Wallet
            </h3>
            
            <button
              onClick={handleWalletConnect}
              className="w-full p-4 rounded-lg bg-[#1f2023] hover:bg-[#2a2b2f] transition-all border border-[#8396FA]/20 hover:border-[#8396FA] group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-1 group-hover:scale-110 transition-transform">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                    alt="MetaMask"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">MetaMask</div>
                  <div className="text-gray-400 text-sm">
                    Connect using browser wallet
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full py-2 rounded-lg bg-[#8396FA]/10 hover:bg-[#8396FA]/20 text-[#8396FA] transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};