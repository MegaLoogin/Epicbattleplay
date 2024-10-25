// contact form
document.addEventListener("DOMContentLoaded", function () {
  let orderForm = document.getElementById("contactForm");
  let emailInput = document.getElementById("email");

  let savedEmail = getCookie("email");

  if (savedEmail !== "") {
    emailInput.value = savedEmail;
  }

  if (orderForm) {
    orderForm.addEventListener("submit", function (event) {
      document.cookie =
        "email=" +
        encodeURIComponent(emailInput.value) +
        "; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/";
    });
  }
});
