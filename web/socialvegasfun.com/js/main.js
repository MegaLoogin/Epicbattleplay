// btn show tell
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.phone-button').addEventListener('click', function() {
    const phoneContainer = document.querySelector('.contact-phone-container');
    phoneContainer.classList.toggle('active');
  });
});
// drower menu
function toggleMenu() {
  const menu = document.querySelector('.drawer-menu__container');

  if (menu.classList.contains('drawer-menu__container--open')) {
    menu.classList.remove('drawer-menu__container--open');
  } else {
    menu.classList.add('drawer-menu__container--open');
  }
}
// my custom btn effect
let customBtns = document.querySelectorAll('.banner-btn');
customBtns.forEach(customBtn => {
  customBtn.addEventListener('mousemove', e => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX * 3 - rect.left;
    customBtn.style.setProperty('--x', x + 'deg');
  });
});
// slider
var swiperin = new Swiper(".mySwiper-alisa", {
  speed: 10000,
  loop: true,
  autoplay: {
      delay: 3000,
      delay: 0,
      disableOnInteraction: false,
  },
  slideToClickedSlide: true,

  breakpoints: {
      300: {
          slidesPerView: 1,
          spaceBetween: 10,
      },
      500: {
          slidesPerView: 2,
          spaceBetween: 10,
      },
      769: {
          slidesPerView: 3,
          spaceBetween: 20,
      },
  },
});



