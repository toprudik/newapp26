'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TonConnectProviderWrapper({ children }: Props) {
  // Using the manifest file in the public directory
  const manifestUrl = 'https://raw.githubusercontent.com/Ton-Split/tonconnect-manifest/refs/heads/main/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}