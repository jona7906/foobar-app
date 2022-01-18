"use strict";

import "./scss/style.scss";
import cart from "./cartObject.js";
import "./toggle.js";
import beers from "./beers.js";
import handleMenu from "./handleMenu";

let total = 0;

window.addEventListener("DOMContentLoaded", () => {
  calculateTotalSum();
  start();
});

function calculateTotalSum() {
  //set total sum of beers, for each beer in beers
  // we add the sum of each beer to the total sum.
  // the sum of each beer is calculated by multiplying its price by the amount selected
  beers.forEach((beer) => {
    total += beer.price * cart[beer.name];
  });
}

function start() {
  handleBeers(beers);
  handleMenu();
  addEventListeners();
}

function addEventListeners() {
  sorting();
  filtering();
  document.querySelector(`.order_button`).addEventListener("click", () => {
    document.querySelector(`#top_section`).scrollIntoView({ behavior: "smooth" });
  });
}

function filtering() {
  document.querySelectorAll(".filter_button").forEach((button) => {
    button.addEventListener("mousedown", filterByType);
  });
}

function filterByType(event) {
  let filter = event.target.dataset.filterButton;
  if (filter === "all") handleBeers(beers);
  else {
    let beerArr = beers.filter((beer) => beer.type === filter);
    handleBeers(beerArr);
  }
}

function sorting() {
  document.querySelector("#sort_by_price").addEventListener("mousedown", sortByPrice);
  document.querySelector("#sort_by_alcohol").addEventListener("mousedown", sortByAlc);
}

function sortByPrice(event) {
  let sortDir = event.target.dataset.sortDirection;
  if (sortDir === "asc") {
    sortDir = "desc";
    event.target.dataset.sortDirection = "desc";
    beers.sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0));
    handleBeers(beers);
  } else {
    sortDir = "asc";
    event.target.dataset.sortDirection = "asc";
    beers.sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
    handleBeers(beers);
  }
}

function sortByAlc(event) {
  let sortDir = event.target.dataset.sortDirection;
  if (sortDir === "asc") {
    sortDir = "desc";
    event.target.dataset.sortDirection = "desc";
    beers.sort((a, b) => (a.alc > b.alc ? 1 : b.alc > a.alc ? -1 : 0));
    handleBeers(beers);
  } else {
    sortDir = "asc";
    event.target.dataset.sortDirection = "asc";
    beers.sort((a, b) => (a.alc < b.alc ? 1 : b.alc < a.alc ? -1 : 0));
    handleBeers(beers);
  }
}

//create array of beers with properies
//display each beer - "displayBeer(beer)"
function handleBeers(beerArr) {
  document.querySelector(".beers_container ul").textContent = "";
  beerArr.forEach((beer) => {
    displayBeer(beer);
  });
}

function displayBeer(beer) {
  const template = document.querySelector("template");
  /*  if (!template) return null; */
  const price = beer.price * cart[beer.name];

  const clone = template.content.cloneNode(true);

  const beerTotal = clone.querySelector(".beer-total");
  const beerName = clone.querySelector(".beer_name");
  const thePrice = clone.querySelector(".price");
  const quantity = clone.querySelector(".quantity");
  const totalSum = document.querySelector("#total_sum");

  clone.querySelector(".price").textContent = price + "kr";
  clone.querySelector("img").src = beer.img;
  clone.querySelector(".beer_type").textContent = beer.type + " " + beer.alc + "%";

  thePrice.textContent = beer.price + "kr";
  beerName.textContent = beer.name;
  quantity.textContent = " " + "x" + cart[beer.name];
  /* total += price; */

  //Adding sum for each beer by
  //multiplying the number of beers selected with the price of the selected beer

  beerTotal.textContent = `${calSumOfBeers(beer)}kr`;

  clone.querySelector("#remove").addEventListener("click", () => {
    if (cart[beer.name] === 0) {
      cart[beer.name] = 0;

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart[beer.name] = cart[beer.name] - 1;
      total -= beer.price;
      totalSum.innerHTML = `<h3>GO TO CART</h3> <br> <p>Total: ${total}kr</p>`;
      quantity.textContent = " " + "x" + cart[beer.name];
      beerTotal.textContent = `${calSumOfBeers(beer)}kr`;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });

  clone.querySelector("#add").addEventListener("click", () => {
    cart[beer.name] = cart[beer.name] + 1;
    total += beer.price;
    quantity.textContent = "x" + cart[beer.name];

    totalSum.innerHTML = `<h3>GO TO CART</h3> <br> <p>Total: ${total}kr</p>`;
    /* beerTotalSum = cart[beer.name] * beer.price; */

    beerTotal.textContent = `${calSumOfBeers(beer)}kr`;

    localStorage.setItem("cart", JSON.stringify(cart));
  });
  totalSum.innerHTML = `<h3>GO TO CART</h3> <br> <p>Total: ${total}kr</p>`;
  // append clone to list
  document.querySelector(".beers_container ul").appendChild(clone);
}

//Adding sum for each beer by
//multiplying the number of beers selected with the price of the selected beer
function calSumOfBeers(beer) {
  let beerTotalSum = cart[beer.name] * beer.price;

  return beerTotalSum;
  /* 
  beerTotalSum = cart[beer.name] * beer.price;
  beerTotal.textContent = `${beerTotalSum}kr`; */
}
document.body.style.display = "block";
//https://stackoverflow.com/questions/4172281/force-browsers-to-load-css-before-showing-the-page
