
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }



  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-text-paragraph')
    this.classList.toggle('bi-x')
    disableHeader()
    slide(e)
  })

})()

// disable slider II

const header = document.querySelector('#header');
const main = document.body.querySelector('#main');

function disableHeader(){
  // console.log(header)
  main.addEventListener('click', function(e) {

    if(header.style.left > '100px' && e.offsetX > 230){
      header.style.left = '-300px';

      var mobilenav = document.querySelector('.mobile-nav-toggle');
      mobilenav.classList.toggle('bi-x')
      mobilenav.classList.toggle('bi-text-paragraph')
    }
  })
}

function slide(e){
  if(e.target.classList.contains('bi-text-paragraph')) {
    header.style.left = '-300px';
    
  }if(e.target.classList.contains('bi-x')) {
    header.style.left = '2px';
  }
}

/*--------------------------------------
  # Courses Slider
--------------------------------------*/ 
var swiper = new Swiper(".slide-one", {
    speed: 400,
    slidesPerView: 4,
    spaceBetween: 25,
    slidesPerGroup: 4,
    fade: 'true',
    centerSlide: true,
    autoplayTimeout: 4000,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 4,
        },
    },
});
/*--------------------------------------
  # Courses Slider (2)
--------------------------------------*/ 
var swiper = new Swiper(".slide-two", {
    speed: 400,
    slidesPerView: 4,
    spaceBetween: 25,
    slidesPerGroup: 4,
    fade: 'true',
    centerSlide: true,
    autoplayTimeout: 4000,
    loop: true,
    loopFillGroupWithBlank: true, 
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: 'bullets',
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper_nav_next",
        prevEl: ".swiper_nav_prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 4,
        },
    },
});
