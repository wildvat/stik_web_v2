const moreShowFn = function () {
  const $moreShowTrigger = document.querySelectorAll('.moreShowTrigger');
  if ($moreShowTrigger.length) {
    $moreShowTrigger.forEach((value) => {
      value.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        for (let i = 0; i < value.nextElementSibling.childNodes.length; i++) {
          if (typeof value.nextElementSibling.childNodes[i].className !== 'undefined' && value.nextElementSibling.childNodes[i].className.includes("helper-list-description")) {
            const elementListHelper = value.nextElementSibling.childNodes[i];
            if (elementListHelper.className.includes("mxh-150")) {
              elementListHelper.classList.remove("mxh-150");
            } else {
              elementListHelper.classList.add("mxh-150");
            }
            break
          }
        }
      });
    })
  }
}
export default moreShowFn;
