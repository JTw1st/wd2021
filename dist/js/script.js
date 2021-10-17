const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu_close'),
      counters = document.querySelectorAll('.percent'),
      lines = document.querySelectorAll('.scales_divider-color');
      
      hamburger.addEventListener('click', () => {
          menu.classList.add('active');
        });
        
        closeElem.addEventListener('click', () => {
            menu.classList.remove('active');
        });
        
        counters.forEach( (item, i ) => {
            lines[i].style.width = item.innerHTML;
        });