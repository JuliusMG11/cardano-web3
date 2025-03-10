"use client"

import { useState } from 'react';
import { Search } from 'lucide-react';
import Btn from './ui/Btn';

interface WalletSearchProps {
  onSearch: (address: string) => void;
  defaultAddress: string;
}

export function WalletSearch({ onSearch, defaultAddress }: WalletSearchProps) {
  const [address, setAddress] = useState(defaultAddress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSearch(address.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-3xl gap-2">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Cardano wallet address"
        className="flex-1 border bg-[#1d2022] border-[#814BEB] rounded-full px-4 py-3 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent"
      />
      <Btn text="Search" onClick={() => handleSubmit}>
        <Search className="h-4 w-4" />
      </Btn>
    </form>
  );
}