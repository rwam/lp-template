(function (root, doc) {
    'use strict';

    var mylib = (function () {

        var options = {
            logging: false
        };

        function init() {
            initListener();
            initModules();
        }

        /**
         * @private
         */
        function initListener() {
            // Active-State auf mobilen Devices nutzen

            if (('ontouchstart' in root) || (root.DocumentTouch && doc instanceof DocumentTouch)) {
                doc.addEventListener('touchstart', function () {
                }, true);
            }
        }

        /**
         * Es werden alle Module initialisiert, die über die Funktion `init`
         * verfügen. Um eine Initialisierung zu verhindern, wird bei den entsprechenden
         * Modulen für die Init-Funktion `_init` verwendet.
         *
         * @private
         * @method initModules
         */
        function initModules() {
            var module;

            for (module in mylib) {
                if (mylib.hasOwnProperty(module) && typeof mylib[module].init === 'function') {
                    mylib[module].init();
                }
            }
        }

        return {
            init: init,
            options: options
        };

    }());

    root.mylib = mylib;

    doc.addEventListener("DOMContentLoaded", function () {
        // Handler when the DOM is fully loaded
        mylib.init();
    });

}(this, document));
