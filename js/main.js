const swiper = new Swiper(".pricing-slider", {
  loop: true,
  spaceBetween: 24,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    prevEl: ".pricing-prev",
    nextEl: ".pricing-next",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

let dvdAnimation;

function createDvdVideo() {
  const dvd = document.createElement("video");

  dvd.src = "../assets/roll2.mp4";
  dvd.autoplay = true;
  dvd.loop = true;
  dvd.muted = true;
  dvd.classList.add("roll-dvd");

  document.body.append(dvd);

  let x = 100;
  let y = 100;

  let dx = 3;
  let dy = 2.5;

  function animate() {
    const w = dvd.offsetWidth;
    const h = dvd.offsetHeight;

    x += dx;
    y += dy;

    if (x <= 0 || x + w >= window.innerWidth) {
      dx *= -1;
    }

    if (y <= 0 || y + h >= window.innerHeight) {
      dy *= -1;
    }

    dvd.style.transform = `translate(${x}px, ${y}px)`;

    dvdAnimation = requestAnimationFrame(animate);
  }

  dvd.addEventListener("loadedmetadata", () => {
    animate();
  });

  return dvd;
}

const createRoll = () => {
  const videoContainer = document.createElement("div");
  const video = document.createElement("video");
  const closeBtn = document.createElement("button");

  let dvdVideo = null;
  let dvdTimeout = null;
  let closeTimeout = null;

  videoContainer.classList.add("roll-container");

  video.src = "../assets/roll.mp4";
  video.autoplay = true;
  video.loop = true;
  video.controls = false;
  // video.muted = true;
  video.volume = 1;
  video.classList.add("roll-player");

  closeBtn.classList.add("roll-close");
  closeBtn.textContent = "✕";

  videoContainer.append(video, closeBtn);
  document.body.append(videoContainer);

  video.addEventListener(
    "playing",
    () => {
      dvdTimeout = setTimeout(() => {
        dvdVideo = createDvdVideo();
      }, 3000);

      closeTimeout = setTimeout(() => {
        closeBtn.classList.add("show");
      }, 10000);
    },
    { once: true },
  );

  video.addEventListener("error", () => {
    closeBtn.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    clearTimeout(dvdTimeout);
    clearTimeout(closeTimeout);

    cancelAnimationFrame(dvdAnimation);

    video.pause();

    if (dvdVideo) {
      dvdVideo.pause();
      dvdVideo.remove();
    }

    // Удаляем модальное окно
    videoContainer.remove();
  });
};

let clickCount = 0;
let lastClickTime = 0;
const maxDelay = 400;

document.querySelector(".footer-logo").addEventListener("click", function (event) {
  event.preventDefault();

  const logo = document.querySelector(".footer-logo");

  logo.classList.remove("click-animation");

  void logo.offsetWidth;

  logo.classList.add("click-animation");

  const currentTime = new Date().getTime();

  if (currentTime - lastClickTime > maxDelay) {
    clickCount = 1;
  } else {
    clickCount++;
  }

  lastClickTime = currentTime;

  if (clickCount === 5) {
    createRoll();
    clickCount = 0;
  }
});
