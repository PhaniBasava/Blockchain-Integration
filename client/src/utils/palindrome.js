export const isPalindrome = (input) => {
  if (input === null || input === undefined) return false;
  const str = String(input).toLowerCase().replace(/[^a-z0-9]/g, "");
  return str === str.split("").reverse().join("");
};