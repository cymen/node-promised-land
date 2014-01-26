var Q = require('q');

var loop = function(count) {
    return Q.promise(function(resolve) {
        console.log(count);
        resolve(loop(count + 1));
    });
};

loop(0);
