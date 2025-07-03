export const shortenAddress = (address) => {
  if (!address || typeof address !== "string") return ""; // gracefully handle undefined or non-string inputs
  // If the address is unexpectedly short, return it unchanged to avoid slicing errors
  if (address.length <= 10) return address;

  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
};
