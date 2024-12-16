// Mobile Menu Elements
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const closeMenuBtn = document.querySelector('.close-menu');

// Open Mobile Menu
if (menuBtn && mobileMenu && mobileMenuOverlay) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.style.left = '0';
        mobileMenuOverlay.style.display = 'block';
    });

    // Close Mobile Menu
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.style.left = '-100%';
            mobileMenuOverlay.style.display = 'none';
        });
    }

    mobileMenuOverlay.addEventListener('click', () => {
        mobileMenu.style.left = '-100%';
        mobileMenuOverlay.style.display = 'none';
    });
}

// FAQ Elements


