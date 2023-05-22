/**
 * 작성자 : 홍길동
 * 연락처 : aaa@aaa.net;
 * 작성일 : 23-05-22
 * 기능 : 쇼핑몰 리스트 슬라이드 코드
 * 업데이트 : 각 쇼핑몰 목록 출력 함수화 작업
 */
window.addEventListener("load", function () {
  // Books Swiper

  function parseBooks(_menu) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) {
      let req = event.target;
      if (req.readyState === XMLHttpRequest.DONE) {
        let data = JSON.parse(req.response);
        makeBooksSlide(data);
      }
    };
    if (_menu === "MD’s Pick") {
      xhr.open("GET", "data/booksdata.json");
    } else if (_menu === "베스트셀러") {
      xhr.open("GET", "data/booksdata1.json");
    } else if (_menu === "신간추천") {
      xhr.open("GET", "data/booksdata2.json");
    } else if (_menu === "특가할인") {
      xhr.open("GET", "data/booksdata3.json");
    }

    xhr.send();
  }
  parseBooks("MD’s Pick");

  let booksSwiper;

  function makeBooksSlide(_data) {
    let swBooksHtml = ``;
    for (let i = 0; i < _data.books_total; i++) {
      let obj = _data[`books_${i + 1}`];

      let temp = `
                  <div class="swiper-slide">
                    <a href="${obj.link}" class="books-link">
                      <div class="books-img">
                        <img src="images/${obj.pic}" alt="${obj.alt}" />
                      </div>
                      <div class="books-info">
                        <p class="books-info-title">${obj.title}</p>
                        <p class="books-info-price"><em>${obj.price}</em>원</p>
                      </div>
                    </a>
                  </div>
      `;
      swBooksHtml += temp;
    }

    let swBooksWrapper = document.querySelector(".sw-books .swiper-wrapper");
    swBooksWrapper.innerHTML = swBooksHtml;

    if (booksSwiper) {
      booksSwiper.destroy();
    }

    booksSwiper = new Swiper(".sw-books", {
      slidesPerView: 3,
      grid: {
        rows: 4,
        fill: "row",
      },
      spaceBetween: 19,
      navigation: {
        nextEl: ".books .sw-next",
        prevEl: ".books .sw-prev",
      },
      breakpoints: {
        1024: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 30,
          grid: {
            rows: 1,
          },
        },
        1280: {
          slidesPerView: 5,
          slidesPerGroup: 5,
          spaceBetween: 27,
          grid: {
            rows: 1,
          },
        },
      },
    });
  }
  const btns = this.document.querySelectorAll(".books .btns a");
  btns[0].onclick = function (event) {
    event.preventDefault();
    parseBooks("MD’s Pick");
  };
  btns[1].onclick = function (event) {
    // a태그의 기본 동작인 href를 막는다.
    event.preventDefault();
    parseBooks("베스트셀러");
  };
  btns[2].onclick = function (event) {
    event.preventDefault();
    parseBooks("신간추천");
  };
  btns[3].onclick = function (event) {
    event.preventDefault();
    parseBooks("특가할인");
  };
});
