
const API_URL = 'https://cardano-mainnet.blockfrost.io/api/v0';
const PROJECT_ID = 'mainnetRUrPjKhpsagz4aKOCbvfTPHsF0SmwhLc';

import { Address, AssetDetails, TokenDetails } from '@/types/index';

let nftAssets: AssetDetails[];
async function makeBlockfrostRequest(endpoint: string) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'project_id': PROJECT_ID,
        },
      });
      
      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 404) {
          throw new Error(`Resource not found: ${endpoint}`);
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (response.status === 403 || response.status === 401) {
          throw new Error('API authentication failed. Check your project ID.');
        } else {
          throw new Error(`API request failed with status: ${response.status}`);
        }
      }
      
      const data = await response.json();
      nftAssets = data.amount;

      try {
        return data;
      } catch (validationError) {
        console.error('Data validation error:', validationError);
        console.log('Raw API response:', JSON.stringify(data).substring(0, 500) + '...');
        throw validationError;
      }
    } catch (error) {
      if (error) {
        console.error('Data validation error:', error);
        throw new Error('Invalid data received from API');
      }
      throw error;
    }
  }


// Fetch functions
export async function fetchAddressAndBalance(address: string): Promise<{ addressInfo: Address; balance: { lovelace: string; assets: Record<string, string> } }> {
    try {
        const addressInfo: Address = await makeBlockfrostRequest(`/addresses/${address}`);
      
      const balance = {
        lovelace: '0',
        assets: {} as Record<string, string>,
      };
      
      addressInfo.amount.forEach((item: any) => {
        if (item.unit === 'lovelace') {
          balance.lovelace = item.quantity;
        } else {
          balance.assets[item.unit] = item.quantity;
        }
      });
      
      

      return { addressInfo, balance };
    } catch (error) {
      console.error('Error fetching address info and wallet balance:', error);
      throw error;
    }
  }

  export async function fetchStakeAddress(address: string) {
    const data = await makeBlockfrostRequest(`/accounts/${address}`);
    return data;
  }


  export async function fetchAssetDetails(assetId: string, quantity: string): Promise<AssetDetails> {
    try {
      const data = await makeBlockfrostRequest(`/assets/${assetId}`);
      return {
        ...data,
        new_quantity: quantity
      };
    } catch (error) {
      console.error(`Error fetching asset details for ${assetId}:`, error);
      throw error;
    }
  }

  export async function fetchAllNfts() {
    const nfts: AssetDetails[] = [];
    let filteredNfts: AssetDetails[] = [];
    let tokens: TokenDetails[] = [];
    
    if (!nftAssets || nftAssets.length === 0) {
        console.error('nftAssets is undefined or empty');
    }

    nftAssets = nftAssets.filter((item: AssetDetails) => item.unit !== 'lovelace');
    try {
        for (const asset of nftAssets) {
            const assetDetails = await fetchAssetDetails(asset.unit, asset.quantity);
            nfts.push(assetDetails);
        }

        filteredNfts = nfts.filter((item: AssetDetails) => item.quantity === '1')
        tokens = nfts.filter((item: AssetDetails) => item.quantity > '1') as TokenDetails[];
        
        return { filteredNfts, tokens };
    } catch (error) {
      console.error(`Error fetching all NFTs:`, error);
    }
}

