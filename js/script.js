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

const orderForm = document.querySelector('#order-form');
const orderButton = document.querySelector('#order-button');
const closeButton = document.querySelector('#close-button');
const modalWindow = document.querySelector('.modal');
const modalresult = document.querySelector('.result');

orderButton.addEventListener('click', (elem) => {
  elem.preventDefault();
  
  if (validateForm(orderForm)) {
    
    const myMail = 'echonok@gmail.com';

    const formData = new FormData();
    formData.append('name', orderForm.elements.name.value);
    formData.append('phone', orderForm.elements.phone.value);
    formData.append('comment', orderForm.elements.comment.value);
    formData.append('to', myMail);

    sendDataFetch(formData);

  }
});

const sendDataFetch = async (formData) => {
  try {
    const response = await fetch('https://webdev-api.loftschool.com/sendmail', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    debugger;
    modalWindow.style.display = 'block';
    modalresult.textContent = "Заказ успешно отправлен. Благодарим за заказ!";
  } catch (error) {
    modalWindow.style.display = 'block';
    modalresult.textContent = "Не удалось отправить заказ. Пожалуйста попробуйте позже или воспользуйтесь заказом по телефону";
  }
};

const sendDataXML = (formData) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.send(formData);
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    console.log(JSON.parse(xhr.response).message);
    modalWindow.style.display = 'block';
  })
};

closeButton.addEventListener('click', () => {
  modalWindow.style.display = "none";
});

closeButton.addEventListener('click', () => {
  modalErrorWindow.style.display = "none";
})


window.addEventListener('click', (elem) => {
  if (event.target === modalWindow) {
    modalWindow.style.display = "none";
  }
})

const validateForm = (form) => {
  let valid = true;
  
  if (!validateField(form.elements.name)) {
    valid = false;
  }

  if (!validateField(form.elements.phone)) {
    valid = false;
  }

  if (!validateField(form.elements.comment)) {
    valid = false;
  }

  return valid;
};

const validateField = (field) => {
  //debugger;
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
};