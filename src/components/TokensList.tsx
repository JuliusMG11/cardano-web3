import { TokenDetails } from "@/types";

import Loader from "@/components/ui/Loader";
import { Image } from "lucide-react";
interface TokensListProps {
    tokens: TokenDetails[];
    isLoading: boolean;
  }
  
  export function TokensList({ tokens, isLoading }: TokensListProps) {
    const formatCardanoTokenQuantity = (quantityString: string, decimals?: number) => {
        if (decimals === undefined) {
            return quantityString; 
        }

        const quantityBigInt = quantityString;
        const divisor = 10 ** decimals;
        const formattedQuantity = Number(quantityBigInt) / Number(divisor);
    
        return formattedQuantity.toLocaleString();
    }

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
            <h2 className="text-2xl font-bold text-center">Total Tokens: {tokens.length}</h2>
            <div className="grid grid-cols-6 gap-2 mt-6 mb-6 items-start">
                {isLoading ? <Loader /> : tokens.map((token) => (
                <div
                className="flex flex-col items-center justify-center"
                 key={token.asset}>
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden shadow-md shadow-[#8c52ff8b] border-3 border-[#8C52FF]">
                        {token.metadata?.logo ? (
                            <div className="flex items-center justify-center h-full w-full">
                                <img className="object-cover" src={`data:image/png;base64,${token.metadata.logo}`} />
                            </div>
                        ) : token.onchain_metadata?.image ? (
                            <div className="flex items-center justify-center h-full w-full">
                                <img className="object-cover" src={formatImageUrl(token.onchain_metadata.image)} />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full w-full">
                                <Image className="h-20 w-20 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                    <div className="p-6 pt-4 flex flex-col items-center">
                        <h2 className="text-lg font-bold text-center">{token.metadata?.name || token.onchain_metadata?.name}</h2>
                        <div className="max-w-max mt-2 bg-[#1d2022c3] border-3 border-[#8C52FF] rounded-xl px-4 py-1">
                            <p className="text-lg text-center font-bold">{formatCardanoTokenQuantity(token.new_quantity, token.metadata?.decimals)}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
  }