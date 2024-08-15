export const startCase = (str: string) => {
  return str
    .split(/[_ ]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};




// convert number to currency format
export const currencyFormat = (num: number) => {
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}