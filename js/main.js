document.addEventListener("DOMContentLoaded", function () {
  // back top
  var backTop = document.querySelector("#back-top");

  // width document
  var widthDoc = document.querySelector("body");

  // header
  var header = document.querySelector('#header');

  // show menu pc
  var fullMenu = document.querySelector('.full-menu')
  var showFullMenu = document.querySelector('.js_showMenu')

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

      // show menu pc
      if(showFullMenu){
        showFullMenu.onclick = function() {
          if(fullMenu){
            if(fullMenu.classList.contains('active')){
              fullMenu.classList.remove('active')
              widthDoc.style.overflow = 'auto'
            } else {
              fullMenu.classList.add('active')
              widthDoc.style.overflow = 'hidden'
            }

            
          }
        }

        if(fullMenu){
          fullMenu.querySelector('.close-full-menu').onclick = () => {
            fullMenu.classList.remove('active')
            widthDoc.style.overflow = 'auto'
          }
        }
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
      };
    },
    // khoi tao function start
    start: function () {
      // su ly cac su kien
      this.handleEvent();
      // window scroll
      this.windowScroll()
      // slider cty thanh vien
      // this.sliderCompany();
    },
  };

  app.start();
});
