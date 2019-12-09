const menuButton = document.querySelector('.bar__icon');
const menuList = document.querySelector('.bar__ingredients');

menuButton.addEventListener('click', (elem) => {
  elem.preventDefault();
  menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
});

const mobileMenu = document.querySelector('#mobile-menu');
const hamburger = document.querySelector('#hamburger-animated');
hamburger.addEventListener('click', (elem) => {
  elem.preventDefault();
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

const accordItems = document.querySelectorAll('.vertical-accord__item');

accordItems.forEach(item => {
  const accordTrigger = item.querySelector('.vertical-accord__trigger');
  accordTrigger.addEventListener('click', elem => {
    
    accordItems.forEach(item => item.classList.remove('vertical-accord__item--active'));

    elem.preventDefault();
    item.classList.toggle('vertical-accord__item--active');
  });

  const closeCross = item.querySelector('#close-cross');
  closeCross.addEventListener('click', elem => {
    accordItems.forEach(item => item.classList.remove('vertical-accord__item--active'));
  })
});