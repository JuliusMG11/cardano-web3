
export interface Address {
    address: string,
    amount: Array<{
        unit: string,
        quantity: string,
    }>,
    stake_address: string | null,
    type: string | null,
    script: boolean | null,
}

export interface AssetDetails {
    asset: string,
    name: string,
    unit: string,
    quantity: string,
    new_quantity: string,
    onchain_metadata: {
        name: string,
        image: string,
        web: string,
        Twitter: string,
        links: {
            website: string,
            twitter: string,
            discord: string,
        }
    },
    metadata: {
        name: string,
        logo: string,
        decimals: number,
    }
}

export interface TokenDetails {
    asset: string,
    quantity: string,
    name: string,
    unit: string,
    new_quantity: string,
    onchain_metadata: {
        name: string,
        image: string,
    },
    metadata: {
        name: string,
        logo: string,
        decimals: number,
    }
}