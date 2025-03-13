document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.program__nav');
  const text = nav.querySelector('.slesh');
  text.textContent = ' ';

  text.addEventListener('click', () => {
    const subMenu = document.querySelector('.program__submenu');

    subMenu.classList.toggle('none');
    nav.querySelector('.slider-indicator').classList.toggle('toogle');

    subMenu
      .querySelector('.program__submenu-button')
      .addEventListener('click', () => {
        subMenu.classList.add('none');
        nav.querySelector('.slider-indicator').classList.remove('toogle');
      });
  });
});
