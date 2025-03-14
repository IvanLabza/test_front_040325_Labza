let autoplay = false;
const time = 5000;

if (window.innerWidth >= 765) {
  autoplay = true;
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.slider').forEach(slider => {
    const sliderUl = slider.querySelector('ul');
    const sliderNav = slider.querySelectorAll('.slider__nav');
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
      <div class="prev__wrapper">
      <span class="control_prev"></span>
      <span class="current">${currentIndex}</span>
      </div>
      
      <span class="slesh" id="slesh"> / </span>
      
      <div class="next__wrapper">
      <span class="total">${slideCount}</span>
      <span class="control_next"></span>
      </div>
      
    `;
    sliderNav.forEach(el => {
      el.appendChild(indicator);
    });

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
      } else if (e.target.closest('.slider-indicator')) {
        isSwipeAllowed = false; // Если свайп начался на кнопке, блокируем свайп
      } else if (e.target.closest('.program__submenu-button')) {
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
