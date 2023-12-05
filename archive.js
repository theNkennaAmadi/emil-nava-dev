let Sections = gsap.utils.toArray(".archive-item"),
  getTotalWidth = () => {
    let width = 0;
    Sections.forEach((el) => (width += el.offsetWidth));
    return width * 1.15;
  };
gsap.to(Sections, {
  x: () => -getTotalWidth() + window.innerWidth,
  ease: "none",
  scrollTrigger: {
    trigger: ".archive-list",
    pin: true,
    start: 0,
    end: () =>
      "+=" +
      (document.querySelector(".archive-list").scrollWidth - window.innerWidth),
    invalidateOnRefresh: true,
    onRefresh() {
      let totalWidth = getTotalWidth(),
        accumulatedWidth = 0,
        progressArray = Sections.map((el) => {
          accumulatedWidth += el.offsetWidth;
          return accumulatedWidth / totalWidth;
        });
      progressArray.unshift(0);
    },
    scrub: true,
    markers: false,
  },
});

const archives = [...document.querySelectorAll(".archive-item")];

let initialState;
archives.forEach((work) => {
  const tl = gsap.timeline({ paused: true });
  tl.to(work.querySelector(".works-play"), {
    opacity: 1,
  });
  work.addEventListener("mouseenter", () => {
    tl.play();
  });
  work.addEventListener("mouseleave", () => {
    tl.reverse();
  });
  let videoWrapper = work.querySelector(".archive-content");
  let container = document.querySelector(".archive-media-content");
  work.addEventListener("click", () => {
    videoWrapper.querySelector("video").load();
    videoWrapper.querySelector("video").play();
    initialState = Flip.getState(videoWrapper);
    container.appendChild(videoWrapper);
    gsap.to(".archive-media-main-wrapper", { zIndex: 3 });
    gsap.to(".section-mask", { display: "block", opacity: 1, duration: 1.2 });
    gsap.to(".works-play", { display: "none" });
    // Perform the flip animation
    Flip.from(initialState, {
      duration: 1,
      ease: "power3.inOut",
      absolute: true,
    });

    gsap.to(".archive-close", { opacity: 1, duration: 0.75, delay: 1 });
    gsap.to(videoWrapper.querySelector("img"), {
      opacity: 0,
      display: "none",
    });
  });

  document.querySelector(".archive-close").addEventListener("click", () => {
    gsap.to(".archive-close", { opacity: 0, duration: 0.75 });
    gsap.to(".section-mask", { opacity: 0, duration: 1 });
    initialState = Flip.getState(videoWrapper);
    work.appendChild(videoWrapper);
    Flip.from(initialState, {
      duration: 1,
      ease: "power3.inOut",
      absolute: true,
    });
    gsap.to(".section-mask", { display: "none" });
    gsap.to(".works-play", { display: "block" });
    gsap.to(".archive-media-main-wrapper", { zIndex: 1, delay: 1 });
    gsap.to(videoWrapper.querySelector("img"), {
      opacity: 1,
      display: "block",
    });
    videoWrapper.querySelector("video").pause();
    videoWrapper.querySelector("video").currentTime = 0;
  });
});
