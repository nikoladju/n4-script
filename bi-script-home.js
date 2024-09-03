  pageFunctions.addFunction('gsapHeaderReveal', function() {
    // Variables for header animations
    let pageWrapper = document.querySelector(".page-wrapper");
    let navComponent = document.querySelector(".nav_component");
    let headerHeading = document.querySelector("[data-animation=header-heading]");
    let headerText = document.querySelector("[data-animation=header-text]");
    let headerLines = document.querySelectorAll("[data-animation=header-lines]");
    let headerButton = document.querySelector("[data-animation=header-button]");
    let headerVisual = document.querySelector("[data-animation=header-visual]");
    let headerVisualFill = document.querySelector("[data-animation=header-visual-fill]");
    let headerVisualElement = document.querySelector("[data-animation=header-visual-element]");

    // Create the GSAP timeline for subsequent page loads
    let tlHeader = gsap.timeline({
      paused: true, 
      onStart: function () {
        pageWrapper.style.visibility = "visible";
      }
    });

    tlHeader.from(headerHeading.querySelectorAll(".line"), {
      opacity: 0,
      stagger: { each: 0.15 },
      ease: "inOutCubic",
      yPercent: 110,
      duration: 1,
    });

    tlHeader.from(headerButton, {
      opacity: 0,
      scale: 0.9,
      ease: "inOutCubic",
      duration: 0.8
    }, "-=0.8");

    tlHeader.from(headerLines, {
      height: "0%",
      duration: 0.8,
      ease: "inOutQuint",
    }, "-=0.6");

    tlHeader.from(headerText.querySelectorAll(".line"), {
      opacity: 0,
      stagger: { each: 0.15 },
      ease: "inOutCubic",
      yPercent: 110,
      duration: 1,
    }, "<");

    tlHeader.to(navComponent, {
      opacity: 1,
      duration: 0.5,
      ease: "inOutCubic"
    }, "-=0.8");

    tlHeader.fromTo(headerVisualFill, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
                    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1.3,
      ease: "inOutCubic",
    }, "-=0.3");

    tlHeader.fromTo(headerVisualElement, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 1.3,
      ease: "inOutCubic",
    }, "<");

    tlHeader.fromTo(headerVisual, { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
                    {
      clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
      duration: 1.3,
      ease: "inOutCubic",
    }, "-=1");

    // Variables for page load elements
    let pageLoad = document.querySelector(".page_load-wrapper");
    let pageLoadLogoWrapper = document.querySelector(".page_load-logo-wrapper");
    let pageLoadLogo = document.querySelector(".page_load-logo");
    let pageLoadArrow = document.querySelectorAll(".page_load-arrow-icon");
    let pageLoadFillItem = document.querySelectorAll(".page_load-fill-item");

    // Create the GSAP timeline for the first page load animation
    let tlHeaderPageLoad = gsap.timeline({
      onStart: function () {
        pageWrapper.style.visibility = "visible";
      },
      onComplete: function() {
        // Play the main header animation
        tlHeader.play();

        // Hide the page load wrapper
        pageLoad.style.display = "none";

        // Check if the cookie is not already set
        if (document.cookie.indexOf("visited=true") === -1){
          // Set the cookie to mark the first visit
          document.cookie = "visited=true";
        }
      }
    });

    tlHeaderPageLoad.fromTo(pageLoadLogoWrapper, 
                            { width: '101%' }, 
                            { width: '0%', duration: 1, ease: "inOutCubic" });

    tlHeaderPageLoad.to(pageLoadLogoWrapper, 
                        { width: '25%', duration: 1, ease: "inOutCubic" });

    tlHeaderPageLoad.fromTo(pageLoadArrow, 
                            { width: "0%" }, 
                            { width: "100%", duration: 1, ease: "inOutCubic" }, "<");

    tlHeaderPageLoad.fromTo(pageLoadLogo, 
                            { width: '0vw' }, 
                            { width: '15vw', duration: 1, ease: "inOutCubic" }, "<");

    tlHeaderPageLoad.to(pageLoadLogoWrapper, 
                        { width: '101%', duration: 0.75, delay: 1, ease: "inOutQuint" });

    tlHeaderPageLoad.to(pageLoadLogo, 
                        { opacity: 0, duration: 0.5, ease: "power1.out" }, "-=0.3");

    tlHeaderPageLoad.fromTo(pageLoadFillItem, 
                            { height: '100%' }, 
                            { height: '0%', duration: 1.5, ease: "inOutCubic", stagger: { each: 0.1 } }, "-=0.1");

    if (document.cookie.indexOf("visited=true") >= 0) {
      // Hide the page load wrapper
      pageLoad.style.display = "none";
      pageLoad.remove();
      tlHeader.play();
    } 

  }, ['gsapCreateEase', 'splitType'], 'font-loaded');
