"use strict";

const toggle = document.querySelector(".toggle");
let element = document.body;
let checked = false;

toggle.addEventListener("click", () => {
  const onOff = toggle.parentNode.querySelector(".onoff");
  checked = !checked;
  onOff.textContent = checked ? "Lightmode" : "Darkmode";
  onOff.checked = element.classList.toggle("light-mode");
  onOff.unchecked = element.classList.toggle("dark-mode");
});
