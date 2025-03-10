export const formatAddress = (address: string, isLoading: boolean): string => {
  if (isLoading) {
      return "Loading...";
  }
  return address.length > 16
    ? `${address.substring(0, 8)}...${address.substring(address.length - 8)}`
    : address;
}


export function formatPrice(price: string, isLoading: boolean): string {
  return isLoading 
    ? "Loading..." 
    : `${(Math.round(parseInt(price) / 1000000)).toLocaleString()} ₳`;
}