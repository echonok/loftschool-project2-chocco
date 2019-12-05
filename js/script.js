const menuButton = document.querySelector('.bar__icon');
const menuList = document.querySelector('.bar__ingredients');

menuButton.addEventListener('click', () => {
  menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
});