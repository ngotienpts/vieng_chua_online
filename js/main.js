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
  var moreDetails = document.querySelectorAll(".see-more-detail");

  // show see more sild detail
  var moreSideDetail = document.querySelector(".see-more-right-detail");

  // show pagination detail mob
  var showPagiMb = document.querySelector(".pagination-detail-mb");

  // slider cate
  var insideItems = document.querySelectorAll(".inside-left-primary__item");

  // navbar arrow
  var arrow = document.querySelector(".navbar-arrow");

  // lu huong
  var incensoryBlock = document.querySelectorAll(".change-incensory");
  var smokes = document.querySelectorAll(".smoke");

  if (smokes) {
    smokes.forEach(function (item) {
      var canvas = item.querySelector(".canvas"),
        ctx = canvas.getContext("2d"),
        settings = {
          color: {
            r: 255,
            g: 255,
            b: 255,
          },
        },
        loading = true;

      // canvas.height = document.body.offsetHeight;
      canvas.height = 500;
      canvas.width = 250; //rong

      var parts = [],
        minSpawnTime = 100, //toc do
        lastTime = new Date().getTime(),
        maxLifeTime = Math.min(3000, (canvas.height / (1.5 * 60)) * 1000),
        emitterX = canvas.width / 2,
        emitterY = canvas.height / 2.1,
        smokeImage = new Image();

      function spawn() {
        if (new Date().getTime() > lastTime + minSpawnTime) {
          lastTime = new Date().getTime();
          parts.push(new smoke(emitterX, emitterY));
        }
      }

      function render() {
        if (loading) {
          load();
          return false;
        }

        var len = parts.length;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        while (len--) {
          if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
            parts.splice(len, 1);
          } else {
            parts[len].update();

            ctx.save();
            var offsetX = -parts[len].size / 2,
              offsetY = -parts[len].size / 2;

            ctx.translate(parts[len].x - offsetX, parts[len].y - offsetY);
            ctx.rotate((parts[len].angle / 180) * Math.PI);
            ctx.globalAlpha = parts[len].alpha;
            ctx.drawImage(
              smokeImage,
              offsetX,
              offsetY,
              parts[len].size,
              parts[len].size
            );
            ctx.restore();
          }
        }
        spawn();
        window.requestAnimationFrame(render);
      }

      function smoke(x, y, index) {
        this.x = x;
        this.y = y;

        this.size = 1;
        this.startSize = 5;
        this.endSize = 10;

        this.angle = Math.random() * 359;

        this.startLife = new Date().getTime();
        this.lifeTime = 0;

        this.velY = -1 - Math.random() * 0.5;
        this.velX = Math.floor(Math.random() * -6 + 3) / 10;
      }

      smoke.prototype.update = function () {
        this.lifeTime = new Date().getTime() - this.startLife;
        this.angle += 0.2;

        var lifePerc = (this.lifeTime / maxLifeTime) * 100;

        this.size =
          this.startSize + (this.endSize - this.startSize) * lifePerc * 0.1;

        this.alpha = 1 - lifePerc * 0.01;
        this.alpha = Math.max(this.alpha, 0);

        this.x += this.velX;
        this.y += this.velY;
      };

      smokeImage.src = item.querySelector(".img-smoke").src;
      smokeImage.onload = function () {
        loading = false;
      };

      function load() {
        if (loading) {
          setTimeout(load, 100);
        } else {
          render();
        }
      }

      render();
    });
  }

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
      if (arrow) {
        var navbarList = document.querySelector(".navbar-mb__list");
        arrow.onclick = function () {
          navbarList.scrollLeft += 100;
        };
      }
      // see more detail
      if (moreDetails) {
        moreDetails.forEach(function (item) {
          var icon = item.firstElementChild;
          var changeTetx = item.lastElementChild;
          var text = item.parentElement.querySelector(".timeline-text");
          item.onclick = function () {
            icon.classList.toggle("rote180");
            text.classList.toggle("scroll");

            if (text.classList.contains("scroll")) {
              changeTetx.textContent = "Thu gọn";
            } else {
              changeTetx.textContent = "Click để xem tiếp";
            }
          };
        });
      }

      // see more side detail
      if (moreSideDetail) {
        var iconS = moreSideDetail.firstElementChild;
        var changeTextS = moreSideDetail.lastElementChild;
        var textS = document.querySelector(".swiper-pagination");
        moreSideDetail.onclick = function () {
          iconS.classList.toggle("rote180");
          textS.classList.toggle("full");

          if (textS.classList.contains("full")) {
            changeTextS.textContent = "Thu gọn";
          } else {
            changeTextS.textContent = "Xem tiếp";
          }
        };
      }

      // show pagination detail mb
      if (showPagiMb) {
        var paginMb = document.querySelector(".swiper-pagination");
        var seePaginMb = document.querySelector(".see-more-right-detail");
        showPagiMb.onclick = function () {
          paginMb.classList.toggle("active");
          seePaginMb.classList.toggle("active");
          widthDoc.classList.toggle("hidden");
        };
      }

      // show item cate
      if (insideItems) {
        insideItems.forEach(function (item) {
          item.onclick = function () {
            this.classList.toggle("active");
          };
        });
      }

      // show lu huong
      if (incensoryBlock) {
        incensoryBlock.forEach(function (el) {
          el.onclick = function () {
            el.querySelector(".swiper-slide-btn__item").style.display = "none";
            el.querySelector(".incensory").style.display = "block";
            el.classList.add("active");
          };
        });
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
        // autoHeight: true,
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
      $(".swiper-slide-list").each(function () {
        numSlick++;
        if ($(this).addClass("slider-" + numSlick).length) {
          var currentSlide;
          var slidesCount;
          var sliderCounter = document.createElement("div");
          sliderCounter.classList.add("slider__counter");

          var updateSliderCounter = function (slick, currentIndex) {
            currentSlide = slick.slickCurrentSlide() + 1;
            slidesCount = slick.slideCount;
            $(sliderCounter).text(currentSlide + "/" + slidesCount);
          };

          $(this)
            .addClass("slider-" + numSlick)
            .on("init", function (event, slick) {
              $(this)
                .addClass("slider-" + numSlick)
                .append(sliderCounter);
              updateSliderCounter(slick);
            });

          $(this)
            .addClass("slider-" + numSlick)
            .on("afterChange", function (event, slick, currentSlide) {
              updateSliderCounter(slick, currentSlide);
            });

          $(this)
            .addClass("slider-" + numSlick)
            .slick({
              dots: true,
              infinite: false,
              speed: 500,
              fade: true,
              // adaptiveHeight: true,
              cssEase: "linear",
              arrows: true,
              slidesToShow: 1,
              slidesToScroll: 1,
            });
        }
      });
    },
    //  // slider cate
    sliderCate: function () {
      insideItems.forEach(function (item, index) {
        var mySwiperCate = item.querySelector(".mySwiperSide");
        var pagiIndex = item.querySelector(".swiper-pagination");
        pagiIndex.classList.add(`swiper-pagination-${index}`);

        var swiper = new Swiper(mySwiperCate, {
          slidesPerView: 2,
          grid: {
            rows: 4,
            fill: "rows",
          },
          spaceBetween: 15,
          pagination: {
            el: `.swiper-pagination-${index}`,
            clickable: true,
          },
          hideOnClick: true,
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 1,
            },
          },
        });
      });
    },
    // pagination
    paginationDetail: function () {
      $(".detail-primary .swiper-pagination").click(function () {
        $(this).removeClass("active");
        $(".see-more-right-detail").removeClass("active");
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
      this.windowScroll();
      // slider detail cap 1
      this.sliderDetailPeimary();
      // slider detail cap 2
      this.sliderDetailSecondary();
      //  // slider cate
      this.sliderCate();
      // pagination
      this.paginationDetail();
    },
  };

  app.start();
});
