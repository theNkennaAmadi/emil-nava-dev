window.addEventListener("DOMContentLoaded", () => {
  let tlWorks = gsap.timeline();
  tlWorks.fromTo(
    ".works-item",
    {
      clipPath: "polygon(50% 0%, 50% 100%, 50% 100%, 50% 0%);",
      duration: 1,
      ease: "expo.inOut",
    },
    {
      clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)",
      duration: 1,
      ease: "expo.inOut",
    }
  );
  tlWorks.fromTo(
    ".works-link",
    { opacity: 0 },
    { opacity: 1, duration: 0.4, ease: "expo.inOut" },
    ">0.25"
  );

  const works = document.querySelectorAll(".works-link");
  works.forEach((work) => {
    let tl = gsap.timeline({ paused: true });
    tl.to(work.querySelector(".vid-embed"), { display: "block" });
    work.addEventListener("mouseenter", () => {
      tl.play();
      if (work.querySelector("video")) {
        work.querySelector("video").play();
      }
    });
    work.addEventListener("mouseleave", () => {
      tl.reverse();
      if (work.querySelector("video")) {
        work.querySelector("video").pause();
        work.querySelector("video").currentTime = 0;
      }
    });
  });
});
