'use client';

import { useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export default function TonPage() {
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState<any>(null);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to wallet connection status
    const unsubscribe = tonConnectUI.connectionStatus.on((status) => {
      if (status?.wallet) {
        setIsConnected(true);
        setWalletInfo(status.wallet);
        console.log('Connected to wallet:', status.wallet);
        
        // Get balance if possible
        getBalance();
      } else {
        setIsConnected(false);
        setWalletInfo(null);
        setBalance(null);
        console.log('Disconnected from wallet');
      }
    });

    return () => unsubscribe();
  }, [tonConnectUI]);

  const handleConnect = async () => {
    await open();
  };

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  const getBalance = async () => {
    try {
      // This is a simplified example - in real applications you'd use the TON API
      // to fetch the wallet balance
      console.log('Fetching balance...');
      // Simulate getting balance
      setBalance('0.00 TON');
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12">TON Wallet Integration</h1>
        
        <div className="bg-white/10 rounded-xl p-8 mb-8">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Wallet Connection</h2>
            
            {!isConnected ? (
              <div className="text-center">
                <p className="mb-6 text-lg">Connect your TON wallet to interact with our platform</p>
                <button
                  onClick={handleConnect}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-lg font-medium transition-colors shadow-lg"
                >
                  Connect TON Wallet
                </button>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium mb-2">Connected Wallet</h3>
                  <div className="text-sm break-all">
                    <p><span className="font-medium">Name:</span> {walletInfo?.appName || walletInfo?.name}</p>
                    <p className="mt-1"><span className="font-medium">Address:</span> {walletInfo?.address}</p>
                    <p className="mt-1"><span className="font-medium">Chain:</span> {walletInfo?.chain}</p>
                  </div>
                  {balance && (
                    <p className="mt-2"><span className="font-medium">Balance:</span> {balance}</p>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleDisconnect}
                    className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                  >
                    Disconnect
                  </button>
                  
                  <button
                    onClick={getBalance}
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                  >
                    Refresh Balance
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">About TON Connect</h2>
          <p className="mb-4">
            TON Connect allows you to securely connect your TON blockchain wallet to this application. 
            With TON Connect, you can perform transactions, interact with smart contracts, 
            and manage your TON-based assets directly from your browser.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Secure</h3>
              <p className="text-sm">All connections are encrypted and secure. Your private keys never leave your wallet.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Decentralized</h3>
              <p className="text-sm">No central authority controls your funds. You remain in full control of your assets.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Fast</h3>
              <p className="text-sm">TON blockchain offers extremely fast transaction processing times.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}