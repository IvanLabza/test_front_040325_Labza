class SlideNavigation {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    const option = e.target.closest('li');
    if (!option) return;

    const list = option.closest('.slide__option');
    if (!list) return;

    this.removeActiveClass(list);

    option.classList.add('active');

    const slide = option.closest('.slide');
    if (!slide) return;

    this.updateSlideTitle(slide, option);
  }

  removeActiveClass(list) {
    list.querySelectorAll('li').forEach(el => el.classList.remove('active'));
  }

  updateSlideTitle(slide, option) {
    const title = slide.querySelector('.slider__wrap-title');
    if (title) {
      title.textContent = option.textContent;
    }
  }
}

const slideNav = new SlideNavigation();
