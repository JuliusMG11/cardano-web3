import { AssetDetails } from "@/types";
import Link from 'next/link'

import { AppWindow, Twitter, Image } from 'lucide-react';

import Loader from "@/components/ui/Loader";

interface NFTGalleryProps {
    nfts: AssetDetails[];
    isLoading: boolean;
  }
  
  export function NFTGallery({ nfts, isLoading }: NFTGalleryProps) {

    const formatImageUrl = (imageUrl: string | string[]) => {
        let image;
        if (Array.isArray(imageUrl)) {
            console.warn("imageUrl is an array, using the first element:", imageUrl[0]);
            imageUrl = imageUrl[0];
        }
        
        if (typeof imageUrl === 'string') {
            if (imageUrl.startsWith("ipfs://ipfs/")) {
                image = imageUrl.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/");
            } else if (imageUrl.startsWith("ipfs://")) {
                image = imageUrl.replace("ipfs://", "https://ipfs.io/ipfs/");
            } else if (imageUrl.startsWith("http://")) {
                image = imageUrl; 
            }
        } else {
            console.error("Invalid imageUrl:");
            return "";
        }
        return image;
    }
    return (
        <div>
            <h2 className="text-2xl font-bold text-center">Total NFTs: {nfts.length}</h2>
            <div className="grid grid-cols-5 gap-10 mt-4">
                {isLoading ? <Loader /> : nfts.map((nft) => (
                <div
                className="bg-[#1d2022c3] border-3 border-[#8C52FF] rounded-xl shadow-md shadow-[#8c52ff8b] flex flex-col items-center "
                 key={nft.asset}>
                    <div className="w-full h-[200px] rounded-xl overflow-hidden relative">
                    <div className="flex flex-col absolute top-2 right-2 gap-2">
                        {nft.onchain_metadata?.web || nft.onchain_metadata?.links?.website ? (
                            <Link 
                                href={`https://${nft.onchain_metadata.web || nft.onchain_metadata.links.website}`} 
                                target="_blank" 
                                className="bg-[#1d2022c3] z-10 w-10 h-10 border-3 border-[#8C52FF] rounded-full flex items-center justify-center cursor-pointer"
                            >
                                <AppWindow className="h-6 w-6 text-muted-foreground" />
                            </Link>
                        ) : null}
                        {nft.onchain_metadata?.Twitter || nft.onchain_metadata?.links?.twitter ? (
                            <Link 
                                href={nft.onchain_metadata.Twitter || nft.onchain_metadata.links.twitter}
                                target="_blank"
                                className="bg-[#1d2022c3] z-10 w-10 h-10 border-3 border-[#8C52FF] rounded-full flex items-center justify-center cursor-pointer"
                            >
                                <Twitter className="h-6 w-6 text-muted-foreground" />
                            </Link>
                        ) : null}
                    </div>
                        {nft.onchain_metadata?.image ? (
                            <img className="object-cover" src={formatImageUrl(nft.onchain_metadata.image)} />
                        ) : (
                            <div className="flex items-center justify-center h-full w-full">
                                <Image className="h-20 w-20 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div className="p-6 pt-4">
                        <h2 className="text-lg font-bold text-center">{nft.onchain_metadata?.name}</h2>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
  }