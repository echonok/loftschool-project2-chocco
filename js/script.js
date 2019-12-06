const menuButton = document.querySelector('.bar__icon');
const menuList = document.querySelector('.bar__ingredients');

menuButton.addEventListener('click', (elem) => {
  elem.preventDefault();
  menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
});

const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('#hamburger-animated');
hamburger.addEventListener('click', (elem) => {
  elem.preventDefault();
  hamburger.classList.toggle('open');
});