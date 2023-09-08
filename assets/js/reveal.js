const revealFn = () => {
    /*
    console.log('reveal.js');
    document.addEventListener('scroll', (event) => {
        console.log(event);
    });
    */
    const selectorTrigger = 'animation';
    function scrollTrigger(selector, options = {}){
        let els = document.querySelectorAll(selector)
        els = Array.from(els)
        els.forEach(el => {
            addObserver(el, options)
        })
    }

    function addObserver(el, options){
        if(!('IntersectionObserver' in window)){
            if(options.cb){
                options.cb(el)
            }else{
                entry.target.classList.add(selectorTrigger)
            }
            return
        }
        let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(options.cb){
                        options.cb(el)
                    }else{
                        entry.target.classList.add(selectorTrigger)
                    }
                    observer.unobserve(entry.target)
                }
            })
        }, options)
        observer.observe(el)
    }
    scrollTrigger('.js-animation');
// Example usages:
    /*
    scrollTrigger('.intro-text')

    scrollTrigger('.scroll-reveal', {
        rootMargin: '-200px',
    })

    scrollTrigger('.loader', {
        rootMargin: '-200px',
        cb: function(el){
            el.innerText = 'Loading...'
            setTimeout(() => {
                el.innerText = 'Task Complete!'
            }, 1000)
        }
    })
    */




}

export default revealFn;
