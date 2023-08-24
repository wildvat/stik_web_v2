const exploreFn = () => {

    /**
     EXPRESS
     * */
    const $menuExploreExpress = document.querySelectorAll('[class^="js-menu--explore-express"]');

    if ($menuExploreExpress.length) {
        $menuExploreExpress.forEach(($expressMenu) => {
            const type = $expressMenu.dataset.type;

            const $menuExploreExpressLinks = $expressMenu.getElementsByTagName('a');
            if ($menuExploreExpressLinks.length) {
                for (const $link of $menuExploreExpressLinks) {
                    $link.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        let $linkTarget;

                        if (type === 'mobile') {
                            $linkTarget = event.target;
                        } else {
                            $linkTarget = event.target.parentNode.parentNode;
                        }
                        let link = $linkTarget.getAttribute('href');
                        if (link) {
                            const $texts = document.querySelectorAll(`.js-menu--explore-express-${type}__link`);
                            if ($texts.length) {
                                $texts.forEach(($text) => {
                                    if (type === 'mobile') {
                                        $text.classList.remove('active');
                                    } else {
                                        $text.firstChild.nextSibling.setAttribute('fill', '#000');
                                        $text.firstChild.nextSibling.classList.remove('font-weight-bold');
                                    }
                                });
                                if (type === 'mobile') {
                                    $linkTarget.classList.add('active');
                                } else {
                                    $linkTarget.firstChild.nextSibling.setAttribute('fill', '#d50250');
                                    $linkTarget.firstChild.nextSibling.classList.add('font-weight-bold');
                                }
                                link = link.replace(`#explore-express-${type}__`, '');
                                const $imagesExploreExpress = document.querySelectorAll(`[class^="js-explore-express-${type}__image"]`);
                                if ($imagesExploreExpress.length) {
                                    $imagesExploreExpress.forEach(($imageExploreExpress) => {
                                        const imageClass = $imageExploreExpress.classList;
                                        const imageType = imageClass[0].replace(`js-explore-express-${type}__image--`, '');
                                        $imageExploreExpress.setAttribute(
                                            type === 'mobile' ? 'src' : 'href',
                                            `/assets/images/explore-express-${type}-${link}-${imageType}.${imageType === 'secondary' ? 'gif' : 'png'}`
                                        );
                                    });
                                }
                            }
                        }
                    });
                }
            }

            //console.log(type);
            /**
             *  IMAGES
             const $imagesExploreExpress = document.querySelectorAll(`[class^="js-explore-express-${type}__image"]`);
             if ($imagesExploreExpress.length) {
                console.log($imagesExploreExpress);
            }
             */
        });
    }

    /**
     ACCESS && Moments && MOBILE POST
     * */
    const $menuExploreSlider = document.querySelectorAll('.js-menu--explore__slider');
    if ($menuExploreSlider.length) {
        const simulateClick = (elem) => {
            // Create our event (with options)
            const evt = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            });
            // If cancelled, don't dispatch our event
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
                    $elemetExplore.addEventListener('click', (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        let $circle;
                        if ($slider.id === 'explore-moments-mobile' || event.target.nodeName.toLocaleLowerCase() === 'circle') {
                            /*
                            if (play) {
                                clearInterval(play);
                                play = null;
                            }
                             */
                            $circle = event.target;
                        } else {
                            $circle = event.target.firstChild.nextSibling;
                        }
                        let target = $circle.dataset.target;
                        //console.log('click', target);

                        if (target) {
                            const $circles = document.querySelectorAll(`.js-menu--${$slider.id}`);
                            if ($circles.length) {
                                $circles.forEach(($circle) => {
                                    $circle.setAttribute('fill', '#aaa');
                                });
                                $circle.setAttribute('fill', '#24313e');
                            } else {
                                const $links = document.querySelectorAll(`.js-menu--${$slider.id}__link`);
                                if ($links.length) {
                                    $links.forEach(($link) => {
                                        $link.parentNode.classList.remove('active');
                                    });
                                    $circle.parentNode.classList.add('active');
                                }
                            }
                            target = target.replace(`${$slider.id}_menu_`, '');
                            if (target.indexOf('explore-post-mobile') > -1) {
                                for (const $slide of $slidesExplore.children) {
                                    if ($slide.id === target) {
                                        $slide.classList.remove('d-none');
                                    } else {
                                        $slide.classList.add('d-none');
                                    }
                                }
                            } else {
                                // console.log(target);
                                $imageExplore.setAttribute(
                                    $slider.id.indexOf('explore-moments-mobile') > -1 ? 'src' : 'href',
                                    `/assets/images/${target}`
                                );
                                /*
                                $imageExplore.setAttribute(
                                    'href',
                                    `/assets/images/${$slider.id}_${target}.${($slider.id === 'explore-access') ? 'gif' : 'png'}`
                                );
                                 */
                            }
                        }
                    });
                });
                let i = 1;
                play = setInterval(() => {
                    simulateClick($menuExploreLinks[i]);
                    i++;
                    if (i === ($menuExploreLinks.length)) {
                        i = 0;
                    }
                }, 5000);
            }
        });
    }
};
export default exploreFn;
