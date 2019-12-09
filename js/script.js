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
    elem.preventDefault();
    accordItems.forEach(item => item.classList.remove('vertical-accord__item--active'));
    item.classList.toggle('vertical-accord__item--active');
  });

  const closeCross = item.querySelector('.close-cross');
  closeCross.addEventListener('click', elem => {
    accordItems.forEach(item => item.classList.remove('vertical-accord__item--active'));
  })

});

const arrowLeft = document.querySelector('.ingredients__arrow--left');
const arrowRight = document.querySelector('.ingredients__arrow--right');
const barList = document.querySelector('.bars__list');

arrowRight.addEventListener("click", (elem) => loop('right', elem));
arrowLeft.addEventListener("click", (elem) => loop('left', elem));

const loop = (direction, elem) => {
  elem.preventDefault();
  if (direction === 'right') {
    barList.appendChild(barList.firstElementChild);
  } else {
    barList.insertBefore(barList.lastElementChild, barList.firstElementChild);
  }
};