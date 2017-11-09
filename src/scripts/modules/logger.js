(function (root, mylib) {
    'use strict';

    var loggingEnabled = mylib.options.logging;

    /**
     * @method Logger
     */
    var Logger = (function () {
        function debug() {
            if (loggingEnabled) {
                root.console.debug(arguments);
            }
        }

        function info() {
            if (loggingEnabled) {
                root.console.info(arguments);
            }
        }

        function log() {
            if (loggingEnabled) {
                root.console.log(arguments);
            }
        }

        function warn() {
            if (loggingEnabled) {
                root.console.warn(arguments);
            }
        }

        return {
            debug: debug,
            info: info,
            log: log,
            warn: warn
        };

    }());

    mylib.Logger = Logger;

}(this, this.mylib));
