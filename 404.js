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
