document.addEventListener('click', e => {
  const option = e.target.closest('li');
  if (!option) return;

  const list = option.closest('.slide__option');
  if (!list) return;

  // Убираем активный класс у всех элементов внутри этого списка
  list.querySelectorAll('li').forEach(el => el.classList.remove('active'));

  // Добавляем активный класс кликнутому элементу
  option.classList.add('active');

  // Находим соответствующий слайд
  const slide = option.closest('.slide');
  if (!slide) return;

  // Обновляем заголовок внутри конкретного слайда
  const title = slide.querySelector('.slider__wrap-title');
  if (title) {
    title.textContent = option.textContent;
  }
});
