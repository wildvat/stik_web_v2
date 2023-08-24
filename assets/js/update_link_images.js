const updateLinkImagesSvgFn = () => {
    /**
     let loaded = false;
     setTimeout(() => {
        Array.prototype.forEach.call(
            document.querySelectorAll('image[data-href]')
            , (img) => {
                img.setAttribute('href', img.getAttribute('data-href'));
                img.onload = () => {
                    if (!loaded) {
                        alert('descargado');
                        loaded = true;
                    }
                };
            }
        );
    }, 10000);
     **/
    Array.prototype.forEach.call(
        document.querySelectorAll('image[data-href]')
        , (img) => {
            img.setAttribute('href', img.getAttribute('data-href'));
        });

    Array.prototype.forEach.call(
        document.querySelectorAll('img[data-src]')
        , (img) => {
            img.setAttribute('src', img.getAttribute('data-src'));
        });
};
export default updateLinkImagesSvgFn;
