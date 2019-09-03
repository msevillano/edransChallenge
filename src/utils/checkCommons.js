/**
 * Compares 2 arrays and return its common elements.
 * @param {Array} arr1 - one of the arrays to compare.
 * @param {Array} arr2 - one of the arrays to compare.
 *
 * @return {Array} - list with common elements.
 */
export default function checkCommons(arr1, arr2) {
  const hash = arr1.reduce((h, e)=> (h[e]=1, h), {});
  return arr2.filter((v)=>hash[v]);
}
