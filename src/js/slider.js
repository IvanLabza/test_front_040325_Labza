let autoplay = false;
const time = 5000;

if (window.innerWidth >= 765) {
  autoplay = true;
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.slider').forEach(slider => {
    const sliderUl = slider.querySelector('ul');
    const slides = sliderUl.querySelectorAll('.slide');
    const slideCount = slides.length;
    let slideWidth = slides[0].offsetWidth; // Изначальная ширина слайда
    let currentIndex = 1;
    let startX = 0;
    let endX = 0;
    let isSwipeAllowed = true;
    let interval;
    let isAnimating = false;

    // Создаём индикатор
    const indicator = document.createElement('div');
    indicator.classList.add('slider-indicator');
    indicator.innerHTML = `
      <span class="control_prev"></span>
      <span class="current">${currentIndex}</span> / 
      <span class="total">${slideCount}</span>
      <span class="control_next"></span>
    `;
    slider.appendChild(indicator);

    // Функция для обновления ширины слайдов
    function updateSlideWidth() {
      slideWidth = slides[0].offsetWidth;
      slider.style.width = slideWidth + 'px';
      sliderUl.style.width = slideCount * slideWidth + 'px';
      sliderUl.style.transform = `translateX(${-slideWidth}px)`;
    }

    // Слушаем изменение размеров окна
    window.addEventListener('resize', updateSlideWidth);

    // Изначальная настройка слайдов
    updateSlideWidth();

    sliderUl.insertBefore(
      sliderUl.lastElementChild,
      sliderUl.firstElementChild
    );

    function updateIndicator() {
      indicator.querySelector('.current').textContent = currentIndex;
    }

    function moveLeft() {
      if (isAnimating) return;
      isAnimating = true;
      sliderUl.style.transition = 'transform 0.3s ease-in-out';
      sliderUl.style.transform = `translateX(0px)`;

      setTimeout(() => {
        sliderUl.insertBefore(
          sliderUl.lastElementChild,
          sliderUl.firstElementChild
        );
        sliderUl.style.transition = 'none';
        sliderUl.style.transform = `translateX(${-slideWidth}px)`;

        currentIndex = currentIndex === 1 ? slideCount : currentIndex - 1;
        updateIndicator();
        isAnimating = false;
      }, 300);
    }

    function moveRight() {
      if (isAnimating) return;
      isAnimating = true;
      sliderUl.style.transition = 'transform 0.3s ease-in-out';
      sliderUl.style.transform = `translateX(${-2 * slideWidth}px)`;

      setTimeout(() => {
        sliderUl.appendChild(sliderUl.firstElementChild);
        sliderUl.style.transition = 'none';
        sliderUl.style.transform = `translateX(${-slideWidth}px)`;

        currentIndex = currentIndex === slideCount ? 1 : currentIndex + 1;
        updateIndicator();
        isAnimating = false;
      }, 300);
    }

    slider.querySelector('.control_prev').addEventListener('click', moveLeft);
    slider.querySelector('.control_next').addEventListener('click', moveRight);

    // Отключаем свайпы при нажатии на кнопки
    slider.addEventListener('touchstart', e => {
      if (e.target.closest('.slide__option')) {
        isSwipeAllowed = false; // Если свайп начался на кнопке, блокируем свайп
      } else {
        isSwipeAllowed = true;
        startX = e.touches[0].clientX;
      }
    });

    slider.addEventListener('touchmove', e => {
      if (!isSwipeAllowed) return;
      endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
      if (!isSwipeAllowed) return;
      let diff = startX - endX;
      if (Math.abs(diff) > 50) {
        // Фильтруем ложные срабатывания
        if (diff > 0) {
          moveRight(); // Свайп влево → следующий слайд
        } else {
          moveLeft(); // Свайп вправо → предыдущий слайд
        }
      }
    });

    if (autoplay) {
      interval = setInterval(moveRight, time);
      slider.addEventListener('mouseenter', () => clearInterval(interval));
      slider.addEventListener(
        'mouseleave',
        () => (interval = setInterval(moveRight, time))
      );
    }
  });
});

//class Slider OOP

// class Slider {
//   constructor(selector, options = {}) {
//     this.slider = document.querySelector(selector);
//     this.options = options;
//     this.autoplay = this.options.autoplay || false;
//     this.time = this.options.time || 8000;
//     this.slideWidth = 0;
//     this.currentIndex = 1;
//     this.isAnimating = false;
//     this.interval = null;
//     this.slides = null;
//     this.sliderUl = null;
//     this.indicator = null;
//     this.isSwipeAllowed = true;
//     this.startX = 0;
//     this.endX = 0;

//     this.init();
//   }

//   init() {
//     this.slider.addEventListener('DOMContentLoaded', () => {
//       this.setup();
//       this.updateSlideWidth();
//       this.addEventListeners();
//       if (this.autoplay) {
//         this.startAutoplay();
//       }
//     });

//     window.addEventListener('resize', this.updateSlideWidth.bind(this));
//   }

//   setup() {
//     this.sliderUl = this.slider.querySelector('ul');
//     this.slides = this.sliderUl.querySelectorAll('.slide');
//     const slideCount = this.slides.length;

//     // Create indicator
//     this.indicator = document.createElement('div');
//     this.indicator.classList.add('slider-indicator');
//     this.indicator.innerHTML = `
//       <span class="control_prev"> < </span>
//       <span class="current">${this.currentIndex}</span> /
//       <span class="total">${slideCount}</span>
//       <span class="control_next"> > </span>
//     `;
//     this.slider.appendChild(this.indicator);

//     this.slider.style.position = 'relative';
//     this.slider.style.overflow = 'hidden';
//     this.slider.style.margin = '0 auto';
//     this.slider.style.borderRadius = '4px';

//     this.sliderUl.style.width = `${slideCount * this.slideWidth}px`;
//     this.sliderUl.style.transition = 'transform 0.3s ease-in-out';
//     this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;

//     this.sliderUl.insertBefore(
//       this.sliderUl.lastElementChild,
//       this.sliderUl.firstElementChild
//     );
//   }

//   updateSlideWidth() {
//     const slide = this.slides[0];
//     this.slideWidth = slide.offsetWidth;
//     this.slider.style.width = `${this.slideWidth}px`;
//     this.sliderUl.style.width = `${this.slides.length * this.slideWidth}px`;
//     this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;
//   }

//   moveLeft() {
//     if (this.isAnimating) return;
//     this.isAnimating = true;
//     this.sliderUl.style.transition = 'transform 0.3s ease-in-out';
//     this.sliderUl.style.transform = `translateX(0px)`;

//     setTimeout(() => {
//       this.sliderUl.insertBefore(
//         this.sliderUl.lastElementChild,
//         this.sliderUl.firstElementChild
//       );
//       this.sliderUl.style.transition = 'none';
//       this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;

//       this.currentIndex =
//         this.currentIndex === 1 ? this.slides.length : this.currentIndex - 1;
//       this.updateIndicator();
//       this.isAnimating = false;
//     }, 300);
//   }

//   moveRight() {
//     if (this.isAnimating) return;
//     this.isAnimating = true;
//     this.sliderUl.style.transition = 'transform 0.3s ease-in-out';
//     this.sliderUl.style.transform = `translateX(${-2 * this.slideWidth}px)`;

//     setTimeout(() => {
//       this.sliderUl.appendChild(this.sliderUl.firstElementChild);
//       this.sliderUl.style.transition = 'none';
//       this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;

//       this.currentIndex =
//         this.currentIndex === this.slides.length ? 1 : this.currentIndex + 1;
//       this.updateIndicator();
//       this.isAnimating = false;
//     }, 300);
//   }

//   updateIndicator() {
//     this.indicator.querySelector('.current').textContent = this.currentIndex;
//   }

//   addEventListeners() {
//     const prevButton = this.slider.querySelector('.control_prev');
//     const nextButton = this.slider.querySelector('.control_next');

//     prevButton.addEventListener('click', () => this.moveLeft());
//     nextButton.addEventListener('click', () => this.moveRight());

//     this.slider.addEventListener('touchstart', e => {
//       if (e.target.closest('.slide__option')) {
//         this.isSwipeAllowed = false;
//       } else {
//         this.isSwipeAllowed = true;
//         this.startX = e.touches[0].clientX;
//       }
//     });

//     this.slider.addEventListener('touchmove', e => {
//       if (!this.isSwipeAllowed) return;
//       this.endX = e.touches[0].clientX;
//     });

//     this.slider.addEventListener('touchend', () => {
//       if (!this.isSwipeAllowed) return;
//       let diff = this.startX - this.endX;
//       if (Math.abs(diff) > 50) {
//         if (diff > 0) {
//           this.moveRight();
//         } else {
//           this.moveLeft();
//         }
//       }
//     });
//   }

//   startAutoplay() {
//     this.interval = setInterval(() => this.moveRight(), this.time);
//     this.slider.addEventListener('mouseenter', () =>
//       clearInterval(this.interval)
//     );
//     this.slider.addEventListener('mouseleave', () => this.startAutoplay());
//   }
// }
