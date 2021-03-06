(() => {
const menuButtons = document.querySelectorAll('.bar__icon');
const menuLists = document.querySelectorAll('.bar__ingredients');
menuButtons.forEach((menuButton, index) => {
  menuButton.addEventListener('click', (elem) => {
    elem.preventDefault();
    menuLists[index].style.display = menuLists[index].style.display === 'block' ? 'none' : 'block';
  });  
})

const mobileMenu = document.querySelector('#mobile-menu');
const hamburger = document.querySelector('#hamburger-animated');
hamburger.addEventListener('click', (elem) => {
  elem.preventDefault();
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

const mobileItems = document.querySelectorAll('.mobile__link');
mobileItems.forEach(elem => {
  elem.addEventListener('click', e => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

const accordItems = document.querySelectorAll('.vertical-accord__item');
const accordTriggers = document.querySelectorAll('.vertical-accord__trigger');
accordTriggers.forEach(trigger => {

  trigger.addEventListener('click', event => {
    event.preventDefault();
    closeAllItem();
    trigger.parentNode.classList.toggle('vertical-accord__item--active');
  });

  const closeCross = trigger.parentNode.getElementsByClassName("close-cross")[0];
  closeCross.addEventListener('click', event => {
    event.preventDefault();
    closeAllItem();
  });

  const closeAllItem = () => {
    accordItems.forEach(item => item.classList.remove('vertical-accord__item--active'));
  };

});

const arrowLeft = document.querySelector('.ingredients__arrow--left');
const arrowRight = document.querySelector('.ingredients__arrow--right');
const barList = document.querySelector('.bars__list');

let sliderStep = barList.firstElementChild.offsetWidth;
let sliderPosition = 0;
let leftEdge = 0;
let rightEdge = (barList.children.length - 1) * sliderStep;

const resizeSlider = () => {
  sliderStep = barList.firstElementChild.offsetWidth;
  rightEdge = (barList.children.length - 1) * sliderStep;
};

window.addEventListener('resize', () => resizeSlider());

arrowLeft.addEventListener("click", (event) => {
  event.preventDefault();
  sliderPosition = sliderPosition === leftEdge ? rightEdge : sliderPosition - sliderStep;
  barList.style.transform = `translate(-${sliderPosition}px`;
});

arrowRight.addEventListener("click", (event) => {
  event.preventDefault();
  sliderPosition = sliderPosition === rightEdge ? leftEdge : sliderPosition + sliderStep;
  barList.style.transform = `translate(-${sliderPosition}px`;
});

const orderForm = document.querySelector('#order-form');
const orderButton = document.querySelector('#order-button');
const closeButton = document.querySelector('#close-button');
const modalWindow = document.querySelector('.modal');
const modalresult = document.querySelector('.result');

orderButton.addEventListener('click', (event) => {
  event.preventDefault();

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

const memberHead = document.querySelectorAll('.member__head');
memberHead.forEach(member => {
  member.addEventListener('click', event => {
    member.classList.toggle('member__head--opened');
  });
});

const createCarrousel = () => {

  const addReviewPoint = (review, parent) => {
    const li = document.createElement("li");
    li.classList.add('review__carrousel-item');

    const link = li.appendChild(document.createElement("a"));
    link.classList.add('review__link');

    const image = link.appendChild(document.createElement("img"));
    image.classList.add('review__avatar--mini');
    image.setAttribute("src", review.getElementsByClassName('review__avatar')[0].getAttribute('src'));

    parent.appendChild(li);
  };

  const reviewCarrousel = document.querySelector('.review__carrousel');
  const reviews = document.querySelectorAll('.review__item');

  reviews.forEach(review => {
    addReviewPoint(review, reviewCarrousel);
  });
  reviewCarrousel.firstElementChild.classList.add('review__carrousel-item--active');

  const reviewsAvatars = document.querySelectorAll('.review__carrousel-item');

  reviewsAvatars.forEach((avatar, index) => {
    avatar.addEventListener('click', (event) => {
      reviewsAvatars.forEach(elem => elem.classList.remove('review__carrousel-item--active'));
      avatar.classList.add('review__carrousel-item--active');
      reviews.forEach(review => review.classList.remove('review__item--active'));
      reviews[index].classList.add('review__item--active');
    });
  });

};

createCarrousel();

const mySwiper = new Swiper('.swiper-container', {
  speed: 300,
  spaceBetween: 0,
  direction: 'vertical',
  centeredSlides: true,
  //centeredSlidesBounds: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  mousewheel: true,
});

window.addEventListener('wheel', (event) => {
  //event.preventDefault();
  event.deltaY < 0 ? mySwiper.slidePrev() : mySwiper.slideNext();
});

const navItems = document.querySelectorAll("[data-scroll-to]");

navItems.forEach((elem, index) => {
  elem.addEventListener('click', e => mySwiper.slideTo(elem.getAttribute('data-scroll-to')));
});

})()