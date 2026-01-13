'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TonConnectProviderWrapper({ children }: Props) {
  // Using the manifest file in the public directory
  const manifestUrl = '/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}