
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  let head = select('#header')
  let logo_txt = select('.un-text')
  let logo_span = select('.un-span')
  let nav_tog = select('.mobile-nav-toggle')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
        head.classList.remove('dark')
        head.classList.add('light')
        logo_txt.classList.remove('white-color')
        logo_txt.classList.add('dark-blue-color')
        logo_span.classList.remove('light-violet-color')
        logo_span.classList.add('violet-color')
        nav_tog.classList.remove('white-color')
        nav_tog.classList.add('dark-blue-color')
        $(function() {
          $('.nav-link').each(function() {
            $(this).removeClass('white-color');
            $(this).addClass('dark-blue-color');
          });
        })
        $('.nav-ul').addClass('white-background');
        $('.nav-ul').removeClass('dark-violet-background');
      } else {
        backtotop.classList.remove('active')
        head.classList.add('dark')
        head.classList.remove('light')
        logo_txt.classList.add('white-color')
        logo_txt.classList.remove('dark-blue-color')
        logo_span.classList.add('light-violet-color')
        logo_span.classList.remove('violet-color')
        nav_tog.classList.add('white-color')
        nav_tog.classList.remove('dark-blue-color')
        $(function() {
          $('.nav-link').each(function() {
            $(this).addClass('white-color');
            $(this).removeClass('dark-blue-color');
          });
        })
        $('.nav-ul').removeClass('white-background');
        $('.nav-ul').addClass('dark-violet-background');
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    var past_time = $.now();
    window.addEventListener('load', () => {
      var cur_time = $.now();
      if(((cur_time - past_time)/1000)>3){
        preloader.remove();
      }else{
        window.setTimeout(() => {
          preloader.remove();
        }, 2000);
      }
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  $("#submit-form").submit((e)=>{
        e.preventDefault()
        $(".alert-box").html('<div class="alert-unbug sending">Please wait, sending your message to unBug. &nbsp;<i class="bx bx-loader-alt load-it"></i></div>');
        $(':input[type="submit"]').prop('disabled', true);
        $(':input[type="submit"]').text('Sending...');
        $.ajax({
            url:"https://script.google.com/macros/s/AKfycbzos7Dg5ITSTdKxRM0W9Zsk9LuRvHctFaRq1M2frQ/exec",
            data:$("#submit-form").serialize(),
            method:"post",
            success:function (response){
              $(".alert-box").html('<div class="alert-unbug success">Success! your message has been sent to unBug, we will get in touch with you soon. &nbsp;<i class="bx bx-badge-check zoom-it"></i></div>')
                $("#submit-form").trigger("reset");
              setTimeout(function () {
                       $('.alert-box').html('');
                   }, 4500);
              $(':input[type="submit"]').prop('disabled', false);
              $(':input[type="submit"]').text('Send Message');
            },
            error:function (err){
                $(".alert-box").html('<div class="alert-unbug failed">Aw snap! message sending failed. Try after sometime. &nbsp;<i class="bx bx-upside-down load-it-less"></i></div>')
                setTimeout(function () {
                     $('.alert-box').html('');
                 }, 4500);
                $(':input[type="submit"]').prop('disabled', false);
                $(':input[type="submit"]').text('Send Message');
            }
        })
    })

})()