const initScripts = () => {
  const body = document.querySelector('body');

  const cursorFunctional = () => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.addEventListener('mousemove', function(e) {
      cursor.style.transform = `translate(${e.clientX - 7}px, ${e.clientY - 7}px)`;
    });

    body.prepend(cursor);
  }

  const mainMenu = () => {
    const menu = document.querySelector('.js-main-menu');
    const menuButton = menu.querySelector('.menu-button');

    menuButton.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        body.classList.remove('menu-open');
        body.classList.remove('blocked');
      } else {
        menu.classList.add('active');
        body.classList.add('menu-open');
        body.classList.add('blocked');
      }
    });
  }

  const headerForm = () => {
    const form = document.querySelector('.js-brief');
    const buttons = document.querySelectorAll('.js-header-form-button');
    const closeButtons = document.querySelectorAll('.js-close-brief');

    const closeForm = () => {
      form.classList.remove('active');
      body.classList.remove('blocked');
    }

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (form.classList.contains('active')) {
          closeForm();
        } else {
          form.classList.add('active');
          body.classList.add('blocked');
        }
      });
    })

    closeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeForm();
      })
    })
  }

  const archiveItems = () => {
    const block = document.querySelector('.archive__content');
    const buttons = block.querySelectorAll('.archive-switcher');
    const images = block.querySelectorAll('.archive-image');

    const deactivateItems = (items) => {
      items.forEach((item) => {
        item.classList.remove('active');
      })
    }

    buttons.forEach((button, i) => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        deactivateItems(buttons);
        deactivateItems(images);
        images[i].classList.add('active');
        button.classList.add('active');
      });
    });
  }

  const scrollTop = () => {
    const button = document.querySelector('.js-go-top');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    });
  }


  cursorFunctional();
  mainMenu();
  headerForm();
  archiveItems();
  scrollTop();
}

class Accordions {
  constructor(container) {
    this.container = container;
    this.active = undefined;
    this.accordions = container.querySelectorAll('.accordion:not(.activated)');

    this.accordions.forEach((accordion) => {
      accordion.querySelector('.accordion__header').addEventListener('click', () => {
        if (this.active === accordion) {
          this.clearActive(this.active);
          return this.active = undefined;
        }

        if (this.active) {
          this.clearActive(this.active);
        }

        this.makeActive(accordion);
        this.active = accordion;
      });
    });
  }

  makeActive(acc) {
    acc.classList.add('active');

    const contentHeight = acc.querySelector('.accordion__inner').clientHeight;
    acc.querySelector('.accordion__info').style.height = `${contentHeight}px`;
  }

  clearActive(acc) {
    acc.classList.remove('active');
    acc.querySelector('.accordion__info').style.height = `0px`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initScripts();

  const accordionsContainers = document.querySelectorAll('.js-accordions');
  accordionsContainers.forEach((item) => {
    new Accordions(item);
  });

  $('.js-blog-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    variableWidth: true
  });

  if (window.innerWidth <= 992) {
    setTimeout(() => {
      const theLine = new marquee( document.getElementById( 'marquee' ), {
        delayBeforeStart: 0,
        speed: 70,
        duplicated: true,
      });
    }, 10);
  }
});