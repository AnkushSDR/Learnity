var learnity = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
      rotate: 2,
      stretch: 2,
      depth: 55,
      modifier: 10,
      slideShadows: true,
  },
});
