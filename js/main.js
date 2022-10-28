document.addEventListener("DOMContentLoaded", function () {
  // back top
  var backTop = document.querySelector("#back-top");

  // width document
  var widthDoc = document.querySelector("body");

  // header
  var header = document.querySelector('#header');

  // submenu
  var subMenu = document.querySelector('.sub-menu-wrapper');

  // navbar arrow 
  var arrow = document.querySelector('.navbar-arrow');

  // height fixed
  var heightFixed = document.querySelector('.height-fixed');

  // header
  var prevScrollpos = window.pageYOffset;

  // about
  var aboutIcons = document.querySelectorAll('.about-minus')

  const app = {
    // su ly cac su kien
    handleEvent: function () {
      const _this = this;

      // when click back top
      if (backTop) {
        backTop.onclick = function () {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        };
      }

      // 
      if(header){
        var extendsMenu = header.querySelectorAll('.header-extend-icon');
        extendsMenu.forEach(function(a){
          if(subMenu){
            subMenu.style.top = header.clientHeight + 'px';
            a.onclick = function(){
              subMenu.classList.toggle('open');
              if(widthDoc.clientWidth <= 980){
                widthDoc.classList.toggle('hide');
              }
            }
          }
        });
        
        
        if(heightFixed){
          heightFixed.style.height = header.clientHeight + 'px';
        }

      }


      // arrow
      if(arrow){
        var navbarList = document.querySelector('.navbar-mb__list');
        arrow.onclick = function(){
          navbarList.scrollLeft += 100;
        }
      }

      // about icon 
      if(aboutIcons){
        aboutIcons.forEach(function(index){
          index.onclick = function(){
            index.parentElement.parentElement.lastElementChild.classList.toggle('open');
            if(index.parentElement.parentElement.lastElementChild.matches('.open')){
              if(index.firstElementChild.getAttribute('class') == 'fas fa-plus'){
                index.firstElementChild.setAttribute('class','fas fa-minus')
              }
            }else {
              index.firstElementChild.setAttribute('class','fas fa-plus')
            }
          }
        })
      }

      // hide cac element khi click ra ngoai
      document.addEventListener("click", function (e) {});
    },
    // scroll top
    scrollFunc: function () {
      if (backTop) {
        if (
          document.body.scrollTop > 300 ||
          document.documentElement.scrollTop > 300
        ) {
          backTop.style.opacity = 1;
          backTop.style.visibility = "visible";
        } else {
          backTop.style.opacity = 0;
          backTop.style.visibility = "hidden";
        }
      }
    },

    // sctoll header
    scrollHeader: function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos && header) {
        document.getElementById("header").style.top = "0";
      } else {
        document.getElementById("header").style.top = "-" + (header.clientHeight + 'px');
      }
      prevScrollpos = currentScrollPos;
    },
    // slider linh vuc hoat dong
    sliderFiledActivity: function(){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1.2,
        spaceBetween: 5,
        centeredSlides: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "progressbar",
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        },
      });
    },
    // slider cty thanh vien
    sliderCompany: function(){
      var swiper2 = new Swiper(".mySwiperCompa", {
        slidesPerView: 2,
        spaceBetween: 60,
        slidesPerGroup: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        hideOnClick:true,
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 98,
            slidesPerGroup: 1,
          },
        },
      });
    },
    // window scroll
    windowScroll: function () {
      var _this = this;
      window.onscroll = function () {
        // scroll top
        _this.scrollFunc();
        // sctoll header
        _this.scrollHeader();
      };
    },
    // khoi tao function start
    start: function () {
      // su ly cac su kien
      this.handleEvent();
      // window scroll
      this.windowScroll();
      // slider linh vuc hoat dong
      this.sliderFiledActivity();
      // slider cty thanh vien
      this.sliderCompany();
    },
  };

  app.start();
});
