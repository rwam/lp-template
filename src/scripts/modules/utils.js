(function (root, doc, mylib) {
    'use strict';

    /**
     * @method Logger
     */
    var Utils = (function () {

        var isSmoothScrollSupported = 'scrollBehavior' in doc.documentElement.style;
        var scrollCache = {
            isScroll : null,
            isScrollEnd : null
        };
        var headerHeight;

        function init() {
            var header = doc.querySelector('.header');
            headerHeight = (header ? header.offsetHeight : 0) + 8;

            initListener();
        }

        function initListener() {
            root.addEventListener('scroll', function () {
                var isScroll = !!(root.pageYOffset || document.body.scrollTop);
                if (isScroll !== scrollCache.isScroll) {
                    if (isScroll) {
                        doc.documentElement.classList.add('is-scroll');
                    } else {
                        doc.documentElement.classList.remove('is-scroll');
                    }
                    scrollCache.isScroll = isScroll;
                }

                var isScrollEnd = (root.innerHeight + root.pageYOffset) >= doc.body.scrollHeight - 24;
                if (isScrollEnd !== scrollCache.isScrollEnd) {
                    if (isScrollEnd) {
                        doc.documentElement.classList.add('is-scroll-end');
                    } else {
                        doc.documentElement.classList.remove('is-scroll-end');
                    }
                    scrollCache.isScrollEnd = isScrollEnd;
                }
            });
        }

        function scrollTo(dom) {
            var options = {
                "behavior": "smooth",
                "left": dom.offsetLeft,
                "top": dom.offsetTop - headerHeight
            };

            if (isSmoothScrollSupported) {
                root.scrollTo(options);
            } else {
                root.scrollTo(options.left, options.top);
            }
        }

        return {
            init: init,
            scrollTo: scrollTo
        };

    }());

    mylib.Utils = Utils;

}(this, document, this.mylib));
