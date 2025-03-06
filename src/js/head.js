const mobileMenu = document.querySelector('.menu-container');

const openBtn = document.querySelector('.btn-open');

const closeBtn = document.querySelector('.btn-close');

const body = document.querySelector('body');

openBtn.onclick = () => {
  mobileMenu.classList.add('active');
  openBtn.classList.add('none');
  closeBtn.classList.remove('none');
  body.classList.add('beckdrop');
};

closeBtn.onclick = () => {
  mobileMenu.classList.remove('active');
  closeBtn.classList.add('none');
  openBtn.classList.remove('none');
  body.classList.remove('beckdrop');
};
