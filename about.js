const swiper = new Swiper(".swiper", {
  speed: 200,
  loop: false,
  autoHeight: false,
  centeredSlides: false,
  followFinger: true,
  mousewheelControl: true,
  freeMode: false,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  slideToClickedSlide: false,
  slidesPerView: 1,
  rewind: false,
  mousewheel: {
    //forceToAxis: true
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
});

let startValue = "11";
// To avoid layout shifting, the endValue is constructed just
// like the startValue - only this time with the desired end
// value in the middle.
var endValue = "25";
// Options for the odometer
var odometer = new Odometer({
  // el tells the odometer script which element should be the odometer
  el: document.querySelector(".odometer"),
  // value tells the odometer script what the start value should be
  value: startValue,
  // Change how digit groups are formatted, and how many digits
  // are shown after the decimal point
  // Change how long the javascript expects the CSS animation to take
  duration: 3000,
});
// Init odometer with the defined start value
odometer.render(startValue);
// Our trigger should be the current odometer (so "this" is .odometer._2)
odometer.update(endValue);
