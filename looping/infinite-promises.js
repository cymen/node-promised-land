var Q = require('q');

var loop = function(count) {
    return Q.promise(function(resolve) {
        setTimeout(function() {
            console.log(count);
            resolve(loop(count + 1));
        }, 10);
    });
};

loop(0);
