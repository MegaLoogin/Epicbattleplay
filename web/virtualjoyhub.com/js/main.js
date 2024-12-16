document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const drawerMenu = document.getElementById('drawerMenu');
    const closeMenu = document.getElementById('closeMenu');

    const toggleMenu = () => {
        drawerMenu.classList.toggle('active');
        const isActive = drawerMenu.classList.contains('active');
        drawerMenu.setAttribute('aria-hidden', !isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    drawerMenu.querySelectorAll('.drawer-menu__link').forEach(link =>
        link.addEventListener('click', toggleMenu)
    );
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.news-card');
    const descriptions = document.querySelectorAll('.game-description');

    cards.forEach(card => {
        card.addEventListener('click', () => {

            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            descriptions.forEach(desc => desc.classList.remove('active'));

            const targetId = card.getAttribute('data-target');
            const targetDescription = document.getElementById(targetId);
            if (targetDescription) {
                targetDescription.classList.add('active');
            }
        });
    });
});

var swiper = new Swiper(".mySwiper", {
    speed: 1000,
    grabCursor: true,
    centeredSlides: true,
    loopedSlides: 2,
    initialSlide: 1,
    loop: true,
    createElements: true,
    autoplay: true,
    slideToClickedSlide: true,

    breakpoints: {
        300: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 10,
        },
        500: {
            slidesPerView: 2,
            centeredSlides: false,
            spaceBetween: 10,
        },

        769: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        faqItem.classList.toggle('active');
    });
});



