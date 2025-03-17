class Slider {
  constructor({
    selector,
    autoplay = false,
    time = 5000,
    minDesktopWidth = 1000,
    stopSlider = false,
    statusBarOn = false,
  } = {}) {
    this.slider = document.querySelector(selector);
    this.sliderUl = this.slider.querySelector('ul');
    this.sliderNav = this.slider.querySelectorAll('.slider__nav');
    this.statusBar = this.slider.querySelectorAll('.slider__statusbar');
    this.slides = this.sliderUl.querySelectorAll('.slide');
    this.slideCount = this.slides.length;
    this.slideWidth = this.slides[0].offsetWidth;
    this.currentIndex = 1;
    this.statusBars = [];
    this.startX = 0;
    this.endX = 0;
    this.isSwipeAllowed = true;
    this.isAnimating = false;
    this.autoplay = autoplay;
    this.time = time;
    this.interval = null;
    this.minDesktopWidth = minDesktopWidth;
    this.stopSlider = stopSlider;
    this.statusBarOn = statusBarOn;

    if (!this.stopSlider || window.innerWidth < this.minDesktopWidth) {
      this.init();
    }
  }

  init() {
    if (this.statusBarOn) this.createStatusBar();
    this.createIndicator();
    this.updateSlideWidth();
    window.addEventListener('resize', () => this.handleResize());
    this.sliderUl.insertBefore(
      this.sliderUl.lastElementChild,
      this.sliderUl.firstElementChild
    );
    this.addEventListeners();
    if (this.autoplay) this.startAutoplay();
  }

  createIndicator() {
    this.indicator = document.createElement('div');
    this.indicator.classList.add('slider-indicator');
    this.indicator.innerHTML = `
      <div class="prev__wrapper">
        <span class="control_prev"></span>
        <span class="current">${this.currentIndex}</span>
      </div>
      <span class="slesh" id="slesh"> / </span>
      <div class="next__wrapper">
        <span class="total">${this.slideCount}</span>
        <span class="control_next"></span>
      </div>
    `;
    this.sliderNav.forEach(el => el.appendChild(this.indicator));
  }

  createStatusBar() {
    this.statusBarContainer = document.createElement('ul');
    this.statusBarContainer.classList.add('slider_bar');

    for (let i = 0; i < this.slideCount; i++) {
      const bar = document.createElement('li');
      bar.classList.add('bar');
      if (i === this.currentIndex - 1) bar.classList.add('bar-active');
      this.statusBarContainer.appendChild(bar);
      this.statusBars.push(bar);
    }

    this.statusBar.forEach(el => el.appendChild(this.statusBarContainer));
  }

  updateSlideWidth() {
    this.slideWidth = this.slides[0].offsetWidth;
    this.slider.style.width = `${this.slideWidth}px`;
    this.sliderUl.style.width = `${this.slideCount * this.slideWidth}px`;
    this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;
  }

  updateIndicator() {
    this.indicator.querySelector('.current').textContent = this.currentIndex;

    this.statusBars.forEach(bar => bar.classList.remove('bar-active'));

    if (this.statusBars[this.currentIndex - 1]) {
      this.statusBars[this.currentIndex - 1].classList.add('bar-active');
    }
  }

  moveLeft() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.sliderUl.style.transition = 'transform 0.3s ease-in-out';
    this.sliderUl.style.transform = `translateX(0px)`;

    setTimeout(() => {
      this.sliderUl.insertBefore(
        this.sliderUl.lastElementChild,
        this.sliderUl.firstElementChild
      );
      this.sliderUl.style.transition = 'none';
      this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;
      this.currentIndex =
        this.currentIndex === 1 ? this.slideCount : this.currentIndex - 1;
      this.updateIndicator();
      this.isAnimating = false;
    }, 300);
  }

  moveRight() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.sliderUl.style.transition = 'transform 0.3s ease-in-out';
    this.sliderUl.style.transform = `translateX(${-2 * this.slideWidth}px)`;

    setTimeout(() => {
      this.sliderUl.appendChild(this.sliderUl.firstElementChild);
      this.sliderUl.style.transition = 'none';
      this.sliderUl.style.transform = `translateX(${-this.slideWidth}px)`;
      this.currentIndex =
        this.currentIndex === this.slideCount ? 1 : this.currentIndex + 1;
      this.updateIndicator();
      this.isAnimating = false;
    }, 300);
  }

  addEventListeners() {
    this.slider
      .querySelector('.control_prev')
      .addEventListener('click', () => this.moveLeft());
    this.slider
      .querySelector('.control_next')
      .addEventListener('click', () => this.moveRight());

    this.slider.addEventListener('touchstart', e => {
      if (
        e.target.closest(
          '.slide__option, .slider-indicator, .program__submenu-button, .rate__list-button'
        )
      ) {
        this.isSwipeAllowed = false;
      } else {
        this.isSwipeAllowed = true;
        this.startX = e.touches[0].clientX;
      }
    });

    this.slider.addEventListener('touchmove', e => {
      if (!this.isSwipeAllowed) return;
      this.endX = e.touches[0].clientX;
    });

    this.slider.addEventListener('touchend', () => {
      if (!this.isSwipeAllowed) return;
      let diff = this.startX - this.endX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.moveRight() : this.moveLeft();
      }
    });
  }

  startAutoplay() {
    this.interval = setInterval(() => this.moveRight(), this.time);
    this.slider.addEventListener('mouseenter', () =>
      clearInterval(this.interval)
    );
    this.slider.addEventListener('mouseleave', () => this.startAutoplay());
  }

  handleResize() {
    this.updateSlideWidth();

    if (window.innerWidth >= this.minDesktopWidth) {
      if (!this.sliderUl.hasAttribute('data-initialized')) {
        this.init();
        this.sliderUl.setAttribute('data-initialized', 'true');
      }
    } else {
      this.sliderUl.removeAttribute('data-initialized');
      this.sliderUl.style.transition = 'none';
      this.sliderUl.style.transform = '';
    }
  }
}

// Вызов слайдера
new Slider({
  selector: '.slider',
  autoplay: true,
  time: 10000,
});

new Slider({
  selector: '.study__slider',
  autoplay: true,
  time: 10000,
});

new Slider({
  selector: '.students__wrapper',
  autoplay: true,
  time: 10000,
});

new Slider({
  selector: '.program__wrapper',
  autoplay: true,
  time: 10000,
});

new Slider({
  selector: '.rate__slider',
  autoplay: true,
  time: 10000,
  minDesktopWidth: 1150,
  stopSlider: true,
  statusBarOn: true,
});
