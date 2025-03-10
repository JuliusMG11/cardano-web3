"use client"

import { useState, useEffect } from 'react';

import { fetchAddressAndBalance,  fetchAllNfts, fetchStakeAddress } from '@/lib/blockfrost';


import { WalletSearch } from "@/components/WalletSearch";
import { WalletOverview } from "@/components/WalletOverview";
import { NFTGallery } from "@/components/NftGallery";
import { Wallet } from 'lucide-react';

import { AssetDetails, TokenDetails } from '@/types/index';

import bg from "@/assets/bg.svg";
import { TokensList } from '@/components/TokensList';

export default function Home() {
  const DEFAULT_ADDRESS = "addr1x88ttk0fk6ssan4g2uf2xtx3anppy3djftmkg959tufsc6qkqt76lg22kjjmnns37fmyue765qz347sxfnyks27ysqaqd3ph23";
  
  const [address, setAddress] = useState(DEFAULT_ADDRESS);
  const [stakeAddress, setStakeAddress] = useState('');
  const [stakeBalance, setStakeBalance] = useState('0');
  const [lovelaceBalance, setLovelaceBalance] = useState('0');
  const [nfts, setNfts] = useState<AssetDetails[]>([]);
  const [tokens, setTokens] = useState<TokenDetails[]>([]);
  const [stakeActive, setStakeActive] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (searchAddress: string) => {
    setAddress(searchAddress);
  };

  const fetchWalletData = async (walletAddress: string) => {
    setIsLoading(true);
    
    try {
      
      // Fetch wallet balance
      const balance = await fetchAddressAndBalance(walletAddress);
      setLovelaceBalance(balance.balance.lovelace);
      
      const result = await fetchAllNfts();

      if (result) {
        const { filteredNfts, tokens } = result;
        setNfts(filteredNfts || []);
        setTokens(tokens || []);
      }
      
      if(balance.addressInfo.stake_address) {
        const stakeAddress = await fetchStakeAddress(balance.addressInfo.stake_address);
        setStakeAddress(stakeAddress.stake_address)
        setStakeBalance(stakeAddress.controlled_amount)
        setStakeActive(stakeAddress.active)
      }
      setLovelaceBalance(balance.balance.lovelace);
    } catch (err) {
     
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletData(address);
  }, [address]);

  return (
    <>
      <div className="absolute  bg-background w-full h-full z-10">
        <img className="w-full h-full object-cover" src={bg.src} alt="bg" />
      </div>
      <div className="min-h-screen relative z-20">
        <header className="bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <div className="flex items-center gap-2 bg-card bg-[#1d2022c3] border border-[#2f3641] rounded-full px-6 py-4">
                <Wallet className="h-8 w-8" />
                <h1 className="text-2xl font-bold">Cardano Wallet Explorer</h1>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-16 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-bold">Search wallet address</h2>
              <WalletSearch onSearch={handleSearch} defaultAddress={DEFAULT_ADDRESS} />
          </div>
          <div className="text-center my-8">
            <h2 className={`text-[42px] font-bold uppercase ${stakeActive ? 'text-green-600' : 'text-red-600'}`}>
              {stakeActive ? 'STAKED' : 'UNSTAKED'}
            </h2>
          </div>
          <div className="mb-16">
              <WalletOverview 
                address={address} 
                lovelaceBalance={lovelaceBalance} 
                isLoading={isLoading} 
                stakeAddress={stakeAddress}
                stakeBalance={stakeBalance}
              />
            </div>

            {tokens.length > 1 && (
              <div className="">
                <TokensList tokens={tokens} isLoading={isLoading} />
              </div>
            )}

            <div className="">
                <NFTGallery nfts={nfts} isLoading={isLoading} />
            </div>
        </main>

      </div>
    </>
  );
}
