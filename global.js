window.addEventListener("DOMContentLoaded", () => {
  gsap.from(".page-wrapper", { autoAlpha: 0, duration: 0.1, ease: "linear" });

  //nav-hover
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    let tl = gsap.timeline({ paused: true });
    tl.to(link.querySelector(".nav-stroke"), { width: "100%" });
    link.addEventListener("mouseenter", () => {
      tl.play();
    });
    link.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });

  //nav-dropdown
  const tlNavWork = gsap.timeline({ paused: true });
  tlNavWork.to(".nav", { color: "white" });
  tlNavWork.fromTo(
    ".nav-dropdown",
    { clipPath: "polygon(0% 0%, 0% 0%, 100% 0%, 100% 0%);", display: "none" },
    {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      display: "block",
      duration: 0.75,
      ease: "expo.inOut",
    },
    "<"
  );
  tlNavWork.fromTo(
    "[nav-work-text]",
    { y: "110%" },
    { y: "0%", duration: 0.6, ease: "expo.out" },
    "<0.5"
  );
  document.querySelector("[nav-works]").addEventListener("mouseenter", () => {
    tlNavWork.play();
  });
  document.querySelector("[nav-works]").addEventListener("mouseleave", () => {
    tlNavWork.reverse();
  });

  //Nav dropdown hover
  const navWorkItem = [...document.querySelectorAll(".nav-work-item")];
  let otherList;
  navWorkItem.forEach((item) => {
    let tl = gsap.timeline();
    item.addEventListener("mouseenter", () => {
      otherList = navWorkItem.filter((itemM) => itemM !== item);
      tl.to(otherList, { opacity: 0.5, duration: 0.4, ease: "expo.inOut" });
      tl.to(item, { opacity: 1, duration: 0.4, ease: "expo.inOut" }, "<");
    });
    item.addEventListener("mouseleave", () => {
      otherList = navWorkItem.filter((itemM) => itemM !== item);
      gsap.to(otherList, { opacity: 1, duration: 0.4, ease: "expo.inOut" });
    });
  });

  //Footer Animations
  gsap.fromTo(
    ".footer-end-line",
    { width: "0%" },
    {
      width: "100%",
      duration: 0.6,
      scrollTrigger: {
        trigger: ".footer-end-block",
        start: "top bottom",
        delay: 0.2,
        //scrub: 0.9
      },
    }
  );

  const socialsBlock = document.querySelectorAll(".social-links-block");
  socialsBlock.forEach((block) => {
    let tl = gsap.timeline({ paused: true });
    tl.to(block.querySelector(".arrow-1"), {
      x: "100%",
      y: "-100%",
      ease: "expo.inOut",
    });
    tl.to(
      block.querySelector(".arrow-2"),
      { x: "0%", y: "0%", ease: "expo.inOut" },
      "<0.1"
    );
    block.addEventListener("mouseenter", () => {
      tl.play();
    });
    block.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  });
});
