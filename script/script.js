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

  // const scrollBarWidth = () => {
  //   return window.innerWidth - body.clientWidth;
  // }

  const mainMenu = () => {
    const menu = document.querySelector('.js-main-menu');
    const menuButton = menu.querySelector('.menu-button');
    // const scrollWidth = scrollBarWidth();

    menuButton.addEventListener('click', () => {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        body.classList.remove('menu-open');
        body.classList.remove('blocked');
        // body.style.paddingRight = `0px`;

      } else {
        menu.classList.add('active');
        body.classList.add('menu-open');
        body.classList.add('blocked');
        // body.style.paddingRight = `${scrollWidth}px`;
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

    if (!block) return;
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


  // function isMobileUserAgent() {
  //   return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
  // }
  //
  // const scrollContainer = document.querySelector('.scroll-container');
  // SimpleScrollbar.initEl(scrollContainer);
  //
  // if (isMobileUserAgent()) {
  //   body.classList.add('mobile')
  // }




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

class Cases {
  constructor(container) {
    this.container = container;
    this.outer = this.container.querySelector('.cases__content');
    this.inner = this.container.querySelector('.cases__content-inner');
    this.cases = this.container.querySelectorAll('.case-item');
    this.totalHeight = 220;
    this.artificalBlocks = [];
    this.normalize = 3;

    this.cases.forEach((i) => {
      this.totalHeight += i.clientHeight;
    });

    this.outer.style.height = `${this.totalHeight * this.normalize}px`;
    this.inner.style.height = `${this.totalHeight * this.normalize}px`;

    const countPrevHeight = (length) => {
      if (length < 0) {
        return 0;
      }

      let height = 0;

      for (let i = 0; i <= length; i++) {
        height += this.artificalBlocks[i].height;
      }

      return height;
    }

    const getArtificalBlocksPosition = (number) => {
      let top = 0;
      let bottom = 0;

      if (number === 0) {
        return { top: 0, bottom: this.cases[number].clientHeight }
      }

      for (let i = 0; i < number; i++) {
        top += this.cases[i].clientHeight;
        bottom = top + this.cases[number].clientHeight
      }

      return { top: top, bottom: bottom }
    }

    for (let i = 0; i < this.cases.length; i++) {
      let block = {
        number: i,
        height: this.cases[i].clientHeight,
        position: getArtificalBlocksPosition(i)
      }

      this.cases[i].style.maxHeight = `${this.cases[i].clientHeight}px`;
      this.artificalBlocks.push(block);
    }


    window.addEventListener('scroll', () => {
      const blockPose = this.inner.getBoundingClientRect().top / this.normalize;
      const currentBlockPosition = Math.abs(this.inner.getBoundingClientRect().top / this.normalize);

      this.artificalBlocks.forEach((item, index) => {
        if (this.inner.getBoundingClientRect().top < 0) {
          if (item.position.top < currentBlockPosition && currentBlockPosition < item.position.bottom) {
            this.currentItem = this.cases[item.number];
            this.cases[item.number].style.height = `${countPrevHeight(item.number) + blockPose}px`;
          }

        }
      });
    });
  }
}

class Clients {
  constructor(container) {
    this.container = container;
    this.block = this.container.querySelector('.clients__block');
    this.lines = this.container.querySelectorAll('.clients__outline');
    this.inners = this.container.querySelectorAll('.clients__line');

    this.normalize = 300;

    this.fakeLines = [];

    this.lines.forEach((line, index) => {
      this.fakeLines.push({
        number: index,
        height: this.normalize,
        top: index * this.normalize,
        bottom: index * this.normalize + 300
      })
    });

    const makeCurrentLine = () => {
      this.lines.forEach((line, index) => {
        if (line.getBoundingClientRect().top + line.clientHeight > window.innerHeight  * 0.7) {
          this.inners[index].style.transform = `translateX(130%)`;
        }

        if (line.getBoundingClientRect().top + line.clientHeight < window.innerHeight  * 0.7) {
          this.inners[index].style.transform = `translateX(0)`;
        }

        if (line.getBoundingClientRect().top < window.innerHeight * 0.7 && line.getBoundingClientRect().top + line.clientHeight > window.innerHeight  * 0.7) {
          this.inners[index].style.transform = `translateX(${100 - ((window.innerHeight  * 0.7 - line.getBoundingClientRect().top) / (line.clientHeight / 100))}%)`
        }


      })
    }

    window.addEventListener('scroll', () => {
      makeCurrentLine();
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initScripts();

  const accordionsContainers = document.querySelectorAll('.js-accordions');
  accordionsContainers.forEach((item) => {
    new Accordions(item);
  });

  const casesBlocks = document.querySelectorAll('.js-cases-block');

  if (window.innerWidth > 992) {
    casesBlocks.forEach((item) => {
      new Cases(item);
    })
  }

  const clientsBlock = document.querySelectorAll('.js-clients-block');
  clientsBlock.forEach((item) => {
    new Clients(item);
  });


  const roadmapSlider = () => {
    const block = $('.js-roadmap-slider');
    const slider = block.find('.roadmap__inner');
    const dot = block.find('.roadmap__dot');
    let partLength = 0;
    let slidesCount = 0;

    slider.on('afterChange', (event, slick, currentSlide, nextSlide) => {
      dot.css('left', `${currentSlide * partLength}px`);
    })

    slider.on('init', (event, slick) => {
      slidesCount = slick.slideCount;
      partLength = block.innerWidth() / slidesCount;
      dot.css('width', `${partLength}px`);
    })

    window.addEventListener('resize', () => {
      partLength = block.innerWidth() / slidesCount;
      dot.css('width', `${partLength}px`);
    });

    slider.slick({
      slidesToShow: 1,
      arrows: false,
      dots: false,
      infinite: false,
      // initialSlide: 1,
      // asNavFor: dotsNew,
      variableWidth: true,

      responsive: [
        {
          breakpoint: 480,
          settings: {
            variableWidth: false,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    });
  }
  roadmapSlider();

  const blogSlider = () => {
    const block = $('.blog__inside');
    const slider = block.find('.js-blog-slider');
    const dot = block.find('.blog-slider__dot');
    let partLength = 0;
    let slidesCount = 0;

    slider.on('afterChange', (event, slick, currentSlide, nextSlide) => {
      dot.css('left', `${currentSlide * partLength}px`);
    })

    slider.on('init', (event, slick) => {
      slidesCount = slick.slideCount;
      partLength = block.innerWidth() / slidesCount;
      dot.css('width', `${partLength}px`);
    })

    window.addEventListener('resize', () => {
      partLength = block.innerWidth() / slidesCount;
      dot.css('width', `${partLength}px`);
    });

    slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      variableWidth: true
    });
  }
  blogSlider();

  // if (window.innerWidth <= 992) {
  //   setTimeout(() => {
  //     const theLine = new marquee( document.getElementById( 'marquee' ), {
  //       delayBeforeStart: 0,
  //       speed: 70,
  //       duplicated: true,
  //     });
  //   }, 10);
  // }
});