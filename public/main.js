let testimonials = [
  {
    videoUrl: "/video/1.mp4",
    poster: "/video/1.png",
  },
  {
    videoUrl: "/video/2.mp4",
    poster: "/video/2.png",
  },
  {
    videoUrl: "/video/3.mp4",
    poster: "/video/3.png",
  },
];

let SLIDES_PER_PAGE_TESTIMONIAL = 2;
const screenWidth2 = window.screen.width;
if (screenWidth2 <= 1320) {
  SLIDES_PER_PAGE_TESTIMONIAL = 2;
}
if (screenWidth2 <= 1000) {
  SLIDES_PER_PAGE_TESTIMONIAL = 2;
}
if (screenWidth2 <= 800) {
  SLIDES_PER_PAGE_TESTIMONIAL = 1;
}
if (screenWidth2 <= 700) {
  SLIDES_PER_PAGE_TESTIMONIAL = 1;
  testimonials = [
    {
      videoUrl: "/video-mobile/1.mp4",
      poster: "/video-mobile/1.png",
    },
    {
      videoUrl: "/video-mobile/2.mp4",
      poster: "/video-mobile/2.png",
    },
    {
      videoUrl: "/video-mobile/3.mp4",
      poster: "/video-mobile/3.png",
    },
  ];
}

let currentSlideIndexTestimonial = 0;
let isAnimatingTestimonial = false;

function initTestimonialSlider() {
  const slidesContainer = document.querySelector(".testimonial-slides");
  const buttonPrev = document.querySelector(".controls-testimonial-prev");
  const buttonNext = document.querySelector(".controls-testimonial-next");
  const indicators = document.querySelector(".indicators-testimonial");

  function createTestimonialBlock(testimonial) {
    return `
      <div class="testimonial-block">
        <video src="${testimonial.videoUrl}" poster="${testimonial.poster}" controls></video>
      </div>
    `;
  }

  function updateSlides() {
    if (isAnimatingTestimonial) return;
    isAnimatingTestimonial = true;

    const totalSlides = Math.ceil(
      testimonials.length / SLIDES_PER_PAGE_TESTIMONIAL
    );

    const currentSlide = slidesContainer.querySelector(
      ".testimonial-slide.active"
    );
    const newSlide = document.createElement("div");
    newSlide.className = "testimonial-slide";

    const startIdx = currentSlideIndexTestimonial * SLIDES_PER_PAGE_TESTIMONIAL;
    const endIdx = Math.min(
      startIdx + SLIDES_PER_PAGE_TESTIMONIAL,
      testimonials.length
    );
    const slideContent = testimonials
      .slice(startIdx, endIdx)
      .map((testimonial) => createTestimonialBlock(testimonial))
      .join("");

    newSlide.innerHTML = slideContent;

    if (currentSlide) {
      slidesContainer.appendChild(newSlide);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newSlide.classList.add("active");
          currentSlide.classList.remove("active");
          setTimeout(() => {
            currentSlide.remove();
            isAnimatingTestimonial = false;
          }, 500);
        });
      });
    } else {
      slidesContainer.appendChild(newSlide);
      requestAnimationFrame(() => {
        newSlide.classList.add("active");
        isAnimatingTestimonial = false;
      });
    }

    updatePagination(totalSlides);
  }

  function updatePagination(totalSlides) {
    indicators.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.className = `indicator-testimonial${
        i === currentSlideIndexTestimonial ? " active" : ""
      }`;
      dot.dataset.testimonial = i;
      indicators.appendChild(dot);
    }
  }

  function nextSlide() {
    const totalSlides = Math.ceil(
      testimonials.length / SLIDES_PER_PAGE_TESTIMONIAL
    );
    if (
      currentSlideIndexTestimonial < totalSlides - 1 &&
      !isAnimatingTestimonial
    ) {
      currentSlideIndexTestimonial++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlideIndexTestimonial > 0 && !isAnimatingTestimonial) {
      currentSlideIndexTestimonial--;
      updateSlides();
    }
  }

  // Touch events for swipe functionality
  let startX, endX;

  function handleTouchStart(event) {
    if (!isAnimatingTestimonial) {
      startX = event.touches[0].clientX;
    }
  }

  function handleTouchMove(event) {
    if (!isAnimatingTestimonial) {
      endX = event.touches[0].clientX;
    }
  }

  function handleTouchEnd() {
    if (!endX || isAnimatingTestimonial) return;

    const deltaX = endX - startX;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        nextSlide(); // Свайп влево - следующий слайд
      } else {
        prevSlide(); // Свайп вправо - предыдущий слайд
      }
    }

    // Сбрасываем значения
    startX = null;
    endX = null;
  }

  // Стандартные обработчики кликов
  buttonNext.addEventListener("click", nextSlide);
  buttonPrev.addEventListener("click", prevSlide);
  indicators.addEventListener("click", (event) => {
    const clickedIndicator = event.target;
    if (
      clickedIndicator.classList.contains("indicator-testimonial") &&
      !isAnimatingTestimonial
    ) {
      const newIndex = parseInt(clickedIndicator.dataset.testimonial, 10);
      if (newIndex !== currentSlideIndexTestimonial) {
        currentSlideIndexTestimonial = newIndex;
        updateSlides();
      }
    }
  });

  // Добавляем обработчики для свайпа
  slidesContainer.addEventListener("touchstart", handleTouchStart);
  slidesContainer.addEventListener("touchmove", handleTouchMove);
  slidesContainer.addEventListener("touchend", handleTouchEnd);

  updateSlides();
}

document.addEventListener("DOMContentLoaded", initTestimonialSlider);

// Tabs

const tabsTitleButtons = document.querySelectorAll(".tabs-title");
const contentBlocks = document.querySelectorAll(".tabs-content-block");
const tabsTitleImg = document.querySelectorAll(".tabs-title-img");

tabsTitleButtons.forEach((el) => {
  el.addEventListener("click", () => {
    const img = el.querySelector("img");
    const blockId = el.dataset.content;
    const currentBlock = document.getElementById(blockId);
    img.src = `/icons/black/${blockId}.svg`;
    tabsTitleButtons.forEach((el) => el.classList.remove("active"));
    contentBlocks.forEach((el) => el.classList.remove("active"));
    tabsTitleImg.forEach((el) => {
      const name = el.dataset.content;
      el.src = `/icons/black/${name}.svg`;
    });

    el.classList.add("active");

    if (el.classList.contains("active")) {
      img.src = `/icons/white/${blockId}.svg`;
    }

    currentBlock.classList.add("active");
  });
});

const AccordeonTopButton = document.querySelectorAll(
  ".accordeon-item-top-button"
);

AccordeonTopButton.forEach((el) => {
  el.addEventListener("click", () => {
    const content = el.nextElementSibling;
    const img = el.lastElementChild;
    img.classList.toggle("active");

    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.style.paddingTop = "0px";
    } else {
      content.style.paddingTop = "10px";
      content.style.maxHeight = content.scrollHeight + 10 + "px";
    }
  });
});

const burger = document.querySelector(".custom-burger");
const header = document.querySelector(".header");
const menu = document.querySelector(".header-mobile-content");
const logo = document.getElementById("header-logo");

burger.addEventListener("click", function () {
  burger.classList.toggle("active");
  header.classList.toggle("mobile-active");
  menu.classList.toggle("active");
  // logo.classList.toggle("active");

  document.body.style.overflow = menu.classList.contains("active")
    ? "hidden"
    : "";
});

// POPUP
const openPopUp = document.querySelectorAll(".open_pop_up");
const closePopUp = document.getElementById("close_pop_up");
const popUp = document.getElementById("pop_up");
const popUpEnd = document.getElementById("pop_up_end");

openPopUp.forEach(function (item) {
  item.addEventListener("click", () => {
    popUp.classList.add("active");
  });
});

closePopUp.addEventListener("click", () => {
  popUp.classList.remove("active");
});

const SubmitLetter = document.getElementById("Submit_letter");

function submit() {
  popUp.classList.remove("active");
  popUpEnd.classList.add("active");
}
