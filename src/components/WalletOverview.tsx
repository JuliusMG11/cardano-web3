"use client"

import { Wallet, Coins } from 'lucide-react';
import Card from './ui/Card';

import { formatAddress, formatPrice } from '@/lib/formatFunctions';

interface WalletOverviewProps {
  address: string;
  stakeBalance: string;
  isLoading: boolean; 
  stakeAddress: string;
}

export function WalletOverview({ address, stakeAddress, stakeBalance, isLoading }: WalletOverviewProps) {

  
    return (
      <div className="grid gap-8 sm:grid-cols-3">
        <Card 
          title="Wallet Address" 
          value={formatAddress(address, isLoading)}
          isCopyable={true}
          originalValue={address}
        >
          <Wallet className="h-8 w-8 text-muted-foreground" />
        </Card>
        <Card 
          title="Stake Address" 
          value={formatAddress(stakeAddress, isLoading)}
          isCopyable={true}
          originalValue={stakeAddress}
        >
          <Wallet className="h-8 w-8 text-muted-foreground" />
        </Card>
       
        <Card 
          title="ADA Balance" 
          value={formatPrice(stakeBalance, isLoading)} 
        >
          <Coins className="h-8 w-8 text-muted-foreground" />
        </Card>
        
      </div>
    );
  }