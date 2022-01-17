"use strict";

import "./scss/cart.scss";
import "./scss/style.scss";
import "./toggle.js";

import beers from "./beers.js";
import cart from "./cartObject.js";

const menuBtn = document.querySelector(".menu-btn");
const hamburger = document.querySelector(".menu-btn__burger");
const nav = document.querySelector(".nav");
const menuNav = document.querySelector(".menu-nav");
const navItems = document.querySelectorAll(".menu-nav__item");

let showMenu = false;
document.addEventListener("DOMContentLoaded", displaybeer);
menuBtn.addEventListener("click", toggleMenu);

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

let total = 0;

function displaybeer() {
  beers.forEach((beer) => {
    if (cart[beer.name] === 0) {
      return null;
    }
    const clone = document.querySelector("template").content.cloneNode(true);
    const beerName = clone.querySelector(".beer_name");
    const thePrice = clone.querySelector(".price");
    const price = beer.price * cart[beer.name];
    total += price;
    clone.querySelector(".price").textContent = price + "kr";
    const totalSum = document.querySelector("#total");
    beerName.textContent = cart[beer.name] + " " + "x" + " " + beer.name;
    clone.querySelector("#remove").addEventListener("click", () => {
      if (cart[beer.name] === 0) cart[beer.name] = 0;
      else {
        cart[beer.name] = cart[beer.name] - 1;
        total -= beer.price;
      }
      thePrice.textContent = beer.price * cart[beer.name] + "kr";

      beerName.textContent = cart[beer.name] + " " + "x" + " " + beer.name;
      totalSum.textContent = total + " " + "kr" + " " + "pay";
      localStorage.setItem("cart", JSON.stringify(cart));
    });
    clone.querySelector("#add").addEventListener("click", () => {
      cart[beer.name] = cart[beer.name] + 1;
      total += beer.price;
      thePrice.textContent = beer.price * cart[beer.name] + "kr";
      beerName.textContent = cart[beer.name] + " " + "x" + " " + beer.name;
      totalSum.textContent = total + " " + "kr" + " " + "pay";
      localStorage.setItem("cart", JSON.stringify(cart));
    });
    totalSum.textContent = total + " " + "kr" + " " + "pay";
    document.querySelector(".order_list").appendChild(clone);
  });
}
document.body.style.display = "block";

function hidePaymentOptions() {
  document.querySelectorAll(".icon_container div").forEach((div) => (div.style.display = "none"));
}

document.querySelector(".card").addEventListener("click", () => {
  hidePaymentOptions();
  document.querySelector(".card_container").style.display = "block";
  document.querySelector("form").classList.remove("hide");
  document.querySelector(".payment_container h1").style.display = "none";
});
document.querySelector(".mp").addEventListener("click", () => {
  hidePaymentOptions();
  document.querySelector(".scan").textContent = "Scan this qr code to proceed";
  const image = document.createElement("img");
  image.src = "/assets/images/qr_img.png";
  document.querySelector(".qr_container").appendChild(image);
  document.querySelector(".payment_container h1").style.display = "none";
});
document.querySelector(".cash").addEventListener("click", () => {
  hidePaymentOptions();
  document.querySelector(".cash_response").textContent = "Thanks for ordering! Please proceed to the bar and  Your table number is: " + Math.ceil(Math.random() * 10);
  document.querySelector(".payment_container h1").style.display = "none";
});

document.body.style.display = "block";
