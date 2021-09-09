/*
  Do not change the line below. If you'd like to run code from this file, you may use the `exampleSongData` variable below to gain access to tickets data. This data is pulled from the `data/songs.js` file.

  You may use this data to test your functions. You may assume the shape of the data remains the same but that the values may change.

  Keep in mind that your functions must still have and use a parameter for accepting all songs.
*/
const exampleProducts = [
  { id: 1, name: "Panel Headboard", priceInCents: 12332 },
  { id: 2, name: "Low Profile Sleigh Bed", priceInCents: 22999 },
  { id: 3, name: "Oval 100% Cotton Solid Bath Rug", priceInCents: 1399 },
  { id: 4, name: "Abstract Light Gray Area Rug", priceInCents: 33999 },
  { id: 5, name: "Multi Game Table", priceInCents: 81743 },
];
// Do not change the line above.

/*
  This function should throw an error if:
  - The `cart` array is empty.
*/
function getCartTotal(cart) {

  if(cart.length === 0 ){
    throw ("The cart is empty");
  }

  let result = 0;
  for (let product of cart) {
    result += product.priceInCents;
  }
  return result;

}

/*
  This function should throw an error if:
  - The `products` array is empty.
  - Either `min` or `max` is not a number.
  - `max` is equal to `0`.
  - `min` is greater than `max`.
  - Either `min` or `max` is less than `0`.
  - Any of the products in the `products` array does not have a `priceInCents` key.
*/
function filterProductsByPriceRange(products, min, max) {

 // products array is empty 
  if(products.length === 0){
    throw "`products` array is empty";
  }
// either min or max is not a number 
  if(!min === Number || !max === Number){
    throw "`min` or `max` is not a number";
  }
  //if max is === 0;
  if(max === 0){
    throw "`max` is equal to `0`"
  }
  // min is greater than max 
  if(min > max){
    throw "`min` is greater than `max` "
  }
  // either min or max is less than 0 
  if(min < 0 || max < 0 ){
    throw "Either `min` or `max` is less than `0`"
  }

 for (let product of products){
 if(product !== product.priceInCents) {
    throw "Any of the products in the `products` array does not have a `priceInCents` key"
  }
}

  const result = [];
  for (let product of products) {
    if (product.priceInCents >= min && product.priceInCents <= max) {
      result.push(product);
    }
  }
  return result;
}

/*
  If any errors occur in this function, it should return `0`.
*/
function getTotalOfAllProductsByPriceRange(products, min, max) {

  for (let product of products) {
    if (product.priceInCents >= min && product.priceInCents <= max) {
      throw 0;
    }
  }

  if(!products ||  !min || !max ){
    throw 0;

  }
 


  const filteredProducts = filterProductsByPriceRange(products, min, max);
  const total = getCartTotal(filteredProducts);

  return total;
}


module.exports = {
  getCartTotal,
  filterProductsByPriceRange,
  getTotalOfAllProductsByPriceRange,
};
