let allSections = [
  ...document.querySelector("#main-list").querySelectorAll(".works-media"),
];

let mediaList = [...document.querySelectorAll(".work-media-list-wrapper")];

/*
let allVideos = [...document.querySelectorAll("video")];
allVideos.forEach((video) => {
  video.load();
});
*/

allSections.map((section) => {
  let video = section
    .querySelector(".embed")
    .classList.contains("w-condition-invisible");
  let image = section
    .querySelector("img")
    .classList.contains("w-condition-invisible");
  if (video && image) {
    section.remove();
  }
});

const hiddenElem = [...document.querySelectorAll(".w-condition-invisible")];
hiddenElem.map((elem) => {
  elem.remove();
});

mediaList.forEach((list) => {
  if (list.childElementCount === 0) {
    list.remove();
  }
});

const mainVideoWrapper = document.querySelector(".work-hero");
const mainVideo = mainVideoWrapper.querySelector("video");

if (mainVideo) {
  mainVideo.addEventListener("timeupdate", () => {
    let minutes = Math.floor(mainVideo.currentTime / 60, 10);
    let seconds = Math.floor(mainVideo.currentTime % 60);
    let vTimeText = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    document.querySelector("#duration").textContent = vTimeText;

    //let vWidth = document.querySelector(".work-duration-wrapper").clientWidth;
    let vPos = (mainVideo.currentTime / mainVideo.duration) * 100;

    gsap.to(".work-duration-bar", { width: `${vPos}%` });
  });

  const toggleAudio = () => {
    if (mainVideo.muted) {
      mainVideo.muted = false;
      gsap.to(".sound-off", { y: "110%" });
      gsap.to(".sound-on", { y: "0%" });
    } else {
      mainVideo.muted = true;
      gsap.to(".sound-on", { y: "-110%" });
      gsap.to(".sound-off", { y: "0%" });
    }
  };

  document
    .querySelector(".works-sound-wrapper")
    .addEventListener("click", () => {
      toggleAudio();
    });
}

const tlRelated = gsap.timeline({ paused: true });
tlRelated.to(
  document.querySelector(".related-text").querySelector(".next-arrow-embed-1"),
  {
    x: "100%",
    y: "-100%",
    ease: "expo.inOut",
  }
);
tlRelated.to(
  document.querySelector(".related-text").querySelector(".next-arrow-embed-2"),
  { x: "0%", y: "0%", ease: "expo.inOut" },
  "<0.1"
);

document.querySelector(".related-text").addEventListener("mouseenter", () => {
  tlRelated.play();
});

document.querySelector(".related-text").addEventListener("mouseleave", () => {
  tlRelated.reverse();
});
