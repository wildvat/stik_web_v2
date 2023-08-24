const toggleFn = function () {
    const $toggleTrigger = document.querySelectorAll('.toggleTrigger');
    if ($toggleTrigger.length) {
        $toggleTrigger.forEach((value) => {
            value.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                if (value.nextElementSibling.style.display === "block") {
                    value.nextElementSibling.style.display = "none";
                } else {
                    value.nextElementSibling.style.display = "block";
                }

            });
        })
    }
}
export default toggleFn;
