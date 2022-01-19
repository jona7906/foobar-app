"use strict";

import "./scss/style.scss";
import "./toggle.js";

document.querySelector("#helpcircle").addEventListener("click", randomTable);
document.querySelector("#helpcircle").addEventListener("click", () => {
  document.querySelector("#helpcircle").classList.add("fadeOut");
  document.querySelector("#helpcircle").addEventListener("animationend", () => {
    document.querySelector(".pressBtnTxt").classList.add("hide");
    document.querySelector(".pressBtnTxt").style.display = "none";
    document.querySelector(".waitMessage").classList.remove("hide");
    document.querySelector(".lds-ripple").classList.add("fadeIn");
    document.querySelector("#helpcircle").style.display = "none";
  });
});

function randomTable() {
  const data = { tableid: Math.floor(Math.random() * 10) + 1 };
  const postData = JSON.stringify(data);
  fetch("https://foobar-cc0c.restdb.io/rest/foobar", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "61b71e3fa3fedd557f8e0abd",
      "cache-control": "no-cache",
    },
    body: postData,
  })
    .then((res) => res.json())
    .then((data) => console.log(`Table ${data} added`));
}
document.body.style.display = "block";
