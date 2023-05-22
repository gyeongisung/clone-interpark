window.addEventListener("load", function () {
  // Events Swiper
  let eventsData;
  const eventsXhttp = new XMLHttpRequest();
  eventsXhttp.onreadystatechange = function (event) {
    let req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      eventsData = JSON.parse(req.response);
      makeEventsSlide();
    }
  };
  eventsXhttp.open("GET", "data/eventsdata.json");
  eventsXhttp.send();
  function makeEventsSlide() {
    let swEventsHtml = ``;
    for (let i = 0; i < eventsData.events_total; i++) {
      let obj = eventsData[`events_${i + 1}`];
      let temp = `
      <div class="swiper-slide">
                  <a href="${obj.link}" class="events-link">
                    <img src="images/${obj.pic}" alt="${obj.alt}" />
                  </a>
                </div>`;
      swEventsHtml += temp;
    }
    let swEventsWrapper = document.querySelector(".sw-events .swiper-wrapper");
    swEventsWrapper.innerHTML = swEventsHtml;

    let eventsSwiper = new Swiper(".sw-events", {
      slidesPerView: 3,
      spaceBetween: 27,
      navigation: {
        nextEl: ".event .sw-next",
        prevEl: ".event .sw-prev",
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
        },
      },
    });
  }
});
