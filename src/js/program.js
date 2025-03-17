class ProgramNavigation {
  constructor() {
    this.nav = document.querySelector('.program__nav');
    this.text = this.nav.querySelector('.slesh');
    this.subMenu = document.querySelector('.program__submenu');
    this.sliderIndicator = this.nav.querySelector('.slider-indicator');
    this.subMenuButton = this.subMenu.querySelector('.program__submenu-button');
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.text.textContent = ' ';
      this.text.addEventListener('click', this.toggleSubMenu.bind(this));
    });
  }

  toggleSubMenu() {
    this.subMenu.classList.toggle('none');
    this.sliderIndicator.classList.toggle('toogle');
    this.subMenuButton.addEventListener('click', this.closeSubMenu.bind(this));
  }

  closeSubMenu() {
    this.subMenu.classList.add('none');
    this.sliderIndicator.classList.remove('toogle');
  }
}

const programNav = new ProgramNavigation();
