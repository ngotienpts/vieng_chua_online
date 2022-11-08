document.addEventListener("DOMContentLoaded", function () {
  // back top
  var backTop = document.querySelector("#back-top");

  // width document
  var widthDoc = document.querySelector("body");

  // header
  var header = document.querySelector("#header");

  // show menu pc
  var fullMenu = document.querySelector(".full-menu");
  var showFullMenu = document.querySelector(".js_showMenu");

  // show submenu
  var submenu = document.querySelector("#sidebar");
  var showSubs = document.querySelectorAll(".js_show_submenu");

  // show see more detail
  var moreDetails = document.querySelectorAll('.see-more-detail');

  // show see more sild detail
  var moreSideDetail = document.querySelector('.see-more-right-detail')


  // show pagination detail mob
  var showPagiMb = document.querySelector('.pagination-detail-mb')

  // slider cate
  var insideItems = document.querySelectorAll('.inside-left-primary__item');

  // navbar arrow 
  var arrow = document.querySelector('.navbar-arrow');
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
      if (showFullMenu) {
        showFullMenu.onclick = function () {
          if (fullMenu) {
            if (fullMenu.classList.contains("active")) {
              fullMenu.classList.remove("active");
              widthDoc.style.overflow = "auto";
            } else {
              fullMenu.classList.add("active");
              widthDoc.style.overflow = "hidden";
            }
          }
        };

        if (fullMenu) {
          fullMenu.querySelector(".close-full-menu").onclick = () => {
            fullMenu.classList.remove("active");
            widthDoc.style.overflow = "auto";
          };
        }
      }

      // submenu
      if (showSubs) {
        showSubs.forEach(function (el, index) {
          el.onclick = () => {
            if (submenu && submenu.matches(".active")) {
              submenu.classList.remove("active");
            } else {
              submenu.classList.add("active");
            }
          };
        });

        if (submenu) {
          submenu.querySelector(".js_close_sub").onclick = function () {
            submenu.classList.remove("active");
          };
        }
      }

      if (submenu) {
        var menuItems = submenu.querySelectorAll(".js_show_drop_mb");
        menuItems.forEach(function (item) {
          var parent = item.closest(".navbar-mb-cate-item");
          item.onclick = () => {
            parent.classList.toggle("active");
          };
        });
      }

      // arrow
      if(arrow){
        var navbarList = document.querySelector('.navbar-mb__list');
        arrow.onclick = function(){
          navbarList.scrollLeft += 100;
        }
      }
      // see more detail
      if(moreDetails) {
        moreDetails.forEach(function(item){
          var icon = item.firstElementChild
          var changeTetx = item.lastElementChild
          var text = item.parentElement.querySelector('.timeline-text')
          item.onclick = function() {
            icon.classList.toggle('rote180')
            text.classList.toggle('scroll')
  
            if(text.classList.contains('scroll')){
              changeTetx.textContent = 'Thu gọn'
            }else {
              changeTetx.textContent = 'Click để xem tiếp'
            }
          }
        })
      }

      // see more side detail
      if(moreSideDetail){
        var iconS = moreSideDetail.firstElementChild
        var changeTextS = moreSideDetail.lastElementChild
        var textS = document.querySelector('.swiper-pagination')
        moreSideDetail.onclick = function(){
          iconS.classList.toggle('rote180')
          textS.classList.toggle('full')

          if(textS.classList.contains('full')){
            changeTextS.textContent = 'Thu gọn'
          }else {
            changeTextS.textContent = 'Xem tiếp'
          }
  
        }
      }

      // show pagination detail mb
      if(showPagiMb){
        var paginMb = document.querySelector('.swiper-pagination')
        var seePaginMb = document.querySelector('.see-more-right-detail')
        showPagiMb.onclick = function(){
          paginMb.classList.toggle('active')
          seePaginMb.classList.toggle('active')
        }
      }


      // show item cate
      if(insideItems){
        insideItems.forEach(function(item){
          item.onclick = function(){
            this.classList.toggle('active')
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

    // slider detail cap 1
    sliderDetailPeimary: function () {
      var timelineSwiper = new Swiper(".timeline .swiper-container", {
        direction: "vertical",
        loop: false,
        speed: 1600,
        pagination: ".swiper-pagination",
        paginationBulletRender: function (swiper, index, className) {
          var year = document
            .querySelectorAll(".swiper-slide")
            [index].getAttribute("data-year");
          return '<span class="' + className + '">' + year + "</span>";
        },
        paginationClickable: true,
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        breakpoints: {
          768: {
            direction: "horizontal",
            
          },
        },
      });
    },
    // slider detail cap 2
    sliderDetailSecondary: function () {
      var numSlick = 0;
      // var $slider = $(".swiper-slide-list");
      $('.swiper-slide-list').each( function() {
        numSlick++;
        if ($(this).addClass( 'slider-' + numSlick ).length) {
          var currentSlide;
          var slidesCount;
          var sliderCounter = document.createElement("div");
          sliderCounter.classList.add("slider__counter");
  
          var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $(sliderCounter).text(currentSlide + "/" + slidesCount);
          };
  
          $(this).addClass( 'slider-' + numSlick ).on("init", function (event, slick) {
            $(this).addClass( 'slider-' + numSlick ).append(sliderCounter);
            updateSliderCounter(slick);
          });
  
          $(this).addClass( 'slider-' + numSlick ).on("afterChange", function (event, slick, currentSlide) {
            updateSliderCounter(slick, currentSlide);
          });
  
          $(this).addClass( 'slider-' + numSlick ).slick({
            dots: true,
            infinite: false,
            speed: 500,
            fade: true,
            cssEase: "linear",
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          });
  
        }
         
      })
    },
    //  // slider cate
    sliderCate: function(){
      insideItems.forEach(function(item,index){
        var mySwiperCate = item.querySelector('.mySwiperSide')
        var pagiIndex = item.querySelector('.swiper-pagination')
        pagiIndex.classList.add(`swiper-pagination-${index}`)

        var swiper = new Swiper(mySwiperCate, {
          slidesPerView: 2,
          grid: {
            rows: 4,
            fill: 'rows',
          },
          spaceBetween: 15,
          pagination: {
            el: `.swiper-pagination-${index}`,
            clickable: true,
          },
          hideOnClick:true,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 1,
            },
          },
        });
      })
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
      this.windowScroll();
      // slider detail cap 1
      this.sliderDetailPeimary();
      // slider detail cap 2
      this.sliderDetailSecondary();
      //  // slider cate
      this.sliderCate();
    },
  };

  app.start();
});
