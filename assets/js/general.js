const generalFn = function () {
    //  const height = window.innerHeight;
    //  const menuHeight = document.getElementById('headerNav').offsetHeight;
    const $year = document.getElementById('yearString');
    if ($year) {
        const year = new Date();
        $year.innerHTML = year.getFullYear().toLocaleString();
    }
    /**
     document.querySelectorAll('.mHeight100').forEach(function (el) {
    el.style.minHeight = `${height - menuHeight}px`;
  });
     **/
};
export default generalFn;
