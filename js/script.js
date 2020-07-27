"use strict";

const aboutUs = document.querySelector(".about-us-js");
const aboutUsTab = document.querySelectorAll(".about-us-tab");
const aboutUsTabContent = document.querySelectorAll(".about-us_tabcontent");

// Functions that hides and show tabs

function hiddenTabContent(el) {
  for (let i = el; i < aboutUsTabContent.length; i++) {
    aboutUsTabContent[i].classList.add("hide");
    aboutUsTabContent[i].classList.remove("fade");
    aboutUsTab[i].classList.remove("about-us_item--active");
  }
}

function showTabContent(i) {
  aboutUsTabContent[i].classList.remove("hide");
  aboutUsTabContent[i].classList.add("fade");
  aboutUsTab[i].classList.add("about-us_item--active");
}

hiddenTabContent(1);

aboutUs.addEventListener("click", handelChangeTab);

function handelChangeTab(event) {
  event.preventDefault();
  if (event.currentTarget === event.target) {
    return;
  } else {
    aboutUsTab.forEach((elem, i) => {
      if (elem === event.target) {
        hiddenTabContent(0);
        showTabContent(i);
      }
    });
  }
}

// Timer
const deltaDays = document.querySelector(".days");
const deltaHours = document.querySelector(".hours");
const deltaMins = document.querySelector(".minutes");
const deltaSec = document.querySelector(".seconds");

class CountdownTimer {
  constructor(selector, targetDate) {
    (this.selector = selector),
      (this.targetDate = new Date(targetDate)),
      (this.timer = setInterval(() => {
        const currentDate = Date.now();
        const deltaTime = this.targetDate - currentDate;
        if (deltaTime <= 0) {
          updateTimer("00", "00", "00", "00");
          clearInterval(this.timer);
        } else {
          const days = pad(Math.floor(deltaTime / (1000 * 60 * 60 * 24)));
          const hours = pad(
            Math.floor((deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          );
          const mins = pad(
            Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60))
          );
          const secs = pad(Math.floor((deltaTime % (1000 * 60)) / 1000));
          updateTimer(days, hours, mins, secs);
        }
      }, 1000));
  }
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateTimer(days, hours, mins, secs) {
  deltaDays.textContent = days;
  deltaHours.textContent = hours;
  deltaMins.textContent = mins;
  deltaSec.textContent = secs;
}

let timerId = new CountdownTimer("#timer", "2020, 07, 01");

// Slider

const slides = document.querySelectorAll(".js-slider_item"),
  slidesPrev = document.querySelector(".arrow-left"),
  slidesNext = document.querySelector(".arrow-right"),
  slidesDots = document.querySelectorAll(".dot"),
  sliderDotsIndicator = document.querySelector(".slider-dots");

let slideIndex = 0;
showSlides(slideIndex);
showDots(slideIndex);

function showSlides(index) {
  if (index < 0) {
    slideIndex = slides.length - 1;
  }
  if (index > slides.length - 1) {
    slideIndex = 0;
  }
  slides.forEach((item) => (item.style.display = "none"));
  slides[slideIndex].style.display = "block";
  showDots(slideIndex);
}

function showDots(index) {
  slidesDots.forEach((dot) => dot.classList.remove("dot-active"));
  slidesDots[slideIndex].classList.add("dot-active");
}

function plusSlider(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

slidesNext.addEventListener("click", () => {
  plusSlider(1);
});
slidesPrev.addEventListener("click", () => {
  plusSlider(-1);
});

sliderDotsIndicator.addEventListener("click", handelChangeSlider);

function handelChangeSlider(event) {
  event.preventDefault();
  if (event.currentTarget === event.target) {
    return;
  }
  if (event.target.classList.contains("dot-active")) {
    return;
  } else {
    slidesDots.forEach((elem, i) => {
      if (elem === event.target) {
        slideIndex = i;
        showSlides(slideIndex);
      }
    });
  }
}

// Сalculator

const result = document.querySelector("#total"),
  inputDays = document.querySelector('.counter-block-input[name="days"]'),
  inputPerson = document.querySelector('.counter-block-input[name="person"]'),
  valuePlace = document.getElementById("select");

  let person,
  days,
  place = 1;

  const priceOneDay = 1000;

function calcTotal() {
  if (!person || !days || !place) {
    result.textContent = "_______";
    return;
  } else {
    result.textContent = person * days * place * priceOneDay;
  }
}

calcTotal();

inputDays.addEventListener("input", () => {
  days = +event.target.value;
  calcTotal();
});
inputPerson.addEventListener("input", () => {
  person = +event.target.value;
  calcTotal();
});

valuePlace.addEventListener("input", () => {
  place = +event.target.value;
  calcTotal();
});


// Form

const form = document.querySelector('#form');

const message = {
  loading: 'img/form/spinner.svg',
  success: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так...'
};

form.addEventListener ('submit', handelPostDateForm);

function handelPostDateForm(e) {
  e.preventDefault();
  const formData = new FormData(form);
     const object = {};
    formData.forEach(function(value, key){
      object[key] = value;
      console.log(object);
    }
      );
}


