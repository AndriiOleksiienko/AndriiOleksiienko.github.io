const breakpoints = [
    { maxWidth: 450, slidesPerView: 1 },
    { maxWidth: 650, slidesPerView: 2 },
    { maxWidth: 850, slidesPerView: 3 },
];



var swiper = new Swiper(".swiper", {
    grabCursor: true,
    loop: true,
    slidesPerView: calculateSlidesPerView(),
});

const button_left = document.getElementById("swipe-left").addEventListener("click", () => swiper.slidePrev(200));
const button_right = document.getElementById("swipe-right").addEventListener("click", () => swiper.slideNext(200));


function calculateSlidesPerView() {
    let slides = 4; 

    for (const breakpoint of breakpoints) {
        if (window.innerWidth <= breakpoint.maxWidth) {
            slides = breakpoint.slidesPerView;
            break;
        }
    }
    return slides;
}

function updateSlidesPerView() {
    swiper.params.slidesPerView = calculateSlidesPerView();
    swiper.update();
}

window.addEventListener("resize", updateSlidesPerView);
updateSlidesPerView();
