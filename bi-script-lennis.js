  /*
  * LENIS SCROLL MASTER - must be withing 'global styles'
  * Important check Lenis version # e.g 0.2.28 - newer versions DO NOT work with Finsweet disable scroll.
  */ 
  document.addEventListener('DOMContentLoaded', () => {

    const lenis = new Lenis({
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      lerp: 0.1,
      wheelMultiplier: 0.7,
      mouseMultiplier: 0.7,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    })

    //get scroll value
    // lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    //   console.log({ scroll, limit, velocity, direction, progress })
    // })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    /* 
    * Lenis toggle states - add attributes to DOM items you want to stop/start/toggle
    * NOTE - important to have corresponding FinSweet attribute on element as well 
    * E.G. [fs-scrolldisable-element = enable] + [data-lenis-start]
    */ 
    document.querySelectorAll("[data-lenis-start=true]").forEach(function(element) {
      element.addEventListener("click", function() {
        lenis.start();
      });
    });

    document.querySelectorAll("[data-lenis-stop=true]").forEach(function(element) {
      element.addEventListener("click", function() {
        lenis.stop();
      });
    });

    document.querySelectorAll("[data-lenis-hover]").forEach(function(parentElement) {
      parentElement.addEventListener("mouseenter", function() {
        lenis.stop();
      });

      parentElement.addEventListener("mouseleave", function(event) {
        // Check if the mouse is leaving both the parent and its child (.w-dropdown-list)
        if (!parentElement.contains(event.relatedTarget) || !parentElement.querySelector('.w-dropdown-list').contains(event.relatedTarget)) {
          lenis.start();
        }
      });
    });

    document.querySelectorAll("[data-lenis-toggle]").forEach(function(element) {
      element.addEventListener("click", function() {
        element.classList.toggle("stop-scroll");
        if (element.classList.contains("stop-scroll")) {
          lenis.stop();
        } else {
          lenis.start();
        }
      });
    });

  });
