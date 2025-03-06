document.addEventListener('click', e => {
  const option = e.target.closest('li'); 
  if (!option || !option.parentElement.classList.contains('slide__option'))
    return; 

  const list = option.parentElement; 

  list.querySelectorAll('li').forEach(el => el.classList.remove('active')); 

  option.classList.add('active'); 

  const slide = option.closest('.slide'); 
  const title = slide.querySelector('.speaker__wrap-title');
  title.textContent = option.textContent; 
});
