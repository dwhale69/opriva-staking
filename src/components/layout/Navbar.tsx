import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { OprivaLogo } from './OprivaLogo';
import { useWalletContext } from '../../context/WalletContext';

export const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { account, connectWallet } = useWalletContext();

  const handleConnect = () => {
    if (!account) {
      setShowModal(true);
    }
  };

  const handleWalletConnect = async () => {
    await connectWallet();
    setShowModal(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <nav className="border-b border-[#1f2023] bg-[#141416] fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <OprivaLogo />
            <button
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#8396FA] hover:bg-[#899CFA] transition-colors text-white font-medium text-sm sm:text-base"
              onClick={handleConnect}
            >
              <Wallet size={18} className="hidden sm:block" />
              {account ? formatAddress(account) : 'Connect Wallet'}
            </button>
          </div>
        </div>
      </nav>

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