document.querySelectorAll('.expert_btn').forEach(el => {
  el.addEventListener('click', (e) => {
    const items = document.querySelectorAll('.expert__wrap__list li');

    items.forEach(item => {
      if (item.style.display === 'none' || item.style.display === '') {
        item.style.display = 'flex'; // Показываем скрытый элемент
      } else {
        item.style.display = 'none'; // Скрываем текущий элемент
      }
    });
  });
});
