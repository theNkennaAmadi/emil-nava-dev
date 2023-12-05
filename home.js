window.addEventListener("DOMContentLoaded", () => {
  const words = [...document.querySelectorAll(".word")];

  words.map((word) => {
    // create wrapper container
    var wrapper = document.createElement("span");
    wrapper.classList.add("char-wrap");
    // insert wrapper before el in the DOM tree
    word.parentNode.insertBefore(wrapper, word);
    // move el into wrapper
    wrapper.appendChild(word);
  });

  /**
   * Initial states
   */
  const bText = document.querySelector(".home-hero-name-wrapper");
  gsap.set(bText.querySelectorAll(".word"), { y: "120%" });

  gsap.set(".dir-img", {
    clipPath: "polygon(0% 100%, 0% 100%, 100% 100%, 100% 100%)",
  });
  gsap.set(".dir-img img", {
    scale: 1.1,
    opacity: 0,
  });

  /**
   * Home intro animation
   */

  let tlHomeIntro = gsap.timeline({
    scrollTrigger: {
      trigger: ".section.hero",
      scrub: true,
      start: () => "top top",
      end: () => "+=100%",
      markers: false,
    },
    onComplete: () => {
      //initTlScrub();
      //ScrollTrigger.refresh();
    },
  });
  tlHomeIntro.to(".home-hero-visuals-wrapper", { opacity: 0 });
  tlHomeIntro.to(
    document
      .querySelector(".home-category-wrapper.left")
      .querySelectorAll(".word"),
    { y: "120%" }
  );
  tlHomeIntro.to(
    document
      .querySelector(".home-category-wrapper.right")
      .querySelectorAll(".word"),
    { y: "120%" },
    "<"
  );
  tlHomeIntro.to(".home-category-wrapper", { display: "none" });
  tlHomeIntro.to(bText.querySelectorAll(".word"), { y: "0%" });
  tlHomeIntro.to(
    ".dir-img",
    {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
    },
    "<"
  );
  tlHomeIntro.to(
    ".dir-img img",
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "expo.inOut",
      //stagger: 0.5
    },
    ">"
  );

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

  /**
   * Hero name animation
   */

  const name1 = document.querySelector("[hero-text-1]");
  const name2 = document.querySelector("[hero-text-2]");
  const name1Container = document.querySelector(".hero-name1-container");
  const name2Container = document.querySelector(".hero-name2-container");
  const initialState = Flip.getState([name1, name2]);
  name1Container.appendChild(name1);
  name2Container.appendChild(name2);
  // Perform the flip animation
  Flip.from(initialState, {
    duration: 1, // Duration of the animation
    ease: "power1.inOut", // Easing function
    // Any other GSAP properties you want
    scrollTrigger: {
      trigger: ".section.hero",
      pin: true,
      scrub: true,
      start: () => "top top",
      end: () => "+=100%",
      markers: false,
      onUpdate: (self) => {
        gsap.to(".views-container", {
          y: `${107 - self.progress * 100}%`,
        });
        if (self.progress < 0.05) {
          odometer.update(startValue);
        }
        if (self.progress > 0.5) {
          odometer.update(endValue);
        }
      },
    },
  });

  gsap.from(".expertise-line-inner", {
    height: "0%",
    ease: "expo.inOut",
    scrollTrigger: {
      trigger: ".expertise-line",
      start: "top bottom",
      end: "top center",
      scrub: true,
      //toggleActions: "play resume resume reset"
      //markers: true
    },
  });

  const videosList = document.querySelector(
    ".home-visuals-preview-list-wrapper"
  );
  const finalContainer = document.querySelector(".home-hero-visual-bg");
  const initialContainer = document.querySelector(
    ".home-hero-visuals-container"
  );

  const moveVideo = (element) => {
    const state = Flip.getState(videosList);
    element.appendChild(videosList);
    Flip.from(state, {
      duration: 1.5,
      ease: "expo.inOut",
    });
  };

  const categoryWrappers = document.querySelectorAll(".home-category-wrapper");
  categoryWrappers.forEach((category) => {
    let tl = gsap.timeline({ paused: true });
    tl.fromTo(
      category.querySelector(".home-category-preview-list-wrapper"),
      { display: "none", height: 0 },
      {
        display: "block",
        height: "100%",
        duration: 1,
        ease: "expo.inOut",
        //delay: 0.5
      }
    );
    tl.to(".page-wrapper", { color: "white" });
    category.addEventListener("mouseenter", () => {
      moveVideo(finalContainer);
      tl.play();
    });
    category.addEventListener("mouseleave", () => {
      moveVideo(initialContainer);
      tl.reverse();
    });
  });

  let categoryVideosList = [
    ...document.querySelectorAll(".home-category-preview-item"),
  ];
  let visualsPreview = [
    ...document.querySelectorAll(".home-visuals-preview-item"),
  ];
  categoryVideosList.forEach((category) => {
    let visual;
    let otherVisuals;
    let otherList;
    category.addEventListener("mouseenter", () => {
      const videoName = category.getAttribute("data-video");
      visual = visualsPreview.find(
        (visual) => visual.getAttribute("data-video") === videoName
      );
      otherVisuals = visualsPreview.filter(
        (visual) => visual.getAttribute("data-video") !== videoName
      );
      otherList = categoryVideosList.filter((item) => item !== category);

      let tl = gsap.timeline();
      tl.to(otherList, { opacity: 0.5 });
      tl.to(category, { opacity: 1 }, "<");
      tl.to(otherVisuals, { opacity: 0 }, "<");
      tl.to(visual, { opacity: 1 });
      if (visual.querySelector("video")) {
        visual.querySelector("video").play();
      }
    });
    category.addEventListener("mouseleave", () => {
      if (visual.querySelector("video")) {
        visual.querySelector("video").pause();
        visual.querySelector("video").currentTime = 0;
      }
      gsap.to(otherList, { opacity: 1 });
    });
  });

  /**
   * Text fade up animation
   */

  const dataText = [...document.querySelectorAll("[data-text-effect]")];
  dataText.forEach((text) => {
    gsap.fromTo(text.querySelectorAll(".word"), { y: "120%" }, { y: "0%" });
  });

  if (dataText.length !== 0) {
    dataText.forEach((title) => {
      const chars = title.querySelectorAll(".word");

      gsap.fromTo(
        chars,
        {
          "will-change": "transform",
          transformOrigin: "0% 50%",
          yPercent: 120,
        },
        {
          duration: 2,
          ease: "expo",
          yPercent: 0,
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            end: "top center",
            scrub: true,
            //toggleActions: "play resume resume reset"
            //markers: true
          },
        }
      );
    });
  }

  /**
   * Brands hover animation
   */

  const brandsBlock = document.querySelectorAll(".home-brands-block");
  brandsBlock.forEach((block) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(block.querySelector(".link-line"), { x: "110%", opacity: 0 });
    tl.to(block.querySelector(".link-line"), { x: "-110%", duration: 0 });
    tl.to(block.querySelector(".link-line"), {
      x: "0%",
      width: "100%",
      opacity: 1,
    });

    block.addEventListener("mouseenter", () => {
      tl.restart();
    });
    block.addEventListener("mouseleave", () => {
      // tl.reverse();
    });
  });

  /**
   * Link button animation
   */
  const linkBtn = document.querySelectorAll(".link-btn");
  linkBtn.forEach((block) => {
    const tl = gsap.timeline({ paused: true });
    tl.to(block.querySelector(".link-btn-inner"), {
      scaleX: 0.8,
      scaleY: 0.7,
      backgroundColor: "white",
      color: "black",
    });
    block.addEventListener("mouseenter", () => {
      tl.play();
    });
    block.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });

  /**
   * Home works animation
   */

  const homeWorks = [...document.querySelectorAll(".home-projects-item")];
  homeWorks.forEach((work) => {
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
  });

  /**
   * Home about parallax animation
   */

  gsap.to(".section-bg-img", {
    y: "-10%",
    ease: "none",
    scrollTrigger: {
      trigger: ".section.home-about",
      start: "top center",
      end: "bottom bottom",
      scrub: 1,
    },
  });
});
