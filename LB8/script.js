var swiper = new Swiper(".swiper", {
    grabCursor: true,
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1
        },
        450: {
            slidesPerView: 2
        },
        650: {
            slidesPerView: 3
        },
        850: {
            slidesPerView: 4
        }
    }
});

const button_left = document.getElementById("swipe-left").addEventListener("click", () => swiper.slidePrev(200));
const button_right = document.getElementById("swipe-right").addEventListener("click", () => swiper.slideNext(200));


