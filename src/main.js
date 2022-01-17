"use strict";

import "./scss/style.scss";
import cart from "./cartObject.js";
import "./toggle.js";

window.addEventListener("DOMContentLoaded", () => {
  // get();
});

import beers from "./beers.js";

const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;
let total = 0;
let localCart = JSON.parse(localStorage.getItem("cart"));
//set total sum of beers, for each beer in beers we add the sum of each beer to the total sum.
// the sum of each beer is calculated by multiplying its price by the amount selected
beers.forEach((beer) => {
  total += beer.price * cart[beer.name];
});

console.log(localCart);
/* localCart.cart.forEach((beer) => {
  total = beer.price;
}); */
/* total = localCart.total; */
menuBtn.addEventListener("click", toggleMenu);

document.querySelector(`.order_button`).addEventListener("click", () => {
  document.querySelector(`#top_section`).scrollIntoView({ behavior: "smooth" });
});

function toggleMenu() {
  if (!showMenu) {
    hamburger.classList.add("open");
    nav.classList.add("open");
    menuNav.classList.add("open");
    navItems.forEach((item) => item.classList.add("open"));

    showMenu = true;
  } else {
    hamburger.classList.remove("open");
    nav.classList.remove("open");
    menuNav.classList.remove("open");
    navItems.forEach((item) => item.classList.remove("open"));

    showMenu = false;
  }
}

start();
function start() {
  sorting();
  handleBeers(beers);
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
    handleBeers();
  } else {
    sortDir = "asc";
    event.target.dataset.sortDirection = "asc";
    beers.sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0));
    handleBeers();
  }

  console.log("price");

  /* location.reload(); */
}
function sortByAlc(event) {
  let sortDir = event.target.dataset.sortDirection;
  if (sortDir === "asc") {
    sortDir = "desc";
    event.target.dataset.sortDirection = "desc";
    beers.sort((a, b) => (a.alc > b.alc ? 1 : b.alc > a.alc ? -1 : 0));
    handleBeers();
  } else {
    sortDir = "asc";
    event.target.dataset.sortDirection = "asc";
    beers.sort((a, b) => (a.alc < b.alc ? 1 : b.alc < a.alc ? -1 : 0));
    handleBeers();
  }
  console.log("alcholol");
}

//create array of beers with properies
//display each beer - "displayBeer(beer)"
function handleBeers() {
  /* location.reload(); */
  document.querySelector(".beers_container ul").textContent = "";
  beers.forEach((beer) => {
    displayBeer(beer);
  });
}

function displayBeer(beer) {
  const template = document.querySelector("template");
  if (!template) return null;

  const clone = template.content.cloneNode(true);

  const beerTotal = clone.querySelector(".beer-total");
  const beerName = clone.querySelector(".beer_name");
  const thePrice = clone.querySelector(".price");
  const price = beer.price * cart[beer.name];
  /* total += price; */
  clone.querySelector(".price").textContent = price + "kr";
  const totalSum = document.querySelector("#total_sum");

  clone.querySelector("img").src = beer.img;
  beerName.textContent = beer.name;
  clone.querySelector(".beer_type").textContent = beer.type + " " + beer.alc + "%";
  thePrice.textContent = beer.price + "kr";
  const quantity = clone.querySelector(".quantity");

  quantity.textContent = " " + "x" + cart[beer.name];

  let beerTotalSum = cart[beer.name] * beer.price;
  beerTotal.textContent = `${beerTotalSum}kr`;

  clone.querySelector("#remove").addEventListener("click", () => {
    if (cart[beer.name] === 0) {
      cart[beer.name] = 0;

      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      cart[beer.name] = cart[beer.name] - 1;
      total -= beer.price;
      totalSum.innerHTML = `<h3>GO TO CART</h3> <br> <p>Total: ${total}kr</p>`;
      quantity.textContent = " " + "x" + cart[beer.name];
      beerTotalSum = cart[beer.name] * beer.price;
      beerTotal.textContent = `${beerTotalSum}kr`;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    // cart[beer.name] === 0 ? (cart[beer.name] = 0) : (cart[beer.name] = cart[beer.name] - 1);
  });

  clone.querySelector("#add").addEventListener("click", () => {
    cart[beer.name] = cart[beer.name] + 1;
    total += beer.price;
    quantity.textContent = "x" + cart[beer.name];

    totalSum.innerHTML = `<h3>GO TO CART</h3> <br> <p>Total: ${total}kr</p>`;
    beerTotalSum = cart[beer.name] * beer.price;
    beerTotal.textContent = `${beerTotalSum}kr`;
    localStorage.setItem("cart", JSON.stringify(cart));
  });
  totalSum.innerHTML = `<h3>GO TO CART</h3> <br> <p>Total: ${total}kr</p>`;
  // append clone to list
  document.querySelector(".beers_container ul").appendChild(clone);
}

// function removeFromCart(event) {
//   let item = event.target.getAttribute('data-name')
//   console.log(cart)
// }

/* function myToggle() {
  var element = document.body;
  element.classList.add("light-mode");
  element.classList.add("dark-mode");
}
 */
document.body.style.display = "block";
//https://stackoverflow.com/questions/4172281/force-browsers-to-load-css-before-showing-the-page
