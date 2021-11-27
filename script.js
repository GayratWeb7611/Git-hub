window.addEventListener('DOMContentLoaded', () => {
  'use strict';
  ////////////////////////////
  // loading Image
  document.querySelectorAll('.lazy-img').forEach(img => {
    img.style.filter = 'blur(0)';
  });
  ///////////////////////////////////////
  // Modal window

  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

  const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

  overlay.addEventListener('click', closeModal);
  btnCloseModal.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  const btnScroll = document.querySelector('.btn--scroll-to');

  const sectionOne = document.querySelector('#section--1');

  btnScroll.addEventListener('click', e => {
    const s1coords = sectionOne.getBoundingClientRect();
    console.log(s1coords);
    console.log(e.target.getBoundingClientRect());
    console.log(window.pageXOffset, window.pageYOffset);
    console.log(
      document.documentElement.clientWidth,
      document.documentElement.clientHeight
    );
    window.scrollTo({
      top: s1coords.top + window.pageYOffset,
      left: s1coords.left + window.pageXOffset,
      behavior: 'smooth',
    });
  });

  ///////////////////////
  //scrool eventing
  // const nav = document.querySelector('.nav');
  // window.addEventListener('scroll', () => {
  //   if (window.scrollY > 100) {
  //     nav.classList.add('sticky');
  //   } else {
  //     nav.classList.remove('sticky');
  //   }

  // });
  // window.addEventListener('beforeunload', function (e) {
  //   e.preventDefault();
  //   console.log(e);
  //   e.returnValue = '';
  // });

  // let h1 =document.querySelector('h1')

  // h1.onclick = function(e){
  //   alert('salom')
  // }

  // const navs = document.querySelectorAll('.nav__link');

  // navs.forEach(el => {
  //   el.onclick = function(e){
  //     e.preventDefault()
  //     const id = this.getAttribute('href')
  //     document.querySelector(id).scrollIntoView({behavior:'smooth'})
  //   }
  // });

  document.querySelector('.nav__links').addEventListener('click', function (e) {
    if (e.target.classList.contains('nav__link')) {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });

  ///////////////
  // Tabs Component

  const tabs = document.querySelectorAll('.operations__tab');

  const tabsContainer = document.querySelector('.operations__tab-container');

  const tabsContent = document.querySelectorAll('.operations__content ');

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach((tab, i) => {
        tab.classList.remove('operations__tab--active');
      });

      tab.classList.add('operations__tab--active');
      tabsContent.forEach(tabContent => {
        tabContent.classList.remove('operations__content--active');
      });
      tabsContent[i].classList.add('operations__content--active');
    });
  });

  ///////////////////////
  //slider section

  const slides = document.querySelectorAll('.slide');
  const sliderBtnLeft = document.querySelector('.slider__btn--left');
  const sliderBtnRight = document.querySelector('.slider__btn--right');
  const dots = document.querySelector('.dots');
  let curNum = 0;

  const createDot = function () {
    slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide = '${i}'></button>`
      );
    });
  };

  createDot();

  const activeDot = function (active) {
    document.querySelectorAll('.dots__dot').forEach(e => {
      e.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide='${active}']`)
      .classList.add('dots__dot--active');
  };

  activeDot(0);
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
  });

  const toDoSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  toDoSlide(0);
  const btnNext = function () {
    dots.addEventListener('click', e => {
      if (e.target.classList.contains('dots__dot')) {
        const { slide } = e.target.dataset;
        activeDot(slide);
        toDoSlide(slide);
        curNum = slide;
      }
    });
  };

  btnNext();
  const keydown = function () {
    window.addEventListener('keydown', e => {
      e.key == 'ArrowRight' && next();
      e.key == 'ArrowLeft' && prev();
    });
  };
  keydown();

  const next = function () {
    if (curNum == slides.length - 1) {
      curNum = 0;
    } else {
      curNum++;
    }
    activeDot(curNum);
    toDoSlide(curNum);
  };
  const prev = function () {
    if (curNum == 0) {
      curNum = slides.length - 1;
    } else {
      curNum--;
    }
    activeDot(curNum);
    toDoSlide(curNum);
  };
  sliderBtnLeft.addEventListener('click', prev);
  sliderBtnRight.addEventListener('click', next);
});

///////////////

// stiky

const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const callback = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky', 'qushdi');
  } else nav.classList.remove('sticky');
};
const observeNav = new IntersectionObserver(callback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

observeNav.observe(header);
 