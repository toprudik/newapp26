'use client';

import { useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

export function TonConnectButton() {
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // Subscribe to wallet connection status using the correct API
    const unsubscribe = tonConnectUI.onStatusChange(wallet => {
      if (wallet) {
        setIsConnected(true);
        setWalletAddress(wallet.account.address);
        console.log('Connected to wallet:', wallet);
      } else {
        setIsConnected(false);
        setWalletAddress('');
        console.log('Disconnected from wallet');
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [tonConnectUI]);

  const handleConnect = async () => {
    await open();
  };

  const handleDisconnect = async () => {
    await tonConnectUI.disconnect();
  };

  return (
    <div className="flex items-center gap-4">
      {isConnected ? (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate max-w-[120px]">
            {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </span>
          <button
            onClick={handleDisconnect}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Connect TON Wallet
        </button>
      )}
    </div>
  );
}