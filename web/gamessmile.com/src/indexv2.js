
function generateUniqueClassName() {
  return 'custom-class-' + Math.random().toString(36).substring(7);
}

function addUniqueClassToElements(elements) {
  elements.forEach(function(element) {
    var uniqueClass = generateUniqueClassName();
    element.classList.add(uniqueClass);
  });
}


var liElements = Array.from(document.querySelectorAll('li'));
var ulElements = Array.from(document.querySelectorAll('ul'));
var pElements = Array.from(document.querySelectorAll('p'));
var divElements = Array.from(document.querySelectorAll('div'));
addUniqueClassToElements(liElements);
addUniqueClassToElements(ulElements);
addUniqueClassToElements(pElements);
addUniqueClassToElements(divElements);
document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".header-drop__icon-open");
  const closeButton = document.querySelector(".header-drop__icon");
  const headerDrop = document.querySelector(".header-drop__nav-wraper");

  burgerButton.addEventListener("click", function () {
    headerDrop.classList.add("active");
    burgerButton.style.display = "none";
    closeButton.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    headerDrop.classList.remove("active");
    burgerButton.style.display = "block";
    closeButton.style.display = "none";
  });
});


const galleryitems = document.querySelectorAll(".more");
const galleryBtn = document.querySelector(".gallery-close");
const backdrop = document.querySelector(".frame-wraper");
const modal = document.querySelector(".modal");
const frame = document.querySelector(".game-window");
const image = document.querySelector(".gallery-img");
const canvas = document.querySelector("canvas");
const nameg = document.querySelector(".game-nameg");

galleryitems.forEach(function (element) {
  element.addEventListener("click", async (e) => {
    const startGame = () => {
      onloadfunc();
      const gameUrl = element.dataset.gameId;

      backdrop.classList.add("modal-visible");
      modal.classList.add("modal-visible");
      frame.src = gameUrl;
      console.log(frame)
      console.log(gameUrl);
      nameg.textContent = element.dataset.gameNameg;
      
      // Проверяем, существует ли элемент canvas
      if (canvas) {
        canvas.style.width = "100%";
        canvas.style.minHeight = "90%";
      }
    }

    const res = await Api.subCoins(10);

    if(res?.status === 'success' || res == null){
      startGame();
    }else{
      alert("Not enough coins!");
    }
  });
});

galleryBtn.addEventListener("click", (e) => {
  backdrop.classList.remove("modal-visible");
  frame.src = "";
});
