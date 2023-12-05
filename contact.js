const messages = [...document.querySelectorAll(".contact-text")];
let i = 0;
let lastTime = 0;

function animate(timestamp) {
  if (!lastTime) lastTime = timestamp;

  const elapsed = timestamp - lastTime;

  if (elapsed >= 3000) {
    //console.log(i);
    if (i > 0) {
      gsap.fromTo(
        messages[i - 1],
        { y: "0%" },
        { y: "-110%", visibility: "none", duration: 0.5 }
      );
    }
    gsap.fromTo(
      messages[i],
      { y: "110%" },
      { y: "0%", visibility: "visible", duration: 0.5 }
    );
    i++;
    if (i === messages.length) {
      i = 0;
      gsap.to(messages[messages.length - 1], {
        y: "-110%",
        visibility: "none",
        duration: 0.5,
        delay: 3,
      });
    }

    lastTime = timestamp;
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

const contactLink = document.querySelectorAll(".contact-link");

contactLink.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    gsap.fromTo(
      link.querySelector(".c-line"),
      {
        marginLeft: "0%",
      },
      {
        width: "100%",
        duration: 1,
        ease: "expo.inOut",
      }
    );
  });

  link.addEventListener("mouseleave", () => {
    gsap.fromTo(
      link.querySelector(".c-line"),
      {
        marginLeft: "auto",
      },
      {
        width: "0%",
        duration: 1,
        ease: "expo.inOut",
      }
    );
  });
});
