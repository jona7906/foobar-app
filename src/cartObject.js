import beers from "./beers";

let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = {};

  beers.forEach((beer) => (cart[beer.name] = 0));
}

export default cart;
