(() => {
  // ns-hugo:/src/stik_web_v2/assets/js/general.js
  var generalFn = function() {
    const $year = document.getElementById("yearString");
    if ($year) {
      const year = new Date();
      $year.innerHTML = year.getFullYear().toLocaleString();
    }
  };
  var general_default = generalFn;

  // ns-hugo:/src/stik_web_v2/assets/js/countdown.js
  var countDownFn = () => {
    const $countDown = document.getElementById("js-countdown");
    if ($countDown) {
      const date = $countDown.dataset.date;
      if (!date) {
        return;
      }
      const finaleDate = new Date(date).getTime();
      const timer = () => {
        const now = new Date().getTime();
        const diff = finaleDate - now;
        if (diff < 0) {
          document.querySelector(".alert").style.display = "block";
          document.querySelector(".js-countdown-content").style.display = "none";
        }
        let days = Math.floor(diff / (1e3 * 60 * 60 * 24));
        let hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        let minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
        let seconds = Math.floor(diff % (1e3 * 60) / 1e3);
        days <= 99 ? days = `${days}` : days;
        days <= 9 ? days = `00${days}` : days;
        hours <= 9 ? hours = `0${hours}` : hours;
        minutes <= 9 ? minutes = `0${minutes}` : minutes;
        seconds <= 9 ? seconds = `0${seconds}` : seconds;
        document.querySelector("#days").textContent = days;
        document.querySelector("#hours").textContent = hours;
        document.querySelector("#minutes").textContent = minutes;
        document.querySelector("#seconds").textContent = seconds;
      };
      timer();
      setInterval(timer, 1e3);
    }
  };
  var countdown_default = countDownFn;

  // ns-hugo:/src/stik_web_v2/assets/js/toggle.js
  var toggleFn = function() {
    const $toggleTrigger = document.querySelectorAll(".toggleTrigger");
    if ($toggleTrigger.length) {
      $toggleTrigger.forEach((value) => {
        value.addEventListener("click", (event) => {
          event.stopPropagation();
          event.preventDefault();
          if (value.nextElementSibling.style.display === "block") {
            value.nextElementSibling.style.display = "none";
          } else {
            value.nextElementSibling.style.display = "block";
          }
        });
      });
    }
  };
  var toggle_default = toggleFn;

  // ns-hugo:/src/stik_web_v2/assets/js/send-mail.js
  var sendMailFn = function() {
    const $sendErrorFieldsMsg = document.getElementById("sendErrorFileds");
    const $sendErrorMsg = document.getElementById("sendError");
    const $sendSuccessMsg = document.getElementById("sendSuccess");
    const $buttonSendMail = document.getElementById("sendContactMail");
    if ($buttonSendMail) {
      $buttonSendMail.addEventListener("click", function(e) {
        $buttonSendMail.classList.add("disabled");
        $sendSuccessMsg.classList.add("d-none");
        $sendErrorMsg.classList.add("d-none");
        $sendErrorFieldsMsg.classList.add("d-none");
        e.preventDefault();
        e.stopPropagation();
        try {
          const formElement = this.parentElement.parentElement;
          const formData = new FormData(formElement);
          const email = formData.getAll("email")[0].trim();
          const name = formData.getAll("name")[0].trim();
          const phone = formData.getAll("phone")[0].trim();
          const comment = formData.getAll("comment")[0].trim();
          const privacy = document.getElementsByName("privacy")[0].checked;
          if (!email || !name || !privacy || !phone || !comment || !validateEmail(email)) {
            $buttonSendMail.classList.remove("disabled");
            $sendErrorFieldsMsg.classList.remove("d-none");
            return false;
          }
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "https://xivk2tucua.execute-api.eu-west-3.amazonaws.com/production/contact");
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
          xhr.onreadystatechange = function(response) {
            if (xhr.readyState === 4) {
              console.log(xhr.status);
              console.log(response);
              $buttonSendMail.classList.remove("disabled");
              if (xhr.status === 200) {
                $sendSuccessMsg.classList.remove("d-none");
                formElement.reset();
                return true;
              } else {
                window.console.log("error send");
                $sendErrorMsg.classList.remove("d-none");
                return false;
              }
            }
          };
        } catch (e2) {
          alert("4");
          $buttonSendMail.classList.remove("disabled");
          $sendErrorFieldsMsg.classList.remove("d-none");
          return false;
        }
      });
    }
    function validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    }
  };
  var send_mail_default = sendMailFn;

  // ns-hugo:/src/stik_web_v2/assets/js/explore.js
  var exploreFn = () => {
    const $menuExploreExpress = document.querySelectorAll('[class^="js-menu--explore-express"]');
    if ($menuExploreExpress.length) {
      $menuExploreExpress.forEach(($expressMenu) => {
        const type = $expressMenu.dataset.type;
        const $menuExploreExpressLinks = $expressMenu.getElementsByTagName("a");
        if ($menuExploreExpressLinks.length) {
          for (const $link of $menuExploreExpressLinks) {
            $link.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              let $linkTarget;
              if (type === "mobile") {
                $linkTarget = event.target;
              } else {
                $linkTarget = event.target.parentNode.parentNode;
              }
              let link = $linkTarget.getAttribute("href");
              if (link) {
                const $texts = document.querySelectorAll(`.js-menu--explore-express-${type}__link`);
                if ($texts.length) {
                  $texts.forEach(($text) => {
                    if (type === "mobile") {
                      $text.classList.remove("active");
                    } else if ($text.firstChild.nodeName.toLocaleLowerCase() === "text") {
                      $text.firstChild.setAttribute("fill", "#000");
                      $text.firstChild.classList.remove("font-weight-bold");
                    } else {
                      $text.firstChild.nextSibling.setAttribute("fill", "#000");
                      $text.firstChild.nextSibling.classList.remove("font-weight-bold");
                    }
                  });
                  if (type === "mobile") {
                    $linkTarget.classList.add("active");
                  } else if ($linkTarget.firstChild.nodeName.toLocaleLowerCase() === "text") {
                    $linkTarget.firstChild.setAttribute("fill", "#FFD600");
                    $linkTarget.firstChild.classList.add("font-weight-bold");
                  } else {
                    $linkTarget.firstChild.nextSibling.setAttribute("fill", "#FFD600");
                    $linkTarget.firstChild.nextSibling.classList.add("font-weight-bold");
                  }
                  link = link.replace(`#explore-express-${type}__`, "");
                  const $imagesExploreExpress = document.querySelectorAll(`[class^="js-explore-express-${type}__image"]`);
                  if ($imagesExploreExpress.length) {
                    $imagesExploreExpress.forEach(($imageExploreExpress) => {
                      const imageClass = $imageExploreExpress.classList;
                      const imageType = imageClass[0].replace(`js-explore-express-${type}__image--`, "");
                      $imageExploreExpress.setAttribute(
                        type === "mobile" ? "src" : "href",
                        `assets/images/explore-express-${type}-${link}-${imageType}.${imageType === "secondary" ? "gif" : "png"}`
                      );
                    });
                  }
                }
              }
            });
          }
        }
      });
    }
    const $menuExploreSlider = document.querySelectorAll(".js-menu--explore__slider");
    if ($menuExploreSlider.length) {
      const simulateClick = (elem) => {
        const evt = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window
        });
        const canceled = !elem.dispatchEvent(evt);
      };
      $menuExploreSlider.forEach(($slider) => {
        const $menuExplore = document.getElementById($slider.id);
        const $imageExplore = document.getElementById(`js-${$slider.id}__image`);
        const $menuExploreLinks = document.querySelectorAll(`.js-menu--${$slider.id}__link`);
        const $slidesExplore = document.getElementById(`js-${$slider.id}__slides`);
        if ($menuExplore && ($imageExplore || $slidesExplore) && $menuExploreLinks.length) {
          let play;
          $menuExploreLinks.forEach(($elemetExplore) => {
            $elemetExplore.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              let $circle;
              if ($slider.id === "explore-moments-mobile" || event.target.nodeName.toLocaleLowerCase() === "circle") {
                $circle = event.target;
              } else if (event.target.firstChild.nodeName.toLocaleLowerCase() === "circle") {
                $circle = event.target.firstChild;
              } else if (event.target.firstChild.nextSibling && event.target.firstChild.nextSibling.nodeName.toLocaleLowerCase() === "circle") {
                $circle = event.target.firstChild.nextSibling;
              }
              let target = $circle.dataset.target;
              if (target) {
                const $circles = document.querySelectorAll(`.js-menu--${$slider.id}`);
                if ($circles.length) {
                  $circles.forEach(($circle2) => {
                    $circle2.setAttribute("fill", "#aaa");
                  });
                  $circle.setAttribute("fill", "#24313e");
                } else {
                  const $links = document.querySelectorAll(`.js-menu--${$slider.id}__link`);
                  if ($links.length) {
                    $links.forEach(($link) => {
                      $link.parentNode.classList.remove("active");
                    });
                    $circle.parentNode.classList.add("active");
                  }
                }
                target = target.replace(`${$slider.id}_menu_`, "");
                if (target.indexOf("explore-post-mobile") > -1) {
                  for (const $slide of $slidesExplore.children) {
                    if ($slide.id === target) {
                      $slide.classList.remove("d-none");
                    } else {
                      $slide.classList.add("d-none");
                    }
                  }
                } else {
                  $imageExplore.setAttribute(
                    $slider.id.indexOf("explore-moments-mobile") > -1 ? "src" : "href",
                    `assets/images/${target}`
                  );
                }
              }
            });
          });
          let i = 1;
          play = setInterval(() => {
            simulateClick($menuExploreLinks[i]);
            i++;
            if (i === $menuExploreLinks.length) {
              i = 0;
            }
          }, 5e3);
        }
      });
    }
  };
  var explore_default = exploreFn;

  // ns-hugo:/src/stik_web_v2/assets/js/update_link_images.js
  var updateLinkImagesSvgFn = () => {
    Array.prototype.forEach.call(
      document.querySelectorAll("image[data-href]"),
      (img) => {
        img.setAttribute("href", img.getAttribute("data-href"));
      }
    );
    Array.prototype.forEach.call(
      document.querySelectorAll("img[data-src]"),
      (img) => {
        img.setAttribute("src", img.getAttribute("data-src"));
      }
    );
  };
  var update_link_images_default = updateLinkImagesSvgFn;

  // ns-hugo:/src/stik_web_v2/assets/js/send-reserve.js
  var sendReserveFn = function() {
    const $sendErrorFieldsMsg = document.getElementById("sendErrorFileds");
    const $sendErrorMsg = document.getElementById("sendError");
    const $sendSuccessMsg = document.getElementById("sendSuccess");
    const $buttonSendMail = document.getElementById("sendReserveMail");
    if ($buttonSendMail) {
      $buttonSendMail.addEventListener("click", function(e) {
        $buttonSendMail.classList.add("disabled");
        $sendSuccessMsg.classList.add("d-none");
        $sendErrorMsg.classList.add("d-none");
        $sendErrorFieldsMsg.classList.add("d-none");
        e.preventDefault();
        e.stopPropagation();
        try {
          const formElement = this.parentElement.parentElement;
          const formData = new FormData(formElement);
          const email = formData.getAll("email")[0].trim();
          const username = formData.getAll("username")[0].trim();
          const password = formData.getAll("password")[0].trim();
          const password_repeat = formData.getAll("password_repeat")[0].trim();
          const privacy = document.getElementsByName("privacy")[0].checked;
          if (!email || !username || !privacy || !password || !password_repeat || password_repeat !== password || !validateEmail(email)) {
            $buttonSendMail.classList.remove("disabled");
            $sendErrorFieldsMsg.classList.remove("d-none");
            return false;
          }
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "https://app.stik.world/api/reserve/username");
          xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
          xhr.onreadystatechange = function(response) {
            if (xhr.readyState === 4) {
              $buttonSendMail.classList.remove("disabled");
              if (xhr.status === 200) {
                $sendSuccessMsg.classList.remove("d-none");
                formElement.reset();
                window.location = formElement.dataset.redirect;
                return true;
              } else {
                window.console.log("error send");
                $sendErrorMsg.classList.remove("d-none");
                return false;
              }
            }
          };
        } catch (e2) {
          $buttonSendMail.classList.remove("disabled");
          $sendErrorFieldsMsg.classList.remove("d-none");
          return false;
        }
      });
    }
    function validateEmail(email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      }
      return false;
    }
  };
  var send_reserve_default = sendReserveFn;

  // ns-hugo:/src/stik_web_v2/assets/js/reveal.js
  var revealFn = () => {
    const selectorTrigger = "animation";
    function scrollTrigger(selector, options = {}) {
      let els = document.querySelectorAll(selector);
      els = Array.from(els);
      els.forEach((el) => {
        addObserver(el, options);
      });
    }
    function addObserver(el, options) {
      if (!("IntersectionObserver" in window)) {
        if (options.cb) {
          options.cb(el);
        } else {
          entry.target.classList.add(selectorTrigger);
        }
        return;
      }
      let observer = new IntersectionObserver((entries, observer2) => {
        entries.forEach((entry2) => {
          if (entry2.isIntersecting) {
            if (options.cb) {
              options.cb(el);
            } else {
              entry2.target.classList.add(selectorTrigger);
            }
            observer2.unobserve(entry2.target);
          }
        });
      }, options);
      observer.observe(el);
    }
    scrollTrigger(".js-animation");
  };
  var reveal_default = revealFn;

  // <stdin>
  (function() {
    general_default();
    countdown_default();
    toggle_default();
    send_mail_default();
    send_reserve_default();
    explore_default();
    update_link_images_default();
    reveal_default();
  })();
})();
