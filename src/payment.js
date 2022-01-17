"use strict";

import "card/dist/card";

new Card({
  form: "form",
  container: ".card_container",
});

document.body.style.display = "block";

document.querySelector("#submit").addEventListener("click", function () {
  document.querySelectorAll("#payment_form span").forEach((span) => (span.textContent = null));

  const validate = validatePayment();
  if (!validate) return null;
  const newUrl = "/payment_accepted.html";
  document.location.href = newUrl;
});

function validatePayment() {
  const patterns = {
    number: /^\d{4} \d{4} \d{4} \d{4}$/,
    name: /^.+ .+$/,
    expiry: /^\d{2} \/ \d{4}$/,
    cvc: /^\d{3}$/,
  };
  const errorMessage = {
    number: "Not a valid cardnumber",
    name: "Not a valid name",
    expiry: "Not a valid expiration date",
    cvc: "Not a valid cvc",
  };

  const inputs = document.querySelectorAll("#payment_form input");
  for (const input of inputs) {
    const pattern = patterns[input.name];

    const test = pattern.test(input.value);

    if (!test) {
      document.querySelector("#" + input.name + " span").textContent = errorMessage[input.name];
      return false;
    }
  }
  return true;
}
