'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function TonConnectProviderWrapper({ children }: Props) {
  // Replace with your actual manifest URL
  const manifestUrl = process.env.NEXT_PUBLIC_TON_MANIFEST_URL || 'https://yourdomain.com/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}