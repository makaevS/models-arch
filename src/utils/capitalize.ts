/** Function that returns given string with first letter capitalized. */
const capitalize = (str: string) => 
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export { capitalize };