

// index swiper
const swiper = new Swiper('.swiper', {

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },

    breakpoints: {
        320: {
        slidesPerView: 1,
        spaceBetween: 15,
        },

        480: {
        slidesPerView: 1,
        spaceBetween: 15,
        },

        576: {
        slidesPerView: 2,
        spaceBetween: 15,
        },

        768: {
        slidesPerView: 3,
        spaceBetween: 20,
        },

        992: {
        slidesPerView: 4,
        spaceBetween: 25,
        },

        1400: {
        slidesPerView: 5,
        spaceBetween: 30,
        }
    }
});
